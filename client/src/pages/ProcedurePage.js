/**import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneCategory } from "../http/deviceAPI";
import { Context } from '../index';

const CategoryPage = () => {
    const { basket } = useContext(Context);
    const [device, setCategory] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchOneCategory(id);
          setCategory(data);
        };
    
        fetchData();
      }, [id]);
      
    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Image width={400} height={'auto'} src={process.env.REACT_APP_API_URL + category.img}/>
                </Col>
                <Col md={5} className="ml-3">
                    <h1>{category.name}</h1>
                    
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 400, height: 150, fontSize: 32, border: '5px solid white'}}
                    >
                        <h1>Опис: {category.description} грн.</h1>
                    </Card>
                </Col>
               
            </Row>
            <Row>
                
            </Row>
        </Container>
    );
};

export default CategoryPage;
 */