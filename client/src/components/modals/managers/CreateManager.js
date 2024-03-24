import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createManager } from '../../../http/deviceAPI'; 

const CreateManager = ({ show, onHide, onUpdateManagers }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [error, setError] = useState(null);

    const addManager = () => {
        if (!name || !password || !phone || !age || !email || !surname) {
            setError('Please fill in all fields');
            return;
        }

        createManager({ name, password, phone, age, email, surname })
        .then((data) => {
            onUpdateManagers(); 
            setName('');
            setPassword('');
            setPhone('');
            setAge('');
            setEmail('');
            setSurname('');
            setError(null);
            onHide();
        })
        .catch(error => {
            setError('Виникла помилка під час додавання менеджера');
            console.error('Помилка додавання менеджера:', error);
        });
};


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати менеджера</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formManagerrName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вік"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerEmail">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введіть електронну пошту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerSurname">
                        <Form.Label>Призвіще</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть прізвище"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Скасувати
                </Button>
                <Button className='btn-save' onClick={addManager}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateManager;
