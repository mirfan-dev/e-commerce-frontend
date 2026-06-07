// Add category

import AddCategory from "../pages/admin/AddCategory";
import { privateAxios } from "./axios.service";

export const addCategory = (categroy) => {

    return privateAxios.post(`/categories`, categroy)
  .then((response) => response.data);
}

// get All category

export const getAllCategroy = (currentPage=0) => {
  return privateAxios.get(`/categories?pageNumber=${currentPage}`)
  .then((response) => response.data);
}

// delete category

export const deleteCategory = (categoryId) => {
  return privateAxios.delete(`/categories/${categoryId}`)
  .then((response)=> response.data);
}

// update category

export const updateCategory = (category) => {
  return privateAxios
    .put(`/categories/${category.categoryId}`, category)
    .then((response) => response.data);
};