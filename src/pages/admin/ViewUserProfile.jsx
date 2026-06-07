import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { getAllUser, searchUser } from "../../services/user.service";
import SingleUserView from "../../components/admin/SingleUserView";
import { USER_PAGE_SIZE } from "../../services/helper.service";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

const ViewUserProfile = () => {
  const [user, setUser] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUser(0, USER_PAGE_SIZE, "createdAt", "desc");
  }, []);

  const getUser = (
    pageNumber = 0,
    pageSize = 10,
    sortBy = "name",
    sortDir = "desc",
  ) => {
    getAllUser(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in getting user data");
      });
  };

  const updateUserList = (userId) => {
    const newArray = user.content.filter((u) => u.userId !== userId);
    setUser({
      ...user,
      content: newArray,
    });
  };

  const searchUsers = () => {
    if (!searchQuery || searchQuery.trim() === "") {
      toast.warning("Please enter a search term");
      return;
    }

    searchUser(searchQuery.trim())
      .then((data) => {
        console.log("Search results:", data);
        if (Array.isArray(data)) {
          if (data.length === 0) {
            toast.info("No result found");
            setUser(null);
          } else {
            setUser({
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

  const userView = () => {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">View User</h5>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Search User</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search users..."
                className="rounded-start-pill rounded-end-pill"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                variant="outline-secondary"
                className="rounded-start-pill rounded-end-pill"
                onClick={searchUsers}
              >
                <FaSearch /> Search
              </Button>
            </InputGroup>
          </Form.Group>
          <Table striped bordered responsive className="text-center">
            <thead>
              <tr>
                <th className="px-3 small">#SN</th>
                <th className="px-3 small">Name</th>
                <th className="px-3 small">Email</th>
                <th className="px-3 small">Gender</th>
                <th className="px-3 small">About</th>
                <th className="px-3 small">CreatedAt</th>
                <th className="px-3 small">UpdatedAt</th>
                <th className="px-3 small">Action</th>
              </tr>
            </thead>
            <tbody>
              {user?.content?.map((users, index) => (
                <SingleUserView
                  key={users.userId}
                  index={index}
                  user={users}
                  updateUserList={updateUserList}
                />
              ))}
            </tbody>
          </Table>
          <Container>
            <Pagination className="d-flex justify-content-end">
              <Pagination.First
                onClick={(event) => {
                  getUser(0, USER_PAGE_SIZE, "createdAt", "desc");
                }}
                disabled={user.first}
              />

              <Pagination.Prev
                onClick={(event) => {
                  getUser(user.number - 1, USER_PAGE_SIZE, "createdAt", "desc");
                }}
                disabled={user.number === 0}
              />
              {[...Array(user.totalPages)]
                .map((obj, i) => i)
                .map((item) =>
                  user.pageNumber === item ? (
                    <Pagination.Item active key={item}>
                      {item + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      onClick={(event) => {
                        getUser(item, USER_PAGE_SIZE, "createdAt", "desc");
                      }}
                      key={item}
                    >
                      {item + 1}
                    </Pagination.Item>
                  ),
                )}
              <Pagination.Next
                onClick={(event) => {
                  getUser(user.number + 1, USER_PAGE_SIZE, "createdAt", "desc");
                }}
                disabled={user.number === user.totalPages - 1}
              />

              <Pagination.Last
                onClick={(event) => {
                  getUser(
                    user.totalPages - 1,
                    USER_PAGE_SIZE,
                    "createdAt",
                    "desc",
                  );
                }}
                disabled={user.last}
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
            {user ? (
              userView()
            ) : (
              <Alert>
                <h3 className="text-center mt-2">User not Found</h3>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewUserProfile;
