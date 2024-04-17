import React, { useContext, useEffect } from "react";
import "./Header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../App";

const Header = () => {
  //   let role = "teacher";
  const { rol, acc, authCon } = React.useContext(Context);

  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [role, setRole] = rol;
  const checkRole = async () => {
    let checkRole = await authContract.checkRole(defaultAccount);
    setRole(checkRole);
    console.log(checkRole);
  };

  useEffect(() => {
    if (defaultAccount) {
      checkRole();
      console.log(role);
    }
  });

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Dapp
          </Navbar.Brand>
          <Nav className="flex-grow-1 justify-content-between me-auto">
            <Nav className="">
              <Nav.Link as={Link} to="/result">
                Result
              </Nav.Link>
              {role === "teacher" && (
                <Nav.Link as={Link} to="/add-result">
                  Add Result
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                Login
              </Nav.Link>
              {/* {login}
              {currentUser ? (
                <Nav.Link as={Link} to="/user">
                  <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )} */}
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
