import rateLimiter from './rateLimiter';

export const fetchWithRateLimit = async (url, options = {}) => {
  const method = options.method || 'GET';
  const endpoint = `${method}:${url}`;
  
  if (!rateLimiter.canMakeRequest(endpoint)) {
    const retryAfter = rateLimiter.getTimeUntilReset(endpoint);
    throw new Error(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
  }
  
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 60;
      throw new Error(`Server rate limit exceeded. Try again in ${retryAfter} seconds.`);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const get = async (url, options = {}) => {
  const response = await fetchWithRateLimit(url, {
    method: 'GET',
    ...options,
  });
  
  return response.json();
};

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