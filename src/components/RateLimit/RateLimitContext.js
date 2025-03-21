import React, { createContext, useState, useContext, useCallback } from 'react';
import rateLimiter from '../../utils/rateLimiter';

const RateLimitContext = createContext();

export const RateLimitProvider = ({ children }) => {
  const [rateLimitErrors, setRateLimitErrors] = useState({});

  const handleRateLimitError = useCallback((endpoint, error) => {
    setRateLimitErrors(prev => ({
      ...prev,
      [endpoint]: {
        message: error.message,
        timestamp: Date.now(),
      }
    }));

    const retryAfter = rateLimiter.getTimeUntilReset(endpoint) * 1000;
    setTimeout(() => {
      setRateLimitErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[endpoint];
        return newErrors;
      });
    }, retryAfter);
  }, []);

  const checkRateLimit = useCallback((endpoint) => {
    try {
      const canProceed = rateLimiter.canMakeRequest(endpoint);
      
      if (!canProceed) {
        const retryAfter = rateLimiter.getTimeUntilReset(endpoint);
        const error = new Error(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
        handleRateLimitError(endpoint, error);
        return false;
      }
      
      return true;
    } catch (error) {
      handleRateLimitError(endpoint, error);
      return false;
    }
  }, [handleRateLimitError]);

  const resetRateLimit = useCallback((endpoint = null) => {
    rateLimiter.reset(endpoint);
    
    if (endpoint) {
      setRateLimitErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[endpoint];
        return newErrors;
      });
    } else {
      setRateLimitErrors({});
    }
  }, []);

  const value = {
    rateLimitErrors,
    checkRateLimit,
    resetRateLimit,
    getTimeUntilReset: rateLimiter.getTimeUntilReset.bind(rateLimiter),
  };

  return (
    <RateLimitContext.Provider value={value}>
      {children}
    </RateLimitContext.Provider>
  );
};

export const useRateLimit = () => {
  const context = useContext(RateLimitContext);
  if (!context) {
    throw new Error('useRateLimit must be used within a RateLimitProvider');
  }
  return context;
}; 