import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/user.context'
import { getCurrentLocation } from '../../services/user.service';

const Home = () => {

  const userContext = useContext(UserContext);
   const [location, setLocation] = useState("");

  useEffect(() => {

    getCurrentLocation()
      .then((data) => {
        setLocation(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  return (
    <div>
    <h1>Welcome {userContext.userData?.user?.name}</h1>
    <h1>{userContext.isLogin}</h1>
    <div>
      <h5>Current Location</h5>
      <h1>{location}</h1>
    </div>
    
    </div>
  )
}

export default Home