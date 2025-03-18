/**
 * A client-side rate limiter utility to prevent excessive API calls.
 * This helps protect against accidental spam or misuse of API endpoints.
 */

class RateLimiter {
  constructor(maxRequests = 50, timeWindow = 60000) {
    this.maxRequests = maxRequests; // Maximum requests allowed in the time window
    this.timeWindow = timeWindow; // Time window in milliseconds (default: 1 minute)
    this.requestTimestamps = {}; // Stores timestamps of requests for each endpoint
  }

  /**
   * Checks if a request to a specific endpoint should be allowed based on rate limits
   * @param {string} endpoint - The API endpoint or unique identifier for the request
   * @returns {boolean} - True if request is allowed, false if rate limited
   */
  canMakeRequest(endpoint) {
    const now = Date.now();
    
    // Initialize timestamp array for this endpoint if it doesn't exist
    if (!this.requestTimestamps[endpoint]) {
      this.requestTimestamps[endpoint] = [];
    }
    
    // Filter out timestamps that are outside the time window
    this.requestTimestamps[endpoint] = this.requestTimestamps[endpoint].filter(
      timestamp => now - timestamp < this.timeWindow
    );
    
    // Check if the number of requests within the time window exceeds the limit
    if (this.requestTimestamps[endpoint].length >= this.maxRequests) {
      console.warn(`Rate limit exceeded for endpoint: ${endpoint}`);
      return false;
    }
    
    // Add current timestamp to the list
    this.requestTimestamps[endpoint].push(now);
    return true;
  }
  
  /**
   * Returns the number of seconds until the next request can be made
   * @param {string} endpoint - The API endpoint to check
   * @returns {number} - Seconds until rate limit resets, or 0 if not rate limited
   */
  getTimeUntilReset(endpoint) {
    if (!this.requestTimestamps[endpoint] || 
        this.requestTimestamps[endpoint].length < this.maxRequests) {
      return 0;
    }
    
    const oldestTimestamp = Math.min(...this.requestTimestamps[endpoint]);
    const msUntilReset = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.ceil(msUntilReset / 1000);
  }
  
  /**
   * Clears rate limit history for a specific endpoint or all endpoints
   * @param {string} endpoint - Optional specific endpoint to clear
   */
  reset(endpoint = null) {
    if (endpoint) {
      delete this.requestTimestamps[endpoint];
    } else {
      this.requestTimestamps = {};
    }
  }
}

// Create and export a singleton instance
const rateLimiter = new RateLimiter();
export default rateLimiter; 