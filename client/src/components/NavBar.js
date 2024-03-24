import React, { useContext } from 'react';
import { Context } from '../index';
import './stylecomponents.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE, ABOUT_ROUTE, SALON_LIST_ROUTE, CATEGORY_LIST_ROUTE } from '../utils/consts';
import { Button, Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import Logo from './img/Logo.png';
import Call from './img/Call.png';
import Zoom from './img/Zoom.png';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="#FFFFFF" className="py-4">
      <Container>
        <NavLink to={HOME_ROUTE} className="header">
          <img src={Logo} alt="Logo" className="im" />
          <span>Краса</span>
        </NavLink>
        <Nav className="call">
          <img src={Call} alt="Logo" className="im" />
          <span>Подзвонити нам - (+380) 123 456 7890</span>
        </Nav>
        <Nav>
          <Button variant="light" className="button_find">
            <img src={Zoom} alt="Logo" className="im" />
            <span>Пошук</span>
          </Button>
        </Nav>
        <NavLink to={HOME_ROUTE} className='navlink'>
          <span>Головна</span>
        </NavLink>
        <Dropdown>
          <Dropdown.Toggle variant="none" className='about-navlink' id="dropdown-basic">
            Про нас
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <NavLink to={ABOUT_ROUTE} className='navlink'>
                Про салон
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to={CATEGORY_LIST_ROUTE} className='navlink'>
                Категорії
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to={SALON_LIST_ROUTE} className='navlink'>
                Салони
              </NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {user.isAuth ? (
          <Nav className="ml-auto">


            <NavLink to={ADMIN_ROUTE} className='navlinkauth'>
              <span>Таблиці</span>
            </NavLink>


            <NavLink to={HOME_ROUTE} className='navlinkauth'>
              <span>Записи</span>
            </NavLink>
            <NavLink to={PROFILE_ROUTE} className='navlinkauth'>
              <span>Профіль</span>
            </NavLink>




            <Button variant="light" className="logoInUt" onClick={() => logOut()}>
              Вийти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant="light" className="logoInUt" onClick={() => navigate(LOGIN_ROUTE)}>
              Увійти
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
