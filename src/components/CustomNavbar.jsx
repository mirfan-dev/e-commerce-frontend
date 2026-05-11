import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/user.context";

const CustomNavbar = () => {

  const userContext = useContext(UserContext);

  const doLogout = () => {
    userContext.logout();
  }
  return (
    <Navbar className='bg-navbar-color' collapseOnSelect expand="lg"  variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"} className="d-flex align-items-center gap-2">
          <img
            src={logo}
            width={40}
            height={40}
            alt="logo"
            className="d-inline-block align-top"
          />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            E-Commerce-App
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to={"/services"}>Features</Nav.Link>
            <NavDropdown
              title="Categories"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Smart TVs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptop</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More..</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to={"/about"}>About</Nav.Link>
            <Nav.Link as={NavLink} to={"/contact"}>Contact Us</Nav.Link>
          </Nav>
          <Nav>

            <Nav.Link as={NavLink} to={"/cart"}>Cart (40)</Nav.Link>

            {
              (userContext.isLogin)? (
              <>

                ({userContext.adminData && (
                  <>
                    <Nav.Link as={NavLink} to={"/admins/home"}>AdminDashboard</Nav.Link>
                  </>
                )})
               <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>{userContext.userData?.user?.email}</Nav.Link>
               <Nav.Link onClick={doLogout}>Logout</Nav.Link></>
              ):(
                <><Nav.Link as={NavLink} to={"/login"}>Login</Nav.Link>
                 <Nav.Link as={NavLink} to={"/signup"}>SignUp</Nav.Link></>
              )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
