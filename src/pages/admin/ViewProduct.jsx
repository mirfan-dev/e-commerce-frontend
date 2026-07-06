import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FormGroup,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  addProductImage,
  getAllProduct,
  searchProduct,
  udpateProductCategory,
  updateProduct,
} from "../../services/product.service";
import {
  getProductImageUrl,
  PRODUCT_PAGE_SIZE,
} from "../../services/helper.service";
import SingleProductView from "../../components/admin/SingleProductView";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import {
  getAllCategroy,
  updateCategory,
} from "../../services/category.service";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const [product, setProduct] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProduct, setCurrentProduct] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(undefined);
  const [categoryChangeId, setCategoryChangeId] = useState("none");
  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });

  useEffect(() => {
    getAllCategroy(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories");
      });
  }, []);

  // for rich text editor
  const editorRef = useRef(null);

  // view product state variable
  const [show, setShow] = useState(false);

  const closeProductViewModal = () => {
    setShow(false);
  };
  const openProductViewModal = (event, product) => {
    setCurrentProduct(product);
    setShow(true);
  };
  // edit product state variable
  const [showEditModal, setShowEditModal] = useState(false);

  const closeEditProductModal = (event, product) => {
    setShowEditModal(false);
  };
  const openEditProductModel = (event, product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setCurrentProduct({
      ...currentProduct,
      [property]: event.target.value,
    });
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    if (
      currentProduct.title === undefined ||
      currentProduct.title.trim() === ""
    ) {
      toast.success("Product title is required");
      return;
    }
    if (
      currentProduct.description === undefined ||
      currentProduct.description.trim() === ""
    ) {
      toast.success("Product description is required");
      return;
    }

    if (currentProduct.price <= 0) {
      toast.success("Invalid Price");
      return;
    }
    if (
      Number(product.discountPercentage) < 0 ||
      Number(product.discountPercentage) > 100 ||
      Number(product.discountedPrice) >= Number(product.price)
    ) {
      toast.error("Invalid DiscountedPrice");
      return;
    }

    //form submit api call

    updateProduct(currentProduct, currentProduct.productId).then((data) => {
      console.log(data);

      toast.success("Detail updated ", {
        position: "top-right",
      });

      // update image also...

      if (imageUpdate.image && imageUpdate.imagePreview) {
        addProductImage(imageUpdate.image, currentProduct.productId)
          .then((imageData) => {
            console.log(imageData);
            setCurrentProduct({
              ...currentProduct,
              productImageName: imageData.imageName,
            });
            toast.success("image updaed", {
              position: "top-right",
            });

            setImageUpdate({
              image: undefined,
              imagePreview: undefined,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in updating image", {
              position: "top-right",
            });
          });
      }

      // category update:
      if (
        categoryChangeId === "none" ||
        categoryChangeId === currentProduct.category?.categoryId
      ) {
      } else {
        udpateProductCategory(categoryChangeId, currentProduct.productId)
          .then((catData) => {
            console.log(catData);
            toast.success("Category Updated ", {
              position: "top-right",
            });
            setCurrentProduct({
              ...currentProduct,
              category: catData.category,
            });

            const newArray = products.content.map((p) => {
              if (p.productId === currentProduct.productId) return catData;
              return p;
            });

            setProduct({
              ...product,
              content: newArray,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      const newArray = product.content.map((p) => {
        if (p.productId === currentProduct.productId) return data;
        return p;
      });

      setProduct({
        ...product,
        content: newArray,
      });
    });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    // const localFile=event.target.files[0]
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type == "image/jpeg"
    ) {
      //preview show

      const reader = new FileReader();
      reader.onload = (r) => {
        setImageUpdate({
          imagePreview: r.target.result,
          image: event.target.files[0],
        });

        console.log(r.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setImageUpdate({
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  useEffect(() => {
    getProduct(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
  }, []);

  const getProduct = (
    pageNumber = 0,
    pageSize = 10,
    sortBy = "addedDate",
    sortDir = "desc",
  ) => {
    getAllProduct(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProduct({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in getting user data");
      });
  };

  const updateProductList = (productId) => {
    const newArray = product.content.filter((p) => p.productId != productId);
    setProduct({
      ...product,
      content: newArray,
    });
  };

  const searchProducts = () => {
    if (!searchQuery || searchQuery.trim() === "") {
      toast.warning("Please enter a search term");
      return;
    }

    searchProduct(searchQuery.trim())
      .then((data) => {
        console.log("Search results:", data);
        if (Array.isArray(data)) {
          if (data.length === 0) {
            toast.info("No result found");
            setUser(null);
          } else {
            setProduct({
              content: data,
              totalElements: data.length,
              totalPages: 1,
              number: 0,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const imageStyle = {
    height: "400px",
    objectFit: "contain",
  };

  const editProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal
            centered
            size="xl"
            animation={false}
            show={show}
            show={showEditModal}
            onHide={closeEditProductModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdateFormSubmit}>
                {/* Title */}
                <Form.Group className="mb-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Here"
                    onChange={(event) => handleFieldChange(event, "title")}
                    value={currentProduct.title}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    {/* price */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Here"
                        onChange={(event) => handleFieldChange(event, "price")}
                        value={currentProduct.price}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* discountPercentage */}
                    <Form.Group className="mb-3">
                      <Form.Label>Product discountPercentage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Here"
                        onChange={(event) => {
                          handleFieldChange(event, "discountPercentage");
                        }}
                        value={currentProduct.discountPercentage}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/*Producnt Quantity */}
                <Form.Group className="mb-3">
                  <Form.Label>Product Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Here"
                    onChange={(event) => handleFieldChange(event, "quantity")}
                    value={currentProduct.quantity}
                  />
                </Form.Group>

                {/* Product  Image */}
                <Form.Group className="mb-3 boreder border-2">
                  <Container className="text-center">
                    <p className="text-muted">Image Preview</p>
                    <img
                      src={
                        imageUpdate.imagePreview
                          ? imageUpdate.imagePreview
                          : getProductImageUrl(currentProduct.productId)
                      }
                      className="img-fluid"
                      style={{
                        height: "400px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                  </Container>

                  <Form.Label>Select Product</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(event) => handleFileChange(event)}
                  />
                </Form.Group>

                <Row className="mb-3  px-1">
                  <Col>
                    {/* live */}
                    <Form.Check
                      type="switch"
                      label={"Live"}
                      checked={currentProduct.live}
                      onChange={(event) =>
                        setCurrentProduct({
                          ...currentProduct,
                          live: !currentProduct.live,
                        })
                      }
                    />
                  </Col>
                  <Col>
                    {/* stock */}
                    <Form.Check
                      type="switch"
                      label={"Stock"}
                      checked={currentProduct.stock}
                      onChange={(event) =>
                        setCurrentProduct({
                          ...currentProduct,
                          stock: !currentProduct.stock,
                        })
                      }
                    />
                  </Col>
                </Row>
                {/* description */}
                {/* product description */}

                <Form.Group className="my-5">
                  <Form.Label>Product Description</Form.Label>

                  <Editor
                    apiKey="jyia2e9qfugomj2sc4jn4ptcfm0o1r1xi5nrt6dy22gde88b"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 380,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    value={currentProduct.description}
                    onEditorChange={(event) =>
                      setCurrentProduct({
                        ...currentProduct,
                        description: editorRef.current.getContent(),
                      })
                    }
                  />
                </Form.Group>
                {/*(categoryChangeId)} */}
                <Form.Group className="mt-3">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    value={categoryChangeId}
                    onChange={(event) => {
                      setCategoryChangeId(event.target.value);
                    }}
                  >
                    <option value="none">None</option>
                    {categories &&
                      categories.content.map((cat) => {
                        return (
                          <option
                            selected={
                              cat.categoryId ==
                              currentProduct.category?.categoryId
                            }
                            value={cat.categoryId}
                            key={cat.categoryId}
                          >
                            {cat.title}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Form.Group>
                <Container className="text-center mt-3 mb-3">
                  <Button
                    className="text-uppercase"
                    type="submit"
                    variant="success"
                    size="sm"
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="ms-3 text-uppercase"
                    variant="danger"
                    onClick={closeEditProductModal}
                  >
                    Close
                  </Button>
                </Container>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )
    );
  };
  const viewProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal
            centered
            size="xl"
            animation={false}
            show={show}
            onHide={closeProductViewModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Image */}
              <Container className="text-center mb-2">
                <img
                  src={getProductImageUrl(currentProduct.productId)}
                  className="img-fluid"
                  style={imageStyle}
                  alt=""
                />
              </Container>

              {/* information table  */}

              <Table striped bordered responsive className="text-center">
                <thead>
                  <tr>
                    <th>Info</th>
                    <th>Value</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Product Id</td>
                    <td className="fw-bold">{currentProduct.productId}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className="fw-bold">{currentProduct.quantity}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className="fw-bold"> {currentProduct.price} ₹ </td>
                  </tr>
                  <tr>
                    <td>Discount Percentage</td>
                    <td className="fw-bold">
                      {" "}
                      {currentProduct.discountPercentage} %
                    </td>
                  </tr>
                  <tr className={currentProduct.live ? "" : "table-danger"}>
                    <td>Live</td>
                    <td className="fw-bold">
                      {currentProduct.live ? "True" : "False"}
                    </td>
                  </tr>
                  <tr className={currentProduct.stock ? "" : "table-danger"}>
                    <td>Stock</td>
                    <td className="fw-bold">
                      {currentProduct.stock ? "In Stock" : "Not in Stock"}
                    </td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td className="fw-bold">
                      {currentProduct.category?.title}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* description */}
              <div className=" p-1  "
                // style={{
                //   textAlign: "justify",
                // }}
              >
                <ShowHtml htmlText={currentProduct.description} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeProductViewModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    );
  };
  const productView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-3">View Products</h4>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Search Product</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search products..."
                className="rounded-start-pill rounded-end-pill"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                variant="outline-secondary"
                className="rounded-start-pill rounded-end-pill"
                onClick={searchProducts}
              >
                <FaSearch /> Search
              </Button>
            </InputGroup>
          </Form.Group>
          <div className="table-responsive hide-scrollbar">
            <Table striped responsive hover className="text-center">
              <thead>
                <tr>
                  <th className="px-3 small">SN</th>
                  <th className="px-3 small">Title</th>
                  <th className="px-3 small">Quantity</th>
                  <th className="px-3 small">Price</th>
                  <th className="px-3 small">discount Percentage</th>
                  <th className="px-3 small">Live</th>
                  <th className="px-3 small">Sock</th>
                  <th className="px-3 small">Category</th>
                  <th className="px-3 small">Date</th>
                  <th className="px-3 small">Action</th>
                </tr>
              </thead>
              <tbody>
                {product?.content?.map((product, index) => (
                  <SingleProductView
                    key={index}
                    index={index}
                    product={product}
                    updateProductList={updateProductList}
                    openProductViewModal={openProductViewModal}
                    openEditProductModel={openEditProductModel}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <Container>
            <Pagination className="d-flex justify-content-end">
              <Pagination.First
                onClick={(event) => {
                  getProduct(0, PRODUCT_PAGE_SIZE, "addedDate", "desc");
                }}
                disabled={product.first}
              />

              <Pagination.Prev
                onClick={(event) => {
                  getProduct(
                    product.number - 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc",
                  );
                }}
                disabled={product.number === 0}
              />
              {[...Array(product.totalPages)]
                .map((obj, i) => i)
                .map((item) =>
                  product.number === item ? (
                    <Pagination.Item active key={item}>
                      {item + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={(event) => {
                        getProduct(
                          item,
                          PRODUCT_PAGE_SIZE,
                          "addedDate",
                          "desc",
                        );
                      }}
                      key={item}
                    >
                      {item + 1}
                    </Pagination.Item>
                  ),
                )}
              <Pagination.Next
                onClick={(event) => {
                  getProduct(
                    product.number + 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc",
                  );
                }}
                disabled={product.number === product.totalPages - 1}
              />

              <Pagination.Last
                onClick={(event) => {
                  getProduct(
                    product.totalPages - 1,
                    PRODUCT_PAGE_SIZE,
                    "addedDate",
                    "desc",
                  );
                }}
                disabled={product.last}
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {product ? (
              productView()
            ) : (
              <Alert>
                <h3 className="text-center mt-2">Product not Found</h3>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
      {viewProductModalView()}
      {editProductModalView()}
    </>
  );
};

export default ViewProduct;
