import React, { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getProductImageUrl } from "../../services/helper.service";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

const SingleCartItemView = ({ item, removeItemLocal }) => {
  const { cart, addItem, setCart, removeItem } = useContext(CartContext);
  return (
    <Card className="shadow-sm  mb-3">
      <Card.Body>
        <Row>
          {/* Product Image */}
          <Col
            md={1}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={getProductImageUrl(item.product.productId)}
              alt=""
              className="img-fluid"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
              }}
            />
          </Col>

          {/* Product Details */}
          <Col md={9}>
            <h5 className="fw-semibold">{item.product.title}</h5>

            <Row className="mt-2">
              <Col>
                <p className="mb-0">
                  <span className="fw-bold fs-6 ms-2">{item.quantity}</span>
                  <span className="text-muted"> Quantity</span>
                </p>
              </Col>

              <Col>
                <small className="text-muted">Price :</small>

                <span className="fw-bold text-success fs-6 ms-2">
                  ₹{item.product.discountedPrice}
                </span>
              </Col>

              <Col>
                <small className="text-muted">Total Price :</small>

                <span className="fw-bold text-primary fs-6 ms-2">
                  ₹{item.totalPrice}
                </span>
              </Col>
            </Row>
          </Col>

          {/* Action Buttons */}
          <Col md={2} className="d-flex flex-column align-items-end gap-2">
            <div className="w-100">
              <div className="d-grid">
                <Button
                  onClick={(event) => removeItem(item.cartItemId)}
                  variant="outline-danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>

              <div className="mt-2">
                <Row>
                  <Col className="d-grid">
                    <Button
                      onClick={() => {
                        const increaseQuantity = item.quantity + 1;

                        addItem(
                          increaseQuantity,
                          item.product.productId,
                          () => {
                            if (increaseQuantity > 1) {
                              toast.success("Quantity increased", {
                                position: "top-right",
                              });
                          
                            }
                          }
                        );
                      }}
                      variant="success"
                      size="sm"
                    >
                      +
                    </Button>
                  </Col>
                  <Col className="d-grid">
                    <Button
                      onClick={(event) => {
                        const decreaseQuantity = item.quantity - 1;
                        if (decreaseQuantity > 0) {
                          toast.success("Quantity decrease ");
                          addItem(decreaseQuantity, item.product.productId);
                        } else {
                          toast.info("Quantity cannot be less than 1");
                        }
                      }}
                      variant="danger"
                      size="sm"
                    >
                      -
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleCartItemView;
