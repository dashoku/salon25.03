// CreateBrand.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('');

  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue('');
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      {/* ... */}
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Введіть назву типу'}
          />
        </Form>
      </Modal.Body>
      {/* ... */}
    </Modal>
  );
};

export default CreateBrand;
