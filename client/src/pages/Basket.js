import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import DeviceItem from '../components/DeviceItem';

const Basket = observer(() => {
  const { basket } = useContext(Context);

  const handleEmptyCart = () => {
    basket.clearBasket();
  };

  return (
    <Container className="ml-10 mt-3 mb-4">
      <h3>{basket.basketItems.length === 0 ? 'Кошик порожній' : 'Кошик'}</h3>
      {basket.basketItems.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
      {basket.basketItems.length > 0 && (
        <Button variant="outline-danger mt-5" onClick={handleEmptyCart}>
          Очистити кошик
        </Button>
      )}
    </Container>
  );
});

export default Basket;
