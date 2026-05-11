import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/user.context";
import { getLoggedIn } from "../../auth/auth.helper";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const { isLogin } = userContext;

  const dashboardView = () => {
    return (
      <div>
        
        {/* to see nested component */}
        <Outlet />
      </div>
    );
  };

  return getLoggedIn() ? dashboardView() : <Navigate to="/login"  />;
};

export default Dashboard;