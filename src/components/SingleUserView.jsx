
import React from 'react';
import { Button, Card, Container, Row, Col, Table } from 'react-bootstrap';

const SingleUserView = ({ order }) => {

  

  return (
    <Card className="border-0 shadow-sm mb-3">
      <Card.Body>

        <Row>
          <Col>
            <b>Order ID:</b> {order.orderId}
          </Col>

          <Col>
            <b>Billing Name:</b> {order?.billingName}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Table bordered striped hover>
              <tbody>
                <tr>
                  <td>Billing Phone</td>
                  <td>{order?.billingPhone}</td>
                </tr>

                <tr>
                  <td>Billing Address</td>
                  <td>{order?.billingAddress}</td>
                </tr>

                <tr>
                  <td>Order Status</td>
                  <td>{order?.orderStatus}</td>
                </tr>

                <tr>
                  <td>Payment Status</td>
                  <td>{order?.paymentStatus}</td>
                </tr>

                <tr>
                  <td>Order Date</td>
                  <td>{order?.orderedDate}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Container className="text-end">
          <Button size="sm" variant="info">
            Order View Details
          </Button>
        </Container>

      </Card.Body>
    </Card>
  );
};

export default SingleUserView;
