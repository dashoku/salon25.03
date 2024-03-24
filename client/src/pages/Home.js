import { Container } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import HomePage from '../components/HomePage';
import AboutUs from '../components/AboutUs';
import CategoryList from '../components/CategoryList'; 
import SalonList from '../components/SalonList'; 

const Home = observer(() => {

    return (
        <Container>
           <HomePage/>
           <AboutUs/>
           <CategoryList />
           <SalonList /> 
        </Container>
    );
});

export default Home;
