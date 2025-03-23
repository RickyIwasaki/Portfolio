class RateLimiter {
  constructor(maxRequests = 50, timeWindow = 60000) {
    this.maxRequests = maxRequests; 
    this.timeWindow = timeWindow; 
    this.requestTimestamps = {}; 
  }
  
  canMakeRequest(endpoint) {
    const now = Date.now();
    
    if (!this.requestTimestamps[endpoint]) {
      this.requestTimestamps[endpoint] = [];
    }
    
    this.requestTimestamps[endpoint] = this.requestTimestamps[endpoint].filter(
      timestamp => now - timestamp < this.timeWindow
    );
    
    if (this.requestTimestamps[endpoint].length >= this.maxRequests) {
      console.warn(`Rate limit exceeded for endpoint: ${endpoint}`);
      return false;
    }
    
    this.requestTimestamps[endpoint].push(now);
    return true;
  }
  

  getTimeUntilReset(endpoint) {
    if (!this.requestTimestamps[endpoint] || 
        this.requestTimestamps[endpoint].length < this.maxRequests) {
      return 0;
    }
    
    const oldestTimestamp = Math.min(...this.requestTimestamps[endpoint]);
    const msUntilReset = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.ceil(msUntilReset / 1000);
  }
  
  reset(endpoint = null) {
    if (endpoint) {
      delete this.requestTimestamps[endpoint];
    } else {
      this.requestTimestamps = {};
    }
  }
}

const rateLimiter = new RateLimiter();
export default rateLimiter; 