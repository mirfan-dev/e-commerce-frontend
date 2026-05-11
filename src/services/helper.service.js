// export const BASE_URL=`http://localhost:9090`
export const BASE_URL = `https://electronicstore-production-179c.up.railway.app`
export const USER_PAGE_SIZE= 5;


export const formatDate = (instant, format = 'datetime') => {
  if (!instant) {
    return 'N/A';
  }
  
    let date;
    
    if (typeof instant === 'number') {
      // Check if it's in seconds (10 digits or less) 
      // Current year 2026 in seconds is ~1767225600 (10 digits)
      if (instant < 10000000000) {
        // Convert seconds to milliseconds
        date = new Date(instant * 1000);
      } else {
        // Already in milliseconds
        date = new Date(instant);
      }
    } 
    else if (instant instanceof Date) {
      date = instant;
    }
    else {
      return 'N/A';
    }
  
    
    const formats = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  
    };
    
    return date.toLocaleString('en-IN', formats[format] || formats.datetime);
  
};



