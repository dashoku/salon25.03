import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createDiscount } from '../../../http/deviceAPI'; // Import the createDiscount function

const CreateDiscount = ({ show, onHide, onUpdateDiscounts }) => {
  const [description, setDescription] = useState('');
  const [percentage, setPercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const addDiscount = () => {
    if (!description || !percentage || !startDate || !endDate) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }

    const discountData = {
      description,
      percentage,
      start_date: startDate,
      end_date: endDate
    };

    createDiscount(discountData)
      .then((data) => {
        onUpdateDiscounts(); // Call the callback function to update the discount list
        setDescription('');
        setPercentage('');
        setStartDate('');
        setEndDate('');
        setError(null);
        onHide();
      })
      .catch(error => {
        setError('Сталася помилка під час додавання знижки');
        console.error('Помилка під час додавання знижки:', error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати знижку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDiscountDescription">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть опис знижки"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDiscountPercentage">
            <Form.Label>Відсоток</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введіть відсоток знижки"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDiscountStartDate">
            <Form.Label>Дата початку</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDiscountEndDate">
            <Form.Label>Дата закінчення</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-cancel' onClick={onHide}>
          Скасувати
        </Button>
        <Button className='btn-save' onClick={addDiscount}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDiscount;
