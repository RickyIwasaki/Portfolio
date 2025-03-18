import React, { useEffect, useState } from 'react';
import { useRateLimit } from '../context/RateLimitContext';
import './RateLimitAlert.css';

/**
 * Component to display rate limit warnings/errors to the user
 */
const RateLimitAlert = () => {
  const { rateLimitErrors } = useRateLimit();
  const [visible, setVisible] = useState(false);
  const [activeError, setActiveError] = useState(null);

  // Update alerts when rate limit errors change
  useEffect(() => {
    const errorEntries = Object.entries(rateLimitErrors);
    
    if (errorEntries.length > 0) {
      // Get the most recent error
      const [endpoint, error] = errorEntries.reduce((latest, current) => {
        return current[1].timestamp > latest[1].timestamp ? current : latest;
      }, errorEntries[0]);
      
      setActiveError({
        endpoint,
        message: error.message,
      });
      
      setVisible(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setActiveError(null);
    }
  }, [rateLimitErrors]);

  // Hide the alert
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