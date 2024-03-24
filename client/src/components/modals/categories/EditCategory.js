import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateCategory } from '../../../http/deviceAPI';

const EditCategory = ({ show, onHide, category }) => {
    const [name, setName] = useState(category ? category.name : '');
    const [description, setDescription] = useState(category ? category.description : '');
    const [img, setImg] = useState(null); // State for storing image file

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('img', img); // Append image file to form data
            await updateCategory(category.category_id, formData);
            onHide();
        } catch (error) {
            console.error('Error updating category:', error);
            // Handle error
        }
    };

    const selectImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати категорію</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Назва</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть назву категорії"
                            value={name || (category && category.name) || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategoryDescription">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть опис категорії"
                            value={description || (category && category.description) || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategoryImage">
                        <Form.Label>Зображення</Form.Label>
                        <Form.Control type="file" onChange={selectImage} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Скасувати
                </Button>
                <Button className='btn-save' onClick={handleUpdate}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCategory;
