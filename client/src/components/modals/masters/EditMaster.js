// EditMaster.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateMaster } from '../../../http/deviceAPI'; // Assuming this function is imported from the appropriate API file

const EditMaster = ({ show, onHide, onUpdateMaster, master }) => {
    const [name, setName] = useState(master ? master.name : '');
    const [password, setPassword] = useState(master ? master.password : '');
    const [phone, setPhone] = useState(master ? master.phone : '');
    const [age, setAge] = useState(master ? master.age : '');
    const [email, setEmail] = useState(master ? master.email : '');
    const [surname, setSurname] = useState(master ? master.surname : '');
    const [error, setError] = useState(null);

    const handleUpdate = async () => {
        if (!name || !password || !phone || !age || !email || !surname) {
            setError('Please fill in all fields');
            return;
        }

        const updatedMaster = {
            ...master,
            name: name,
            password: password,
            phone: phone,
            age: age,
            email: email,
            surname: surname
        };

        try {
            await updateMaster(master.master_id, updatedMaster);
            onUpdateMaster();
            onHide();
        } catch (error) {
            setError('Error updating master');
            console.error('Error updating master:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати Дані</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMasterName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={master || (master && master.name) || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={master || (master && master.password) || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть телефон"
                            value={master || (master && master.phone) || ''}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вік"
                            value={master || (master && master.age) || ''}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterEmail">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ведіть електрону пошту"
                            value={master || (master && master.email) || ''}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterSurname">
                        <Form.Label>Призвіще</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть призвіще"
                            value={master || (master && master.surname) || ''}
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
                <Button className='btn-save' onClick={handleUpdate}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMaster;
