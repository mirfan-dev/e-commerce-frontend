import React, { useContext, useState } from "react";
import { Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { BASE_URL, formatDate } from "../../services/helper.service";
import UserContext from "../../context/user.context";
import { updateUser } from "../../services/user.service";
import profilePic from "../../assets/dp.jpg";

const UserProfileView = ({ user, handleShowModal }) => {
  const [loading, setLoading] = useState(false);
  const { userData, isLogin } = useContext(UserContext);

  return (
    <>
      {user && (
        <Card className="m-3 border-0 shadow">
          <Card.Body>
            <Container className="text-center my-3 ">
              <img
                onError={(event) => {
                  console.log("error");
                  event.currentTarget.setAttribute("src", profilePic);
                }}
                className="border border-dark"
                src={user.imageName ? BASE_URL + '/users/image/' + user.userId + '?' + new Date().getTime() : profilePic} 
                alt="ProfilePic"
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Container>
            <h3 className="text-center text-uppercase fw-bold">{user.name}</h3>
            <div className="mt-3">
              <Card
                className="border-0 shadow-sm "
                style={{
                  borderRadius: "50px",
                }}
              >
                <Card.Body>
                  <Table className="text-center" responsive hover>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{user.gender}</td>
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>{user.about}</td>
                      </tr>
                      <tr>
                        <td>CreatedDateTime</td>
                        <td>{formatDate(user.createdAt)}</td>
                      </tr>
                      <tr>
                        <td>UpdatedDateTime</td>
                        <td>{formatDate(user.updatedAt)}</td>
                      </tr>
                      <tr>
                        <td>Roles</td>
                        <td>
                          {user.roles.map((role, index) => (
                            <div key={role.roleId}>{role.roleName}</div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
            {isLogin && userData.user.userId === user.userId ? (
              <Container className="text-center mt-5 ">
                <Button
                  onClick={handleShowModal}
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
                  <span hidden={loading}>Update</span>
                </Button>
                <Button
                  type="submit"
                  className="text-uppercase ms-3"
                  variant="warning"
                  disabled={loading}
                >
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    hidden={!loading}
                  />
                  <span hidden={!loading}>Wait...</span>
                  <span hidden={loading}>Order</span>
                </Button>
              </Container>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default UserProfileView;
