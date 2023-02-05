import React from 'react';
import { Button, Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

// type
import { PageLayoutProps, RoutePath } from '../../../types';
import useAuth from '../../../hooks/useAuth';
import "./pageLayout.css"

const PageLayout = ({ children }: PageLayoutProps) => {
  const { authData, isLoggedAdmin, isLoggedIn, clearAuth } = useAuth();
  const navigate = useNavigate();
  console.log(isLoggedIn)

  const logout = () => {
    clearAuth();
    navigate(RoutePath.Login)
  }

  return (
    <div>
      <Navbar bg="success" expand="lg" >
        <Container >
          <Navbar.Brand >
            <NavLink className='text text-uppercase mx-4 text-decoration-none' to={RoutePath.Home}>Brand</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link as={NavLink} to={RoutePath.Home} className='text'>Home</Nav.Link>
              {authData.role === "Admin" ?
                (<Nav>
                  <Nav.Link as={NavLink} to={RoutePath.UserList} className='text'>Users</Nav.Link>
                  <Nav.Link as={NavLink} to={RoutePath.TaskList} className='text' >Tasks</Nav.Link>
                </Nav>) : (<></>)
              }
              {isLoggedIn && <Nav.Link as={NavLink} to={`/users/${authData.userId}/myTasks`} className='text'>My tasks</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          <Nav
            className="me-auto my-2 my-lg-0 mx-4 "
            navbarScroll
          >
            {isLoggedIn ? (
              <NavDropdown title={authData.username} id="navbarScrollingDropdown">
                <NavDropdown.Item as={NavLink} to={`/users/${authData.userId}`}>Personal Infomation</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={RoutePath.ResetPasswordUser}>
                  Reset Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to={RoutePath.Login} className='text'>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout