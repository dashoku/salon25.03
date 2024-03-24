// CreateSalon component
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createSalon } from '../../../http/deviceAPI';

const CreateSalon = ({ show, onHide, onSalonCreated }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // State for storing image file
    const [error, setError] = useState(null);

    const handleCreateSalon = async () => {
        try {
            if (!name || !address || !description || !image) {
                setError('Please fill in all fields.');
                return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', address);
            formData.append('description', description);
            formData.append('img', image);

            await createSalon(formData);
            setName('');
            setAddress('');
            setDescription('');
            setImage(null);
            setError(null);
            onHide();
            onSalonCreated();
        } catch (error) {
            setError('Error creating salon. Please try again.');
            console.error('Error creating salon:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати Салон</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formSalonName">
                        <Form.Label>Назва</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть назву салону"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalonAddress">
                        <Form.Label>Адреса</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть адресу салона"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalonDescription">
                        <Form.Label>Місто</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть місто салона"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalonImage">
                        <Form.Label>Зображення</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Скасувати
                </Button>
                <Button className='btn-save' onClick={handleCreateSalon}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSalon;
