import React, { useContext, useState } from "react";
import Base from "../components/Base";
import {
  Container,
  Form,
  Col,
  Row,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../services/user.service";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";

const Login = () => {

  let navigate= useNavigate();

  const userContext= useContext(UserContext)

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let[error, setError] = useState({
    erroData:null,
    isError: false
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const submitForm = (event) => {
        event.preventDefault();
        console.log(data)

        if (data.email === undefined || data.email.trim() === "") {
              toast.error("Email is required");
              return;
            }
        
            if (data.password === undefined || data.password.trim() === "") {
              toast.error("Password is required");
              return;
            }

      setLoading(true)
      loginUser(data)
      .then((data)=>{
      console.log(data)
      toast.success("Logged In");
      setError({
        erroData: null,
        isError: false
      })
      userContext.login(data);
      navigate("/users/home");
      clearData();

    })
    .catch((error)=>{
      toast.error("Something went wrong");
      setError({
        erroData: error,
        isError: true
      })
    })
    .finally(()=> {
      setLoading(false)
    })
  }

  const clearData = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const loginForm = () => {
    return (
      <Container>
        {/* Single Row ==> 12 grids (Col) */}
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-3 border-0 shadow p-4"
              style={{
                position: "relative",
                top: -50,
              }}
            >
              <Card.Body>
                <h3 className="mb-3 text-center text-uppercase">Sign-In</h3>

                <Alert className="mt-3" onClose={() => setError({
                       isError: false,
                      errorData: null
                    })} dismissible variant="danger" show={error.isError}>
                
                     <Alert.Heading>Username or passwod is incorrect</Alert.Heading>
                       <p> {error.errorData?.response?.data?.message}</p>  
                </Alert>
                <Form onSubmit={submitForm}>
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

                  {/* passwod */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter new Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </Form.Group>

                  <Container className="text-center mt-3">
                    <p className="text-center">
                      Forgot Password?{" "}
                      <NavLink
                         to="/forgetPassword"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        Click Here
                      </NavLink>
                    </p>
                    <p className="text-center">
                      Do you have an account?{" "}
                      <NavLink
                         to="/signup"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        SignUp
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
                      <span hidden={loading}>Login</span>
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
      title="E-Commerce Store | Sign In"
      description="Welcome back! Please login to your account to continue shopping"
    >
      {loginForm()}
    </Base>
  );
};

export default Login;
