import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateClient } from '../../../http/deviceAPI'; // Assuming this function is imported from the appropriate API file

const EditClient = ({ show, onHide, onUpdateClient, client }) => {
    const [name, setName] = useState(client ? client.name : '');
    const [surname, setSurname] = useState(client ? client.surname : '');
    const [email, setEmail] = useState(client ? client.email : '');
    const [age, setAge] = useState(client ? client.age : '');
    const [phone, setPhone] = useState(client ? client.phone : '');
    const [password, setPassword] = useState(client ? client.password : '');
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        if (!name || !surname || !email || !age || !phone || !password) {
            setError('Please fill in all fields');
            return;
        }

        const updatedClient = {
            ...client,
            name: name,
            surname: surname,
            email: email,
            age: age,
            phone: phone,
            password: password
        };

        try {
            await updateClient(client.client_id, updatedClient);
            onUpdateClient();
            onHide();
        } catch (error) {
            setError('Error updating client');
            console.error('Error updating client:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати дані</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formClientName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={client || (client && client.name) || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientSurname">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть прізвище"
                            value={client || (client && client.surname) || ''}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientEmail">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введіть електрону пошту"
                            value={client || (client && client.email) || ''}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введіть вік"
                            value={client || (client && client.age) || ''}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть телефон"
                            value={client || (client && client.phone) || ''}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={client || (client && client.password) || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default EditClient;
