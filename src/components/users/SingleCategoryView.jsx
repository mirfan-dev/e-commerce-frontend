import React from 'react'

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import profilePic from "../../assets/dp.jpg";
import Swal from 'sweetalert2';
import { deleteCategory } from "../../services/category.service";

const SingleCategoryView = ({category,deleteCat,viewCat,updateCat}) => {
 
    const imageStyle ={
    width: "120px",
    height: "120px"
  }

  const deleteCategory = (categoryId) => {
     deleteCat(categoryId)
    
      }

  
  return (
    <div className="mb-3">
      <Card className='border border-0 shadow'>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={2} className="text-center">
            <img src={category.coverImage} className="rounded-circle" style={imageStyle} alt=""/>
            </Col>
            <Col md={8}>
              <h5>{category.title}</h5>
              <p>{category.description}</p>
            </Col>
            <Col mid={2}>
              <Container className="d-grid">
                  <Button size='sm' onClick={(event)=>deleteCategory(category.categoryId)} variant='danger'>Delete</Button>
                  <Button className='mt-1' size='sm' onClick={(event)=>viewCat(category)} variant='info'>View</Button>
                  <Button className='mt-1' size='sm' onClick={(event)=>updateCat(category)} variant='warning '>Update</Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleCategoryView