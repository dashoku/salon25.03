import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { createMaster, fetchProcedures, fetchSalons } from '../../../http/deviceAPI';

const CreateMaster = ({ show, onHide, onUpdateMasters }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [selectedSalon, setSelectedSalon] = useState('');
    const [salons, setSalons] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedures, setSelectedProcedures] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salonsData = await fetchSalons();
                setSalons(salonsData);

                const proceduresData = await fetchProcedures();
                setProcedures(proceduresData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const addMaster = async () => {
        try {
            const data = await createMaster({
                name,
                password,
                phone,
                age,
                email,
                surname,
                salonId: selectedSalon,
                procedureIds: selectedProcedures.map(procedure => procedure.procedure_id)
            });
            onUpdateMasters();
            clearFields();
            onHide();
        } catch (error) {
            setError('An error occurred while adding the master');
            console.error('Error adding master:', error);
        }
    };

    const clearFields = () => {
        setName('');
        setPassword('');
        setPhone('');
        setAge('');
        setEmail('');
        setSurname('');
        setSelectedSalon('');
        setSelectedProcedures([]);
        setError(null);
    };

    const handleProcedureSelection = (procedureId) => {
        const index = selectedProcedures.indexOf(procedureId);
        if (index === -1) {
            // Процедура еще не выбрана, добавляем ее
            setSelectedProcedures([...selectedProcedures, procedureId]);
        } else {
            // Процедура уже выбрана, удаляем ее
            const updatedProcedures = [...selectedProcedures];
            updatedProcedures.splice(index, 1);
            setSelectedProcedures(updatedProcedures);
        }
    };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати Майстра</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formMasterName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterAge">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вік"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterEmail">
                        <Form.Label>Електронна пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введіть електронну пошту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMasterSurname">
                        <
                            Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть прізвище"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSalon">
                        <Form.Label>Салон</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedSalon}
                            onChange={(e) => setSelectedSalon(e.target.value)}
                        >
                            <option value="">Обрати Салон</option>
                            {salons.map((salon) => (
                                <option key={salon.salon_id} value={salon.salon_id}>
                                    {salon.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProcedures">
                        <Form.Label>Процедури</Form.Label>
                        {procedures.map(procedure => (
                            <Form.Check
                                key={procedure.procedure_id}
                                type="checkbox"
                                id={`procedure-${procedure.procedure_id}`}
                                label={procedure.name}
                                checked={selectedProcedures.includes(procedure.procedure_id)}
                                onChange={() => handleProcedureSelection(procedure.procedure_id)}
                            />
                        ))}
                    </Form.Group>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel' onClick={onHide}>
                    Скасувати
                </Button>
                <Button className='btn-save' onClick={addMaster}>
                    Зберегти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMaster;