import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../../services/helper.service";
import { GrStatusGood } from "react-icons/gr";

const SingleProductCart = ({ product }) => {
  return (
    <Card
      className="product-card border border-1 rounded-4 overflow-hidden mx-auto h-100"
      style={{
        width: "18rem",
      }}
    >
      {/* Product Image */}
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{
          height: "200px",
          padding: "15px",
        }}
      >
        <img
          src={getProductImageUrl(product.productId)}
          alt={product.title}
          className="img-fluid"
          style={{
            maxHeight: "100%",
            objectFit: "contain",
            transition: "0.3s ease",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        {/* Title */}
        <h6
          className="fw-bold  mb-2 text-center"
          style={{
            minHeight: "45px",
            lineHeight: "1.4",
          }}
        >
          {product.title}
        </h6>

        {/* Category + Stock */}
        <div className="d-flex justify-content-start align-items-center mb-2">
          {/* <Badge bg="primary" pill>
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
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-end gap-2 flex-wrap">
            {product.discountPercentage > 0 ? (
              <>
                <span className="fw-bold fs-5 text-success">
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
        </div>

        {/* Button */}
        <Button
          as={Link}
          to={`/store/product/${product.productId}`}
          variant="success"
          className="rounded-pill mt-auto fw-semibold"
        >
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCart;
