// EditSalon component
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateSalon } from '../../../http/deviceAPI';

const EditSalon = ({ show, onHide, onUpdateSalon, salon }) => {
    const [name, setName] = useState(salon ? salon.name : '');
    const [address, setAddress] = useState(salon ? salon.address : '');
    const [description, setDescription] = useState(salon ? salon.description : '');
    const [image, setImage] = useState(null); // State for storing image file
    const [error, setError] = useState(null);

    const handleUpdateSalon = async () => {
        try {
            if (!name || !address || !description) {
                setError('Please fill in all fields.');
                return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', address);
            formData.append('description', description);
            formData.append('img', image);

            await updateSalon(salon.salon_id, formData);
            onUpdateSalon();
            setName('');
            setAddress('');
            setDescription('');
            setImage(null);
            setError(null);
            onHide();
        } catch (error) {
            setError('Error updating salon. Please try again.');
            console.error('Error updating salon:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати Дані</Modal.Title>
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
                            placeholder="Введіть адресу салону"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalonDescription">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть опис салону"
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
                <Button className='btn-save' onClick={handleUpdateSalon}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditSalon;
