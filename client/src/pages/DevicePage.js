import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from '../index';

const DevicePage = () => {
    const { basket } = useContext(Context);
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchOneDevice(id);
          setDevice(data);
        };
    
        fetchData();
      }, [id]);
    
      const addToBasket = () => {
        const selectedDevice = device;
        if (selectedDevice) {
            basket.addToBasket(selectedDevice);
          //setMessage('Product added to Basket');
        }
      };
      
    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Image width={400} height={'auto'} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={5} className="ml-3">
                    <h1>Опис</h1>
                    {device.info.map((info, index) =>
                        <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                            {info.title}: {info.description}
                        </Row>
                    )}
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 400, height: 150, fontSize: 32, border: '5px solid white'}}
                    >
                        <h3>Ціна: {device.price} грн.</h3>
                        <Button variant="outline-dark" onClick={addToBasket}>Додати до кошику</Button>
                    </Card>
                </Col>
               
            </Row>
            <Row>
                <Col md={4}>
                    <h3>{device.name}</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;
