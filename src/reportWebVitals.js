/**
 * Web Vitals reporting function
 * @param {Function} onPerfEntry - Callback function for performance metrics
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry);
      getLCP(onPerfEntry); 
      getTTFB(onPerfEntry); 
    });
  }
};

export default reportWebVitals;
