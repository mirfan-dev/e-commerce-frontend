import { privateAxios } from "./axios.service";


// get cart by user id
export const getCartByUserId = async(userId) => {
  let result = await privateAxios.get(`/carts/${userId}`);
  return result.data;
}

//add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
  const res = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });
  return res.data;
};

// clear cart 
export const clearCart = async (userId) => {
  let result = await privateAxios.delete(`/carts/${userId}`);
  return result.data;
}

// remove item from cart
export const removeItemFromCart = async (userId,itemId) => {
    let result = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
    return result.data;
}