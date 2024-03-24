import React from 'react';
import { Button } from 'react-bootstrap';
import './stylepages.css';

const ButtonGroup = () => {
  return (
    <div className="button-container">
      <Button variant="primary" className="custom-button">Профіль</Button>
      <Button variant="secondary" className="custom-button">Пароль</Button>
      <Button variant="secondary" className="custom-button">Налаштування</Button>
      <Button variant="secondary" className="custom-button">Витрати</Button>
    </div>
  );
};

export default ButtonGroup;
