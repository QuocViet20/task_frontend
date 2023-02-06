import React from 'react';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
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
      <Navbar bg="success" expand="lg" variant="pills" >
        <Container >
          <Navbar.Brand >
            <NavLink className='text text-uppercase mx-4 text-decoration-none text-danger' to={RoutePath.Home}>Brands</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link as={NavLink} to={RoutePath.Home} >Home</Nav.Link>
              {authData.role === "Admin" ?
                (<Nav>
                  <Nav.Link as={NavLink} to={RoutePath.UserList} >Users</Nav.Link>
                  <Nav.Link as={NavLink} to={RoutePath.TaskList} >Tasks</Nav.Link>
                </Nav>) : (<></>)
              }
              {isLoggedIn && <Nav.Link as={NavLink} to={`/user/${authData.userId}/myTasks`} >My tasks</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          <Nav
            className="me-auto my-2 my-lg-0 mx-4"
            navbarScroll
          >
            {isLoggedIn ? (
              <NavDropdown title={authData.username} id="navbarScrollingDropdown">
                <NavDropdown.Item as={NavLink} to={`/user/${authData.userId}/myInformation`}>Personal Infomation</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={RoutePath.ResetPasswordUser}>
                  Reset Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to={RoutePath.Login} >Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout