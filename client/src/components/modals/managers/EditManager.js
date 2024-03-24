import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { updateManager } from '../../../http/deviceAPI'; // Assuming this function is imported from the appropriate API file

const EditManager = ({ show, onHide, onUpdateManager, manager }) => {
    const [name, setName] = useState(manager ? manager.name : '');
    const [password, setPassword] = useState(manager ? manager.password : '');
    const [phone, setPhone] = useState(manager ? manager.phone : '');
    const [age, setAge] = useState(manager ? manager.age : '');
    const [email, setEmail] = useState(manager ? manager.email : '');
    const [surname, setSurname] = useState(manager ? manager.surname : '');
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        if (!name || !password || !phone || !age || !email || !surname) {
            setError('Please fill in all fields');
            return;
        }

        const updatedManager = {
            ...manager,
            name: name,
            password: password,
            phone: phone,
            age: age,
            email: email,
            surname: surname
        };

        try {
            await updateManager(manager.manager_id, updatedManager);
            onUpdateManager();
            onHide();
        } catch (error) {
            setError('Помилка оновлення даних');
            console.error('Помилка оновлення даних:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати Дані</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formManagerName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={manager || (manager && manager.name) || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={manager || (manager && manager.password) || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть телефон"
                            value={manager || (manager && manager.phone) || ''}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вік"
                            value={manager || (manager && manager.age) || ''}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerEmail">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введіть електронну пошту"
                            value={manager || (manager && manager.email) || ''}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerSurname">
                        <Form.Label>Призвіще</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть прізвище"
                            value={manager || (manager && manager.surname) || ''}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Зберегти
                </Button>
                <Button className='btn-save' onClick={handleUpdate}>
                    Скасувати
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditManager;
