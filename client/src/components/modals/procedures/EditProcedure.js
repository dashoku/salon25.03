import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateProcedure, fetchCategories } from '../../../http/deviceAPI';

const EditProcedure = ({ show, onHide, onUpdateProcedures, procedure }) => {
    const [name, setName] = useState(procedure ? procedure.name : '');
    const [description, setDescription] = useState(procedure ? procedure.description : '');
    const [price, setPrice] = useState(procedure ? procedure.price : '');
    const [error, setError] = useState(null);
    const [isModified, setIsModified] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(procedure ? procedure.category_id : '');
    useEffect(() => {
        setIsModified(false);
    }, [show]);

    useEffect(() => {
        setSelectedCategory(procedure ? procedure.category_id : '');
    }, [procedure]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Помилка редагування даних:', error);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async () => {
        if (!name || !description || !price || !selectedCategory) {
            setError('Please fill out all fields');
            return;
        }

        const updatedProcedure = {
            ...procedure,
            name: name,
            description: description,
            price: price,
            category_id: selectedCategory,
        };

        try {
            await updateProcedure(procedure.procedure_id, updatedProcedure);
            onUpdateProcedures();
            onHide();
        } catch (error) {
            setError('Error updating procedure: ' + error.message);
            console.error('Error updating procedure:', error);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsModified(true);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setIsModified(true);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        setIsModified(true);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setIsModified(true);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати Дані</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProcedureName">
                        <Form.Label>Назва</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть назву процедури"
                            value={name || (procedure && procedure.name) || ''}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProcedureDescription">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть опис процедури"
                            value={description || (procedure && procedure.description) || ''}
                            onChange={handleDescriptionChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProcedurePrice">
                        <Form.Label>Вартість</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вартість процедури"
                            value={price || (procedure && procedure.price) || ''}
                            onChange={handlePriceChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProcedureCategory">
                        <Form.Label>Категорія</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Виберіть категорію</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Скасувати
                </Button>
                <Button className='btn-save' onClick={handleUpdate} disabled={!isModified}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProcedure;
