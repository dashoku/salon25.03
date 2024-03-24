import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import './stylepages.css';
import ButtonGroup from './ButtonGroup';
import ProfileImg from './img/homeimg.png';
import { Context } from '../index';
import { fetchOneUser } from "../http/userAPI";

const Profile = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                if (user.id) { // Check if user.id is defined
                    const userData = await fetchOneUser(user.id);
                    user.setUserProfile(userData);
                } else {
                    console.error('User ID is undefined');
                    // Handle the case where user.id is undefined
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Handle error
            }
        };
    
        loadUserProfile();
    }, [user]);
    

    return (
        <Container className="profile-container">
            <ButtonGroup />
            <Col className="u-prof-container">
                <Row className="profile-row">
                    <Col xs={12} md={4}>
                        <Image src={ProfileImg} roundedCircle fluid />
                    </Col>
                    <Col xs={12} md={8}>
                        <h2>{user.id} {user.surname}</h2>
                        <Col className="profile-p">
                            <div>
                                <p>{user.phone}</p>
                                <p>{user.email}</p>
                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='ml-3'>Опис.{user.id}</p>
                        <Button className="prof-button">Редагувати</Button>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
});

export default Profile;
