import React, { useEffect, useState } from 'react';
import { useRateLimit } from './RateLimitContext';
import './RateLimitAlert.css';

const RateLimitAlert = () => {
  const { rateLimitErrors } = useRateLimit();
  const [visible, setVisible] = useState(false);
  const [activeError, setActiveError] = useState(null);

  useEffect(() => {
    const errorEntries = Object.entries(rateLimitErrors);
    
    if (errorEntries.length > 0) {
      const [endpoint, error] = errorEntries.reduce((latest, current) => {
        return current[1].timestamp > latest[1].timestamp ? current : latest;
      }, errorEntries[0]);
      
      setActiveError({
        endpoint,
        message: error.message,
      });
      
      setVisible(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setActiveError(null);
    }
  }, [rateLimitErrors]);

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible || !activeError) {
    return null;
  }

  return (
    <div className="rate-limit-alert">
      <div className="rate-limit-content">
        <div className="rate-limit-message">
          <strong>Rate Limit Exceeded</strong>
          <p>{activeError.message}</p>
        </div>
        <button className="rate-limit-close" onClick={handleDismiss}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default RateLimitAlert; 