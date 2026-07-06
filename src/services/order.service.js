import { privateAxios } from "./axios.service"


// create order

export const addOrder = async(order) => {
  let result = await privateAxios.post(`/orders`,order);
  return result.data;
}


//get orders: async wait
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};

//update orders
export const updateOroder = async (order, orderId) => {
  const result = await privateAxios.put(`/orders/${orderId}`, order);
  return result.data;
};

// get orders of user

export const getOrdersOfUser  = async (userId) => {
  let result = await privateAxios.get(`/orders/users/${userId}`);
  return result.data;
}