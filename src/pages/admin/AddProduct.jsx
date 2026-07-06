import React, { use, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import {
  addProduct,
  addProductImage,
  createProductInCategory,
} from "../../services/product.service";
import { getAllCategroy } from "../../services/category.service";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");

  // for rich text editor
  const editorRef = useRef(null);

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
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    quantity: 1,
    stock: true,
    live: false,
    image: undefined,
    imagePreview: undefined,
  });

  const handleFieldChange = (event, property) => {
    event.preventDefault();
    setProduct({
      ...product,
      [property]: event.target.value,
    });
  };

  const submitAddProductForm = (event) => {
    event.preventDefault();
    if (product.title === undefined || product.title.trim() === "") {
      toast.success("Product title is required");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.success("Product description is required");
      return;
    }

    if (product.price <= 0) {
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

    if (selectedCategoryId === "none") {
      setLoading(true);

      addProduct(product)
        .then((data) => {
          console.log(data);

          if (!product.image) {
            toast.success("Product Added Successfully !!");
            return;
          }

          return addProductImage(product.image, data.productId)
            .then((imgData) => {
              console.log(imgData);
              toast.success("Product & Image uploaded successfully");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Product added but image upload failed");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating product");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      //create product within category
      createProductInCategory(product, selectedCategoryId).then((data) => {
        console.log(data);
        toast.success("Product is created !!");
        if (!product.image) {
          clearForm();
          return;
        }

        //image upload
        addProductImage(product.image, data.productId)
          .then((data1) => {
            console.log(data1);
            toast.success("Image uploaded");
            clearForm();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in uploading image");
          });
      });
    }
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
        setProduct({
          ...product,
          imagePreview: r.target.result,
          image: event.target.files[0],
        });

        console.log(r.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      setProduct({
        ...product,
        image: undefined,
        imagePreview: undefined,
      });
    }
  };

  const clearData = (event) => {
    event.preventDefault();
    editorRef.current.setContent("");
    setProduct({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      quantity: "",
      stock: "",
      live: "",
      image: "",
      imagePreview: "",
    });
  };

  const formView = () => {
    return (
      <>
        <Card className="border border-0 shadow">
          <Card.Body>
            <h5 className="text-center"> Add Product Here !!</h5>
            <Form onSubmit={submitAddProductForm}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Here"
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={product.title}
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
                      value={product.price}
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
                      value={product.discountPercentage}
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
                  value={product.quantity}
                />
              </Form.Group>

              {/* Product  Image */}
              <Form.Group className="mb-3 boreder border-2">
                <Container
                  hidden={!product.imagePreview}
                  className="text-center"
                >
                  <p className="text-muted">Image Preview</p>
                  <img
                    src={product.imagePreview}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "250px",
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
                    checked={product.live}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: event.target.checked,
                      })
                    }
                  />
                </Col>
                <Col>
                  {/* stock */}
                  <Form.Check
                    type="switch"
                    label={"Stock"}
                    checked={product.stock}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: event.target.checked,
                      })
                    }
                  />
                </Col>
              </Row>
              {/* description */}
              {/* product description */}

              <Form.Group className="mb-3">
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
                  onEditorChange={(content) => {
                    setProduct((prev) => ({
                      ...prev,
                      description: content,
                    }));
                    console.log("Editor Content:", content);
                  }}
                />
              </Form.Group>
              {/*Category*/}
              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  value={selectedCategoryId}
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                >
                  <option value="none">None</option>
                  {categories?.content?.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.title}
                    </option>
                  ))}
                </Form.Select>
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
                  <span hidden={loading}>Add Product</span>
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
      </>
    );
  };
  return <div>{formView()}</div>;
};

export default AddProduct;
