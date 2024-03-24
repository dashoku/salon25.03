import React from 'react';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import './stylecomponents.css';
import Home from './img/salon-ic-home.png';
import Email from './img/salon-ic-email.png';
import Call from './img/salon-ic-call.png';


const SalonItem = ({ salon }) => {
  return (
    <Container className="salon-item">
      <Image className='salon-item-img' src={process.env.REACT_APP_API_URL + salon.img} alt={salon.name} />
      <Col className="salon-info-list">
        <h7 className='misto'>{salon.description}</h7>
        <h2>{salon.address}</h2>
        <Row className='salon-inf-item'>
          <img src={Home} alt="Home" className="salon-icons" />
          <div className='salon-items'>
            <p className='salon-item-title'>Відвідати нас :</p>
            <p className='salon-item-text'>{salon.address}</p>
          </div>
        </Row>

        <Row className='salon-inf-item'>
          <img src={Email} alt="Email" className="salon-icons" />
          <div className='salon-items'>
            <p className='salon-item-title'>Написати нам :</p>
            <p className='salon-item-text'>krasasupport@gmail.com</p>
          </div>
        </Row>

        <Row className='salon-inf-item'>
          <img src={Call} alt="Call" className="salon-icons" />
          <div className='salon-items'>
            <p className='salon-item-title'>Подзвонити нам :</p>
            <p className='salon-item-text'>+380 (67) 123 - 45 - 67</p>
          </div>
        </Row>
        <Button className="salon-button">ЗАПИСАТИСЯ</Button>
      </Col>
    </Container>

  );
};

export default SalonItem;
