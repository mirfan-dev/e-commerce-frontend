import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductOfCategories } from "../../services/product.service";
import { PRODUCT_PAGE_SIZE } from "../../services/helper.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import SingleProductCart from "../../components/users/SingleProductCart";
import CategoryView from "../../components/users/CategoryView";

const CategoriesStorePage = () => {
  const { categoryId, categoryTitle } = useParams();

  const [product, setProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);

    loadProductsOfCategories(
      0,
      PRODUCT_PAGE_SIZE,
      "addedDate",
      "desc"
    );
  }, [categoryId]);

  const loadProductsOfCategories = async (
    pageNumber,
    pageSize,
    sortBy,
    sortDir
  ) => {
    try {
      let data = await getProductOfCategories(
        categoryId,
        pageNumber,
        pageSize,
        sortBy,
        sortDir
      );

      console.log(data);

      if (pageNumber > 0) {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentPage > 0) {
      loadProductsOfCategories(
        currentPage,
        PRODUCT_PAGE_SIZE,
        "addedDate",
        "desc"
      );
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
              <h2 className="my-5 text-center">
                Loading more products...
              </h2>
            }
            endMessage={
              <p className="my-4 text-center">
                All products loaded..
              </p>
            }
          >
            <Container>
              <Row className="g-4">
                {product.content.map((p) => {
                  return (
                    <Col key={p.productId} md={4}>
                      <SingleProductCart product={p} />
                    </Col>
                  );
                })}
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
            <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
         </Breadcrumb>
        <Col md={2}>
          <CategoryView />
        </Col>

        <Col md={10}>
          {product && productView()}
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesStorePage;