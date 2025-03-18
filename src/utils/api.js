import rateLimiter from './rateLimiter';

/**
 * Wrapper for fetch API with built-in rate limiting
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Promise from the fetch call
 */
export const fetchWithRateLimit = async (url, options = {}) => {
  // Create a unique identifier for this endpoint
  // We use the URL and method as a unique key
  const method = options.method || 'GET';
  const endpoint = `${method}:${url}`;
  
  // Check if we can make this request
  if (!rateLimiter.canMakeRequest(endpoint)) {
    const retryAfter = rateLimiter.getTimeUntilReset(endpoint);
    
    // You can handle this differently based on your app's needs
    // This example throws an error with retry information
    throw new Error(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
  }
  
  // If rate limit allows, proceed with the request
  try {
    const response = await fetch(url, options);
    
    // Optional: Check for 429 Too Many Requests status from server
    // This adds server-side rate limit handling as well
    if (response.status === 429) {
      // Get the Retry-After header if available
      const retryAfter = response.headers.get('Retry-After') || 60;
      throw new Error(`Server rate limit exceeded. Try again in ${retryAfter} seconds.`);
    }
    
    return response;
  } catch (error) {
    // Re-throw fetch errors
    throw error;
  }
};

/**
 * GET request with rate limiting
 * @param {string} url - The URL to fetch
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Promise with the response data
 */
export const get = async (url, options = {}) => {
  const response = await fetchWithRateLimit(url, {
    method: 'GET',
    ...options,
  });
  
  return response.json();
};

/**
 * POST request with rate limiting
 * @param {string} url - The URL to fetch
 * @param {Object} data - The data to send
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Promise with the response data
 */
export const post = async (url, data, options = {}) => {
  const response = await fetchWithRateLimit(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  return response.json();
};

// Similar functions for PUT, DELETE, etc.
export const put = async (url, data, options = {}) => {
  const response = await fetchWithRateLimit(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
  
  return response.json();
};

export const del = async (url, options = {}) => {
  const response = await fetchWithRateLimit(url, {
    method: 'DELETE',
    ...options,
  });
  
  return response.json();
}; 