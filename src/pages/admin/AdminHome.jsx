import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={11} md={10} lg={8} xl={7}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="text-center p-4 p-md-5">
              <h3 className="fw-bold mb-3">
                Welcome To Admin Dashboard
              </h3>

              <p className="text-muted mb-4">
                Customize admin dashboard, add categories, add products,
                manage orders, manage users and much more...
              </p>

              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Button
                  as={Link}
                  to={"/admins/categories"}
                  variant="outline-secondary"
                >
                  Manage Categories
                </Button>

                <Button
                  as={Link}
                  to={"/admins/products"}
                  variant="outline-secondary"
                >
                  Manage Products
                </Button>

                <Button
                  as={Link}
                  to={"/admins/userProfile"}
                  variant="outline-secondary"
                >
                  Manage Users
                </Button>

                <Button
                  as={Link}
                  to={"/admins/orders"}
                  variant="outline-secondary"
                >
                  Manage Orders
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;