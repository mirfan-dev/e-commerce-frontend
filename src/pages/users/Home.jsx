import React, { useContext } from 'react'
import UserContext from '../../context/user.context'

const Home = () => {

  const userContext = useContext(UserContext);
  return (
    <div>
    <h1>Welcome {userContext.userData?.user?.name}</h1>
    <h1>{userContext.isLogin}</h1>
    
    </div>
  )
}

export default Home