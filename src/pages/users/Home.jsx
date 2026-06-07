import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/user.context'


const Home = () => {

  const userContext = useContext(UserContext);
  const currentDateTime = new Date().toLocaleString();

  return (
    <div>
      <h1 className="text-center">
        Welcome {userContext.userData?.user?.name}
      </h1>

      {/* <h1>{userContext.isLogin.toString()}</h1> */}

      <h3 className='text-center'>Current Date and Time : {currentDateTime}</h3>
    </div>
  );
}

export default Home