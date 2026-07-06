export const BASE_URL=`http://localhost:9090`
// export const BASE_URL = `https://electronicstore-production-179c.up.railway.app`

export const USER_PAGE_SIZE= 5;
export const PRODUCT_PAGE_SIZE= 5;
export const ORDER_PAGE_SIZE= 5;
export const ADMIN_ORDER_PAGE_SIZE = 10;

export const getProductImageUrl = (productId) => { 
    return `${BASE_URL}/products/image/${productId}`;
};

export const getCategoryImageUrl = (categoryId) => {
   return `${BASE_URL}/categories/image/${categoryId}`;
}

export const getUserImageUrl = (userId) => {
  return `${BASE_URL}/users/image/${userId}`;
};



export const formatDate = (instant, format = 'datetime') => {
  if (!instant) {
    return 'N/A';
  }

  let date;

  if (typeof instant === 'number') {
    // seconds -> milliseconds
    date =
      instant < 10000000000
        ? new Date(instant * 1000)
        : new Date(instant);

  } else if (typeof instant === 'string') {
    // Java Instant ISO string
    date = new Date(instant);

  } else if (instant instanceof Date) {
    date = instant;

  } else {
    return 'N/A';
  }

  // Invalid date check
  if (isNaN(date.getTime())) {
    return 'N/A';
  }

  const formats = {
    datetime: {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // AM/PM
    },
  };

  return date.toLocaleString(
    'en-IN',
    formats[format] || formats.datetime
  );
};

export const formatDates = (timeInLongs) => {
  if (!timeInLongs) {
    return null;
  }
  const date = new Date(timeInLongs);
  return date.toLocaleString();
}



