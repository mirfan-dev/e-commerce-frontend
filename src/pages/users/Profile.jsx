import React, { useContext, useEffect, useState } from "react";
import UserProfileView from "./UserProfileView";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import UserContext from "../../context/user.context";
import {
  getUserById,
  updateUser,
  userProfilePicture,
} from "../../services/user.service";
import { data, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profilePic from "../../assets/dp.jpg";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  // state for handle image
  const [image, setImage] = useState({
    placeholder: profilePic,
    file: null,
  });

  // modals state
  const [show, setShow] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowModal = () => {
    console.log("showing modal");
    setShow(true);
  };

  useEffect(() => {
    getUserDataFromServer();
  }, [userId]);

  const getUserDataFromServer = () => {
    //api call
    console.log(userContext);

    getUserById(userId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !");
      });
  };

  const updateFieldHandler = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  //update user data by calling api
  const updateUserData = () => {
    console.log("updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }

    // ...  rest of the field

    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User details updated !!");
        //update image:
        if (image.file == null) {
          setUpdateLoading(false);
          handleClose();
          return;
        }
        userProfilePicture(image.file, userId)
          .then((data) => {
            console.log(data);
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not uploaded !!");
          })
          .finally(() => {
            setUpdateLoading(false);
          });

        // handleClose()
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not updated !! Error");
        setUpdateLoading(false);
      });
  };

  //function for image change
  const handleProfileImageChange = (event) => {
    // const localFile=event.target.files[0]
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type == "image/jpeg"
    ) {
      //preview show
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholder: r.target.result,
          file: event.target.files[0],
        });

        console.log(r.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("Invalid File !!");
      image.file = null;
    }
  };

  //clear the image
  const clearImage = (event) => {
    setImage({
      placeholder: profilePic,
      file: null,
    });
  };

  const updateViewModel = () => {
    return (
      <div>
        <Modal size="lg" animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update the Informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                      <td>Profile Image</td>
                      <td>
                        {/* image tag for preview */}
                        <Container className="text-center mb-3">
                          <img
                            style={{ objectFit: "cover" }}
                            height={200}
                            width={200}
                            src={image.placeholder}
                            alt=""
                          />
                        </Container>

                        <InputGroup>
                          <Form.Control
                            type="file"
                            onChange={handleProfileImageChange}
                          />
                          <Button
                            onClick={clearImage}
                            variant="outline-secondary"
                          >
                            {" "}
                            Clear{" "}
                          </Button>
                        </InputGroup>
                        <p className="mt-2 text-muted">
                          Select Square size picture for better ui.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={user.name}
                          onChange={(event) =>
                            updateFieldHandler(event, "name")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <Form.Control
                          type="email"
                          placeholder="Enter Name"
                          value={user.email}
                          onChange={(event) =>
                            updateFieldHandler(event, "email")
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{user.gender}</td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          as={"textarea"}
                          rows={"6"}
                          placeholder="Write Here..."
                          onChange={(event) => handleChange(event, "about")}
                          value={user.about}
                          onChange={(event) =>
                            updateFieldHandler(event, "about")
                          }
                        />
                      </td>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={updateUserData}
              disabled={updateLoading}
            >
              <Spinner
                animation="border"
                size="sm"
                hidden={!updateLoading}
                className="me-2"
              />
              <span hidden={!updateLoading}>Updaing</span>
              <span hidden={updateLoading}> Save Changes</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  return (
    <Container className="mt-3">
      <Row>
        <Col
          md={{
            span: 8,
            offset: 2,
          }}
        >
          {user ? (
            <>
              <UserProfileView user={user} handleShowModal={handleShowModal} />
              {updateViewModel()}
            </>
          ) : (
            <Alert>
              <h3 className="text-center mt-2">User not loaded from server</h3>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
