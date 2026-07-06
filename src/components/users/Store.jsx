import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, ListGroup, Row } from "react-bootstrap";
import { getAllCategroy } from "../../services/category.service";
import { NavLink } from "react-router-dom";
import { getAllLiveProduct } from "../../services/product.service";
import SingleProductCart from "./SingleProductCart";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryView from "./CategoryView";

const Store = () => {
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadProduct(currentPage, 9, "addedDate", "desc");
  }, []);

  

  const loadProduct = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllLiveProduct(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        if (currentPage > 0) {
          setProduct({
            content: [...product.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        } else {
          setProduct({
            ...data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentPage > 0) {
      loadProduct(currentPage, 9, "addedDate", "desc");
    }
  }, [currentPage]);

  // loading next page
 const loadNextPage = () => {
  setCurrentPage((prev) => prev + 1);
};

  

  const productView = () => {
    return (
      product && (
        <>
          <InfiniteScroll
            dataLength={product.content.length}
            next={loadNextPage}
            hasMore={!product.lastPage}
            loader={
              <h2 className="my-5 text-center">Loading more products...</h2>
            }
            endMessage={
              <p className="my-4 text-center">All products loaded..</p>
            }
          >
          <Container>
            <Row className="g-4">
              {product.content.map((p) => {
                return (
                <Col key={p.productId} md={4}>
                  <SingleProductCart product={p} />
                </Col>
              )})}
            </Row>
            </Container>
          </InfiniteScroll>
        </>
      )
    );
  };

  return (
    <Container className="px-5 pt-5">
      <Row>
          <Breadcrumb className="mx-5">
            <Breadcrumb.Item>Store</Breadcrumb.Item>
            <Breadcrumb.Item>All Product</Breadcrumb.Item>
         </Breadcrumb>
        <Col md={2}><CategoryView/></Col>
        <Col md={10}>{productView()}</Col>
      </Row>
    </Container>
  );
};

export default Store;


