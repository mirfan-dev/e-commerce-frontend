import React, { use, useEffect, useState } from "react";
import SingleCategoryView from "../../components/admin/SingleCategoryView";
import {
  deleteCategory,
  getAllCategroy,
  updateCategory,
} from "../../services/category.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button, Card, Container, Form, Modal, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // view modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [categories, setCategories] = useState({
    content: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategroy()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading category data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getAllCategroy(currentPage)
        .then((data) => {
          console.log(data);
          setCategories({
            content: categories.content.push(data.content),
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in loading category data");
        });
    }
  }, [currentPage]);

  const deleteCategoryMain = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(categoryId)
          .then((data) => {
            console.log("Delete response:", data);
            toast.success("Category Deleted Successfully");
            const newArray = categories.content.filter((c) => {
              return c.categoryId != categoryId;
            });
            setCategories({
              ...categories,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
      }
    });
  };

  const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "contain",
  };

  // load next page function
  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // handle view category
  const handleView = (category) => {
    setSelectedCategory(category);
    handleShow();
  };
  //  handle update category
  const handleUpdate = (category) => {
    setSelectedCategory(category);
    handleShowUpdate();
  };

  // call api for update

  const updateCategoryClicked = (event) => {
    event.preventDefault();
    updateCategory(selectedCategory)
      .then((data) => {
        console.log("Delete response:", data);
        toast.success("Category Updated Successfully");
        const newCategories = categories.content.map((cat) => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });
        setCategories({
          ...categories,
          content: newCategories,
        });
        handleCloseUpdate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating category");
      });
  };

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setSelectedCategory({
      ...selectedCategory,
      [property]: event.target.value,
    });
  };

  const modalView = () => {
    return (
      <>
        <Modal
          centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                src={selectedCategory.coverImage}
                className="img-fluid"
                style={imageStyle}
                alt=""
              />
            </Container>
            <div className="mt-3" style={{ textAlign: "justify" }}>
              {selectedCategory.description}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const modalUpdate = () => {
    return (
      <>
        <Modal
          centered
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Category here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={selectedCategory.title}
                />
              </Form.Group>
              {/* Image */}
              <Form.Group className="mb-3">
                <Container className="py-3">
                  <img
                    src={selectedCategory.coverImage}
                    className="img-fluid"
                    style={imageStyle}
                    alt=""
                  />
                </Container>
                <Form.Label>Category Cover Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                  value={selectedCategory.coverImage}
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
                  value={selectedCategory.description}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="success" onClick={updateCategoryClicked}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div>
        {/* loader */}
        <Container className="text-center p-3" hidden={!loading}>
          <Spinner />
          <div>...loading</div>
        </Container>
        {categories.content.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={categories.content.length}
              next={loadNextPage}
              hasMore={!categories.lastPage}
              loader={<h2 className="p-2 text-center">Loading...</h2>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {categories.content.map((category) => {
                return (
                  <SingleCategoryView
                    viewCat={handleView}
                    updateCat={handleUpdate}
                    deleteCat={deleteCategoryMain}
                    category={category}
                    key={category.categoryId}
                  />
                );
              })}
            </InfiniteScroll>
          </>
        ) : (
          <h5 className="text-center">No categories in database </h5>
        )}

        {selectedCategory ? modalView() : ""}
        {selectedCategory ? modalUpdate() : ""}
      </div>
    </>
  );
};

export default ViewCategory;
