import React from 'react'
import Base from '../components/Base'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'


const Index = () => {

  function showSuccessToast(){
    toast.success("This is success Message !!");
  }

  function getDataFromServer() {
  toast.info("Getting data from server");
  
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((data) => {  
      console.log(data);  
      toast.success("Request done");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message || "Something went wrong"); 
    });

    
}
  
  return (
    <Base title='shop what you need' 
    description="We are dedicated to providing the best online shopping experience with quality products and exceptional customer service" buttonEnabled={true}>
      <h1>Working on home page</h1>
      <Button variant='success' onClick={showSuccessToast}>Toastify success</Button>
      <Button variant='primary'onClick={getDataFromServer}>Get data from fake api</Button>
    </Base>
  )
}

export default Index