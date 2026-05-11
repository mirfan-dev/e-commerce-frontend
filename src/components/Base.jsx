import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'

const Base = ({
  title = "Page Title", 
  description = "Welcome to dynamic store", 
  buttonEnabled = false, 
  buttonText = "Shop Now", 
  buttonType = "primary", 
  buttonLink="/",
  children
}) => {

  let styleContainer={
    height: "200px"
  }
  
  return (
    <div>
      <Container className='bg-dark p-5 text-white text-center d-flex justify-content-center align-items-center' fluid style={styleContainer}>
       <div>
         <h3>{title}</h3>
        <p>{description && description}</p>
        {buttonEnabled && 
          <Button as={NavLink} to={"/"} variant={buttonType}>{buttonText}</Button>
        }
       </div>
      </Container>
      {children}
      <Footer/>
    </div>
  )
}

export default Base