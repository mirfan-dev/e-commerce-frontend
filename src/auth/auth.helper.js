// data: save in localstorage
export const doLoginLocalStorage = (data) => {
  const normalizedData = {
    jwtToken: data.accessToken || data.jwtToken || data.token,
    refreshToken: data.refreshToken,
    user: data.user,
    // Keep original data if needed
    ...data
  };
  localStorage.setItem("userData", JSON.stringify(normalizedData));
}

// data: fetch 
export const getUserFromLocalStorage = () => { 
  const data = getDataFromLocalStorage();
  if (data !== null) {
    return data.user;
  }
  return null;
}

export const getTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data !== null) {
     return data.accessToken || data.jwtToken || data.token;
  }
  return null;
}

export const getRefreshTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data !== null) {
    return data.refreshToken || null;
  }
  return null;
}


export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
}

export const getLoggedIn = () => {
  const token = getTokenFromLocalStorage();
  if (token) {  
    return true;
  }
  return false;
}

export const isAdminUser = () => {
  
  if (getLoggedIn()) {
    let user = getUserFromLocalStorage();
    
    // Added check for user and user.roles
    if (user && user.roles) {
      const roles = user.roles;
      if (roles.find((role) => role.roleName === 'ROLE_ADMIN')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// data : logout
export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
  sessionStorage.clear();
}