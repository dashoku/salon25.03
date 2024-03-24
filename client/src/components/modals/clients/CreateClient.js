// CreateClient.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createClient } from '../../../http/deviceAPI'; 

const CreateClient = ({ show, onHide, onUpdateClients }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const addClient = () => {
        if (!name || !surname || !email || !age || !phone || !password) {
            setError('Please fill in all fields');
            return;
        }

        createClient({ name, surname, email, age, phone, password })
            .then((data) => {
                onUpdateClients(); 
                setName('');
                setSurname('');
                setEmail('');
                setAge('');
                setPhone('');
                setPassword('');
                setError(null);
                onHide();
            })
            .catch(error => {
                console.error('Помилка створення клієнтів:', error);
            setError('Помилка створення клієнтів. Спробуйте ще раз.');
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати клієнта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formClientName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientSurname">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть прізвище"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientEmail">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введіть електронну пошту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введіть вік"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введіть телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formClientPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={password}
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
                <Button className='btn-save' onClick={addClient}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateClient;
