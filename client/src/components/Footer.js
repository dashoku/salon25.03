import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './stylecomponents.css';
import Logo from './img/Logo.png';
import { ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE, BASKET_ROUTE } from '../utils/consts';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="footer">
            <div className="logo">
              <img src={Logo} alt="Logo" />
              <span>Краса</span>
            </div>
          </Col>
          <Col md={6} className="footer">
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaFacebook className="icon" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaTwitter className="icon" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaInstagram className="icon" />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="divider" />
        <Row>
          <Col md={4} className="footer-list">
            <h5>Сторінки</h5>
            <ul>
              <li><a href={HOME_ROUTE}>Головна</a></li>
              <li><a href={HOME_ROUTE}>Про нас</a></li>
              {/* Добавьте другие страницы */}
            </ul>
          </Col>
          <Col md={4} className="footer-list">
            <h5>Залишайтесь на зв'язку</h5>
            <ul>
              <li><b>Адреса: </b><a href="#">вул. Заболотного 54, Одеса.</a></li>
              <li><b>Пошта: </b><a href="#">email@gmail.com.</a></li>
              <li><b>Телефон: </b><a href="#">+380 (67) 123 - 45 - 67.</a></li>
              {/* Добавьте другие элементы связи */}
            </ul>
          </Col>
          <Col md={4} className="footer-list">
            <h5>Графік роботи</h5>
            <ul>
              <li>Пн-Пт: 8:00 - 19:00</li>
              <li>Суббота: 9:00 - 19:00</li>
              <li>Неділя: 9:00 - 18:00</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
