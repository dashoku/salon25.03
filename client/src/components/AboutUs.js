import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import './stylecomponents.css';
import AboutImg from './img/aboutimg.png';
import Expert from './img/expert.png';
import Posl from './img/poslugi.png';
import Natur from './img/natural.png';

const AboutPage = observer(() => {
    return (
        <Container className="about-container">
            <Row className="about-row">
                <Col>
                    <p className="title-p1"> ПРО НАС</p>
                    <h1>Краса - це про те, щоб відчувати себе комфортно!</h1>
                    <p className="about-p"> Ми використовуємо лише найсучасніші засоби та техніки, щоб забезпечити нашим клієнтам найвищу якість обслуговування. Приходьте до нас і насолоджуйтеся моментами догляду за собою, де ваше благополуччя та задоволення є нашим пріоритетом.</p>

                    <div className="d-flex justify-content-between">
                        <div className='about-3im'>
                            <Image src={Expert} fluid />
                            <p>Експерти з краси</p>
                        </div>
                        <div className='about-3im'>
                            <Image src={Posl} fluid />
                            <p>Супер Послуги</p>
                        </div>
                        <div className='about-3im'>
                            <Image src={Natur} fluid />
                            <p>100% Натуральний</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Image className="about-img" src={AboutImg} fluid />
                </Col>
            </Row>
        </Container>
    );
});

export default AboutPage;
