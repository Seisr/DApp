import React, { useContext, useEffect } from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../App";
const ethers = require("ethers");
// const navigate = useNavigate();

const Header = () => {
  const { rol, acc, authCon, user, connButton } = React.useContext(Context);

  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [currentUser, setCurrentUser] = user;
  const [role, setRole] = rol;
  const [connButtonText, setConnButtonText] = connButton;

  const checkRole = async () => {
    let checkRole = await authContract.checkRole(defaultAccount);
    let checkRole2 = ethers.utils.parseBytes32String(checkRole);
    setRole(checkRole2);
    console.log(checkRole2);
  };

  useEffect(() => {
    if (defaultAccount) {
      checkRole();
      console.log(role);
    }
  });

  const logoutHandler = async () => {
    setCurrentUser("");
    setRole("");
    setDefaultAccount("");
    setConnButtonText("Connect Wallet");
    // navigate.navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            CMS
          </Navbar.Brand>
          <Nav className="flex-grow-1 justify-content-between me-auto">
            <Nav className="">
              {role === "admin" && (
                <>
                  <Nav.Link as={Link} to="/result">
                    Result
                  </Nav.Link>
                  <Nav.Link as={Link} to="/add-result">
                    Add Result
                  </Nav.Link>
                  <Nav.Link as={Link} to="/manage">
                    Manage
                  </Nav.Link>
                </>
              )}
              {role === "teacher" && (
                <>
                  <Nav.Link as={Link} to="/result">
                    Result
                  </Nav.Link>
                  <Nav.Link as={Link} to="/add-result">
                    Add Result
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/manage">
                    Manage
                  </Nav.Link> */}
                </>
              )}
              {role === "student" && (
                <>
                  <Nav.Link as={Link} to="/result">
                    Result
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/add-result">
                    Add Result
                  </Nav.Link> */}
                  {/* <Nav.Link as={Link} to="/manage">
                    Manage
                  </Nav.Link> */}
                </>
              )}
            </Nav>
            <Nav>
              {currentUser ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    <FontAwesomeIcon icon={faUser} />
                  </Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={logoutHandler}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
