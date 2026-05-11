import { useEffect, useState } from "react";
import UserContext from "./user.context";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, getLoggedIn, isAdminUser } from "../auth/auth.helper";

const UserProvider = ({ children }) => {  
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(false)

  useEffect(() => {
    setIsLogin(getLoggedIn());
    setAdminData(isAdminUser);
    setUserData(getDataFromLocalStorage());
  },[])

  // login 

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setAdminData(isAdminUser());
    setUserData(getDataFromLocalStorage());
  }

  //logout 
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setAdminData(false);
    setUserData(null);
  }

  return (
    <UserContext.Provider value={
      {
        userData: userData,
        setUserData: setUserData,
        isLogin: isLogin,
        setIsLogin: setIsLogin,
        adminData: adminData,
        login: doLogin,
        logout: doLogout
      }}>
      {children} 
    </UserContext.Provider>
  );
};

export default UserProvider;