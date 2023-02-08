import React from 'react';
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

// type
import { PageLayoutProps, RoutePath } from '../../../types';
import useAuth from '../../../hooks/useAuth';
import "./pageLayout.scss"

const PageLayout = ({ children }: PageLayoutProps) => {
  const { authData, isLoggedAdmin, isLoggedIn, clearAuth } = useAuth();
  const navigate = useNavigate();
  console.log(isLoggedIn)

  const logout = () => {
    clearAuth();
    navigate(RoutePath.Login)
  }
  const link = useLocation()

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar_bg">
        <div className="container">
          <a className="prefix_brands" href="/">Brands</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">Brands</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
              <li className="nav-item">
                <a className={link.pathname === RoutePath.Home?"navbar_item_active ":"navBar_item " } aria-current="page" href={RoutePath.Home}>Home</a>
              </li>
              {authData.role === "Admin" && 
              <div className='d-flex'>
                <li className="nav-item">
                  <a className={link.pathname === RoutePath.UserList?"navbar_item_active ":"navBar_item "} href={RoutePath.UserList}>Users</a>
                </li>
                <li className="nav-item">
                  <a className={link.pathname === RoutePath.TaskList?"navbar_item_active ":"navBar_item "} href={RoutePath.TaskList}>Tasks</a>
                </li>
              </div>  }
              {isLoggedIn && 
                <li className="nav-item">
                  <a className={link.pathname === `/users/${authData.userId}` ? "navbar_item_active ":"navBar_item "} href={`/users/${authData.userId}`} >My tasks</a>
                </li>
              }
            </ul>
            {isLoggedIn ? 
                <NavDropdown title={authData.username} id="navbarScrollingDropdown" className='text_username'>
                <NavDropdown.Item as={NavLink} to={`/users/${authData.userId}/myInformation`}>Personal Infomation</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={RoutePath.ResetPasswordUser}>
                  Reset Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            :
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className=" navBar_item " aria-current="page" href={RoutePath.Login}>Login</a>
              </li>
          </ul>
            }
         
            
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout