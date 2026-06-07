import React, { useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/category.service";


const AddCategory = () => {

  const [loading, setLoading] = useState(false);
  const[category, setCategory]=useState({
    title:'',
    description:'',
    coverImage:'',
  });

  const handleFieldChange = (event,property) => {
     event.preventDefault()
     setCategory({
       ...category,
       [property]: event.target.value
     })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if(category.title === undefined || category.title.trim() === ''){
      toast.success("Category title is required");
      return
    }
    if(category.description === undefined || category.description.trim() === ''){
      toast.success("Category description is required");
      return
    }

    if(category.coverImage === undefined || category.coverImage.trim() === ''){
      toast.success("Category CoverImage is required");
      return
    }

    setLoading(true);
        addCategory(category)
          .then((data) => {
            console.log(data);
            toast.success("Category Added  Successfully !!");
            setCategory({
                    title: '',
                    description: '',
                    coverImage: ''
                })
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in creating user");
          })
          .finally(() => {
            setLoading(false);
          });
  }

   const clearData = (event) => {
    event.preventDefault()
    setCategory({
      title: "",
      category: "",
      coverImage: "",
    });
  };
  return (
    <>
      <Container fluid>
        <Card className="border border-0 shadow">
          <Card.Body>
            <h5> Add Category Here !!</h5>
            <Form onSubmit={handleFormSubmit}>
              {/* Title */}
              <Form.Group className="mb-3" >
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={category.title}
                />
              </Form.Group>
              {/* Image */}
              <Form.Group className="mb-3" >
                <Form.Label>Category Cover Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                  value={category.coverImage}
                />
              </Form.Group>
              {/* description */}
              <Form.Group className="mb-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={"6"}
                  placeholder="Write Here..."
                  onChange={(event) => handleFieldChange(event, "description")}
                  value={category.description}
                />
              </Form.Group>
              <Container className="text-center ">
                    <Button
                      type="submit"
                      className="text-uppercase"
                      variant="success"
                      disabled={loading}
                    >
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                        hidden={!loading}
                      />
                      <span hidden={!loading}>Wait...</span>
                      <span hidden={loading}>Add Category</span>
                    </Button>
                    <Button
                      className="ms-3 text-uppercase"
                      variant="danger"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
