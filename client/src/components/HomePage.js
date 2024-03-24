import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import './stylecomponents.css';
import Zn from './img/zn_home.png';
import HomeImg from './img/homeimg.png';

const HomePage = observer(() => {
    return (
        <Container className="home-container">
            <Row className="home-row">
                <Col>
                    <p className="home-p1"> <Image src={Zn} fluid className="align-self-center"/> Ласкаво просимо до салону Краси!!!</p>
                    <h1>Краса - це сила, а посмішка - її меч.</h1>
                    <p className="home-p">Місце сили незрівнянних укладок, ідеальних мейків та легендарних нейл-артів!</p>
                    <Button className="home-button">ЗАПИСАТИСЯ НА ПРОЦЕДУРУ</Button>
                </Col>
                <Col>
                    <Image className="home-img" src={HomeImg} fluid />
                </Col>
            </Row>
        </Container>
    );
});

export default HomePage;
