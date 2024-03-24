import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createCategory } from '../../../http/deviceAPI';

const CreateCategory = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const addCategory = async () => {
    try {
      if (!name || !description || !file) {
        console.error('Please fill in all fields');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('img', file); // Ensure file is appended correctly

      await createCategory(formData);
      onHide();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };



  const selectFile = e => {
    setFile(e.target.files[0])
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати категорію</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть назву категорії"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategoryDescription">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть опис категорії"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategoryImage">
            <Form.Label>Зображення</Form.Label>
            <Form.Control type="file" onChange={selectFile} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-cancel' onClick={onHide}>
          Скасувати
        </Button>
        <Button className='btn-save' onClick={addCategory}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;
