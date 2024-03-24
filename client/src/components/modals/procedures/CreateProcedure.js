import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createProcedure, fetchCategories } from '../../../http/deviceAPI';

const CreateProcedure = ({ show, onHide, onUpdateProcedures }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState(null); // State for storing image file
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addProcedure = () => {
    if (!name || !description || !price || !selectedCategory || !file) {
      setError('Please fill out all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', selectedCategory);
    formData.append('img', file);

    createProcedure(formData)
      .then((data) => {
        onUpdateProcedures();
        setName('');
        setDescription('');
        setPrice('');
        setSelectedCategory('');
        setFile(null);
        setError(null);
        onHide();
      })
      .catch(error => {
        setError('Error adding procedure');
        console.error('Error adding procedure:', error);
      });
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Додати процедуру</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProcedureName">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть назву процедури"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProcedureDescription">
            <Form.Label>Опис</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Введіть опис процедури"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProcedurePrice">
            <Form.Label>Вартість</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть вартість процедури"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formProcedureCategory">
            <Form.Label>Категорія</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Обрати категорію</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProcedureImage">
            <Form.Label>Зображення</Form.Label>
            <Form.Control type="file" onChange={selectFile} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-cancel' onClick={onHide}>
          Скасувати
        </Button>
        <Button className='btn-save' onClick={addProcedure}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProcedure;