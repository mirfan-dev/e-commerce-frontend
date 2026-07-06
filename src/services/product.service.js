// product related api calls

import { privateAxios } from "./axios.service";


// create product

export const addProduct = (product) => {

    return privateAxios.post(`/products`, product)
  .then((response) => response.data);
}

// create product with category
export const createProductInCategory = (product, categoryId) => {
  return privateAxios.post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

// add product image
export const addProductImage = (file, productId) => {
  if (!file) {
    return;
  }

  const data = new FormData();
  data.append("productImage", file);

  return privateAxios
      .post(`/products/image/${productId}`, data)
    .then((response) => response.data);
};

// get All Products

export const getAllProduct = (pageNumber=0, pageSize=10, sortBy='addedDate', sortDir='desc') => {

      return privateAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
}

// delete product

export const deleteProduct = (productId) => {
  return privateAxios.delete(`/products/${productId}`)
  .then((response)=> response.data);
}

// update product

export const updateProduct = (product, productId) => {
    return privateAxios.put(`/products/${productId}`, product)
  .then((response)=> response.data);
}

// search product

export const searchProduct = (keyword) => {
   
  return privateAxios.get(`/products/search/${keyword}`)
  .then((response)=> response.data);
}

//update the category of the product

export const udpateProductCategory = (categoryId, productId) => {
  return privateAxios
    .put(`/categories/${categoryId}/products/${productId}`)
    .then((res) => res.data);
};


// get All Live Products

export const getAllLiveProduct = (pageNumber=0, pageSize=10, sortBy='addedDate', sortDir='desc') => {

      return privateAxios.get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
}

// get single product by id
export const getProductById = async(productId) => {
  let result = await privateAxios.get(`/products/${productId}`);
  return result.data;
}

// get products of categories

export const getProductOfCategories = async (
  categoryId,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "desc"
) => {
  let result = await privateAxios.get(
    `/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );

  return result.data;
};