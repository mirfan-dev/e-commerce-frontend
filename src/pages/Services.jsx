import React from 'react'
import Base from '../components/Base'

const About = () => {
  return (
    <Base 
      title="About Us" 
      description="Learn more about our company and mission"
      buttonEnabled={true}
      buttonLink="/"
      buttonType="warning"
      buttonText="Home"
    >
      This is about page
    </Base>
  )
}

export default About