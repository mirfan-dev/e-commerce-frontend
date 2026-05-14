// user related api calls

import { doLoginLocalStorage, getRefreshTokenFromLocalStorage } from "../auth/auth.helper";
import {  privateAxios, publicAxios } from "./axios.service"



// register new user

export const registerUser = (userData) => {
   return publicAxios.post(`/users`, userData)
  .then((response) => response.data);
}

// login User
export const loginUser = (loginData) => {
  return publicAxios.post(`/auth/login`, loginData)
    .then((response) => {
      const { accessToken, refreshToken, user } = response.data;
      doLoginLocalStorage({
        jwtToken: accessToken,
        refreshToken: refreshToken,
        user: user
      });
      return response.data;
    });
}

// refresh token
export const refreshToken = (refreshTokenData) => {
  return publicAxios.post(`/auth/refresh-token`, refreshTokenData)
    .then((response) => {
      const { accessToken, refreshToken, user } = response.data;
      doLoginLocalStorage({
        jwtToken: accessToken,
        refreshToken: refreshToken,
        user: user
      });
      return response.data;
    });
}


// getUserById
export const getUserById = (userId) =>{
  return publicAxios.get(`/users/${userId}`)
  .then((response)=> response.data);
}

// update user

export const updateUser = (user) => {
    return privateAxios.put(`/users/${user.userId}`, user)
  .then((response) => response.data);
}

// update userProfilePicture

export const userProfilePicture =  (file,userId) => {
  if(file === null) {
    return;
  }
  const data = new FormData();
  data.append("userImage",file);
   return privateAxios.post(`/users/image/${userId}`, data)
  .then((response) => response.data);
}

// get All user

export const getAllUser = (pageNumber=0, pageSize=10, sortBy='name', sortDir='desc') => {

      return privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
}

// Delet User

export const deleteUser = (userId) => {
  return privateAxios.delete(`/users/${userId}`)
  .then((response)=> response.data);
}

export const searchUser = (keyword) => {
   
  return privateAxios.get(`/users/search/${keyword}`)
  .then((response)=> response.data);
}
// get current location
// get current location
export const getCurrentLocation = () => {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(lat, lon);

        publicAxios
          .get(`/location/current?lat=${lat}&lon=${lon}`)
          .then((response) => {

            resolve(response.data);

          })
          .catch((error) => {

            reject(error);

          });

      },

      (error) => {

        console.log(error);

        reject(error);

      },

      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }

    );

  });

}
