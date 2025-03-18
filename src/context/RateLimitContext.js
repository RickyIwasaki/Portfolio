import React, { createContext, useState, useContext, useCallback } from 'react';
import rateLimiter from '../utils/rateLimiter';

// Create context
const RateLimitContext = createContext();

/**
 * Provider component that makes rate limit functionality available to all child components
 */
export const RateLimitProvider = ({ children }) => {
  const [rateLimitErrors, setRateLimitErrors] = useState({});

  // Function to handle rate limit errors
  const handleRateLimitError = useCallback((endpoint, error) => {
    setRateLimitErrors(prev => ({
      ...prev,
      [endpoint]: {
        message: error.message,
        timestamp: Date.now(),
      }
    }));

    // Clear the error after the rate limit resets
    const retryAfter = rateLimiter.getTimeUntilReset(endpoint) * 1000;
    setTimeout(() => {
      setRateLimitErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[endpoint];
        return newErrors;
      });
    }, retryAfter);
  }, []);

  // Check if a request can be made and handle the error if not
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

  // Reset rate limit for a specific endpoint or all endpoints
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

  // The context value that will be passed to consuming components
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

/**
 * Custom hook to use the rate limit context
 */
export const useRateLimit = () => {
  const context = useContext(RateLimitContext);
  if (!context) {
    throw new Error('useRateLimit must be used within a RateLimitProvider');
  }
  return context;
}; 