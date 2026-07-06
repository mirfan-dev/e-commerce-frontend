import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrder } from "../services/order.service";
import UserContext from "../context/user.context";

const Cart = () => {
  const { cart, addItem, setCart, removeItem } = useContext(CartContext);
  const{userData} = useContext(UserContext)
  const [orderPlacedClick, setOrderPlacedClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    billingName: "",
    billingPhone: "",
    billingAddress: "",
    orderStatus: "PENDING",
    paymentStatus: "NOTPAID",
    cartId: "",
    userId: "",
  });

  const handleChange = (event, property) => {
    setOrderData({
      ...orderData,
      [property]: event.target.value,
    });
  };

  const clearData = () => {
    setOrderData({
      billingName: "",
      billingPhone: "",
      billingAddress: "",
      orderStatus: "PENDING",
      paymentStatus: "NOTPAID",
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (
      orderData.billingName === undefined ||
      orderData.billingName.trim() === ""
    ) {
      toast.error("Billing name is required");
      return;
    }

    if (
      orderData.billingAddress === undefined ||
      orderData.billingAddress.trim() === ""
    ) {
      toast.error("Billing Address is required");
      return;
    }

    if (
      orderData.billingPhone === undefined ||
      orderData.billingPhone.trim() === ""
    ) {
      toast.error("Billing phone is required");
      return;
    }

    if (
      orderData.orderStatus === undefined ||
      orderData.orderStatus.trim() === ""
    ) {
      toast.error("Order status is required");
      return;
    }


    try {
      setLoading(true);

      const finalOrderData = {
        ...orderData,
        cartId: cart.cartId,
        userId: userData.user.userId,
      };

      console.log(finalOrderData);

      const data = await addOrder(finalOrderData);

      console.log(data);

      toast.success("Order Created Successfully !!");

      setCart({
        ...cart,
        items: [],
      });

      clearData();
    } catch (error) {
      console.log(error);

      toast.error("Error in creating order");
    } finally {
      setLoading(false);
    }
  };

  const getTotalCartAmount = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  };

  const removeItemLocal = (itemId) => {
    removeItem(itemId);
  };

  const orderFormView = () => {
    return (
      <Container>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h3 className="mb-4 text-center text-uppercase">Add Order</h3>

            <Form onSubmit={submitForm}>
              {/* Billing Name */}
              <Form.Group className="mt-3">
                <Form.Label>Billing Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter billing name"
                  value={orderData.billingName}
                  onChange={(event) => handleChange(event, "billingName")}
                />
              </Form.Group>

              {/* Billing Phone */}
              <Form.Group className="mt-3">
                <Form.Label>Billing Phone</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter billing phone"
                  value={orderData.billingPhone}
                  onChange={(event) => handleChange(event, "billingPhone")}
                />
              </Form.Group>

              {/* Order Status */}
              <Form.Group className="mt-3">
                <Form.Label>Order Status</Form.Label>

                <Form.Select
                  value={orderData.orderStatus}
                  onChange={(event) => handleChange(event, "orderStatus")}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </Form.Select>
              </Form.Group>

              {/* Payment Status */}
              <Form.Group className="mt-3">
                <Form.Label>Payment Status</Form.Label>

                <Form.Select
                  value={orderData.paymentStatus}
                  onChange={(event) => handleChange(event, "paymentStatus")}
                >
                  <option value="NOTPAID">NOTPAID</option>
                  <option value="PAID">PAID</option>
                </Form.Select>
              </Form.Group>

              {/* Billing Address */}
              <Form.Group className="mt-3">
                <Form.Label>Billing Address</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter billing address"
                  value={orderData.billingAddress}
                  onChange={(event) => handleChange(event, "billingAddress")}
                />
              </Form.Group>

              <Container className="text-center mt-3">
                <Button type="submit" variant="success" disabled={loading}>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    hidden={!loading}
                  />

                  <span hidden={!loading}>Wait...</span>
                  <span hidden={loading}>Create Order</span>
                </Button>

                <Button className="ms-3" variant="danger" onClick={clearData}>
                  Reset
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };

  const cartView = () => {
    return (
      <Card className="mt-3 shadow-sm">
        <Card.Body>
          <Row className="px-5">
            <Col>
              <h1 className="fw-bold text-muted">Cart</h1>
            </Col>
            <Col>
              <h1 className="text-end fw-bold text-muted">
                {cart.items.length} Items
              </h1>
            </Col>
          </Row>

          <Row>
            <Col className="px-5 mt-3">
              {cart.items.map((item, index) => (
                <SingleCartItemView
                  key={index}
                  item={item}
                  removeItemLocal={removeItemLocal}
                />
              ))}
            </Col>
          </Row>
          <Container className="px-5">
            <h3 className="text-end fs-4">
              Total Amount:
              <span className="text-success ms-2">₹{getTotalCartAmount()}</span>
            </h3>
          </Container>
          <Container className="text-center">
            {!orderPlacedClick && (
              <Button onClick={(event) => setOrderPlacedClick(true)} size="sm">
                Place Order
              </Button>
            )}
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <Row>
        <Col md={orderPlacedClick ? 8 : 12}>
          {cart &&
            (cart?.items?.length > 0 ? (
              cartView()
            ) : (
              <Alert variant="danger" className="text-center mt-4">
                <h3>No item in cart</h3>

                <Button variant="info" as={Link} to="/store">
                  Go to Store
                </Button>
              </Alert>
            ))}
          {!cart && (
            <Alert variant="info" className="text-center mt-4">
              <h3>You are not logged in. Login first</h3>

              <Button variant="success" as={Link} to="/login">
                Login
              </Button>
            </Alert>
          )}
        </Col>
        {orderPlacedClick && (
          <Col md={4}>
            <Card className="mt-3 shadow-sm">
              <Card.Body>{orderFormView()}</Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
