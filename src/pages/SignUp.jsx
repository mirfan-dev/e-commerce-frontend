import { useState } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  let navigate= useNavigate();

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const clearData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
    });
  };

  // const[errorData , setErrorData] =useState({
  //   isError: false,
  //   errorData: null
  // })

  const submitForm = (event) => {
    event.preventDefault();
    if (data.name == undefined || data.name.trim() == "") {
      toast.error("Name is required");
      return;
    }
    if (data.email == undefined || data.email.trim() == "") {
      toast.error("Email is required");
      return;
    }
    if (data.about == undefined || data.about.trim() == "") {
      toast.error("About is required");
      return;
    }

    if (data.password == undefined || data.password.trim() == "") {
      toast.error("Password is required");
      return;
    }
    if (
      data.confirmPassword == undefined ||
      data.confirmPassword.trim() == ""
    ) {
      toast.error("ConfirmPassword is required");
      return;
    }

    if (data.password != data.confirmPassword) {
      toast.error("Password and Confirmed password not match");
      return;
    }

    setLoading(true);
    registerUser(data)
      .then((userData) => {
        console.log(data);
        toast.success("User Created Successfully !!");
        navigate("/login");
        clearData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in creating user");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const registerForm = () => {
    return (
      <Container>
        {/* Single Row ==> 12 grids (Col) */}
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Card
              className="my-3 border-0 shadow p-4"
              style={{
                position: "relative",
                top: -50,
              }}
            >
              <Card.Body>
                <h3 className="mb-3 text-center text-uppercase">SignUp</h3>
                <Form onSubmit={submitForm}>
                  {/* name */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                    />
                  </Form.Group>
                  {/* email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                  </Form.Group>
                  {/* gender */}
                  <Form.Group className="mb-3">
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type={"radio"}
                        id={`gender`}
                        value={"male"}
                        checked={data.gender == "male"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type={"radio"}
                        id={`gender`}
                        value={"female"}
                        checked={data.gender == "female"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                    </div>
                  </Form.Group>
                  {/* password */}
                  <Form.Group className="mb-3" controlId="formConfigPassword">
                    <Form.Label>enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new Password"
                      onChange={(event) =>
                        handleChange(event, "password")
                      }
                      value={data.password}
                    />
                  </Form.Group>
                  
                  {/* confirm passwod */}
                  <Form.Group className="mb-3" controlId="formConfigPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter Password"
                      onChange={(event) =>
                        handleChange(event, "confirmPassword")
                      }
                      value={data.confirmPassword}
                    />
                  </Form.Group>
                  {/* textarea */}
                  <Form.Group className="mb-3">
                    <Form.Label>Write Something about yourself</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={"6"}
                      placeholder="Write Here..."
                      onChange={(event) => handleChange(event, "about")}
                      value={data.about}
                    />
                  </Form.Group>

                  <Container className="text-center mt-3">
                    <p className="text-center">
                      Already have an account?{" "}
                      <NavLink
                        to="/login"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        Sign In
                      </NavLink>
                    </p>
                  </Container>
                  <Container className="text-center ">
                    <Button
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
                      <span hidden={loading}>Register</span>
                    </Button>
                    <Button
                      className="ms-3 text-uppercase"
                      variant="danger"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Base
  title="E-Commerce Store | SignUp" 
  description="Unlock a world of benefits! Sign up to track orders, save favorites, and experience seamless shopping"
>
      {registerForm()}
    </Base>
  );
};

export default SignUp;
