import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../services/product.service";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../services/helper.service";
import { GrStatusGood } from "react-icons/gr";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import profilePic from "../../assets/dp.jpg";

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addItem } = useContext(CartContext);

  useEffect(() => {
    loadProduct(productId);
  }, []);

  const loadProduct = async (productId) => {
    try {
      let data = await getProductById(productId);
      console.log(data);
      setProduct({
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = (quantity, productId) => {
    if (!product.stock) {
      toast.error("Product is out of stock", {
        position: "top-right",
      });
      return;
    }
    addItem(quantity, productId, () => {
      toast.success("Item added to cart", {
        position: "top-right",
      });
    });
  };

  const productView = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <Container className="mb-2">
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={getProductImageUrl(product.productId)}
                        alt=""
                        onError={(event) => {
                          event.currentTarget.setAttribute(
                            "src",
                            profilePic,
                          );
                        }}
                        className="img-fluid"
                        style={{
                          width: "300px",
                          objectFit: "contain",
                        }}
                      />
                    </Col>

                    <Col md={8}>
                      {/* Product Title */}
                      <h5>{product.title}</h5>

                      {/* Category + Stock */}
                      <div className="mb-3">
                        {/* <Badge bg="info" pill>
                          {product.category?.title}
                        </Badge> */}
                        {product.stock && <GrStatusGood />}
                        <Badge
                          className="ms-2"
                          bg={product.stock ? "success" : "danger"}
                          pill
                        >
                          {product.stock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>

                      {/* Price */}
                      <div className="d-flex align-items-center justify-content-start gap-2 mb-4">
                        {product.discountPercentage > 0 ? (
                          <>
                            <span className="fw-bold fs-4 text-success">
                              ₹{product.discountedPrice}
                            </span>

                            <span className="fw-bold text-muted">
                              <s>₹{product.price}</s>
                            </span>

                            <Badge bg="danger" pill>
                              {product.discountPercentage}% OFF
                            </Badge>
                          </>
                        ) : (
                          <span className="fw-bold fs-4 text-success">
                            ₹{product.price}
                          </span>
                        )}
                      </div>

                      <div className="d-grid mt-4">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleAddItem(1, product.productId)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          as={Link}
                          to={"/store"}
                          className="mt-2"
                          size="sm"
                          variant="info"
                        >
                          Go to store
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>

                <div>
                  <ShowHtml htmlText={product.description} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          {product ? (
            productView()
          ) : (
            <Alert variant="danger">
              <h3 className="text-center mt-2">
                Product not loaded from server
              </h3>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
