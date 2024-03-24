import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Container, Table, Spinner, Modal, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateSalon from "../components/modals/salons/CreateSalon";
import EditSalon from "../components/modals/salons/EditSalon";
import { fetchSalons as fetchSalonsAPI, deleteSalon } from "../http/deviceAPI"; // Импортируем функции для работы с салонами
import './stylepages.css';

const AdmSalon = observer(() => {
    const [salonVisible, setSalonVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSalon, setSelectedSalon] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSalons = async () => {
        try {
            const response = await fetchSalonsAPI();
            setSalons(response);
            setLoading(false);
        } catch (error) {
            console.error('Помилка отримання салонів:', error);
            setError('Не вдалося отримати список салонів. Спробуйте ще раз.');
            setLoading(false);
        }
    };

    const handleEdit = (salon) => {
        setSelectedSalon(salon);
        setEditVisible(true);
    };

    const handleDelete = (salon) => {
        setSelectedSalon(salon);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            await deleteSalon(selectedSalon.salon_id);
            await fetchSalons();
            setDeleteVisible(false);
            setLoading(false);
        } catch (error) {
            console.error('Помилка видалення салону:', error);
            setError('Не вдалося видалити салон. Спробуйте ще раз.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalons();
    }, []);

    const handleUpdateSalon = async () => {
        try {
            setLoading(true);
            await fetchSalons();
            setLoading(false);
        } catch (error) {
            console.error('Помилка під час оновлення списку салонів:', error);
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSalons = salons.filter(salon => {
        return (
            salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            salon.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            salon.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <Container className="d-flex flex-column">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Завантаження...</span>
                </Spinner>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Form.Control
                        type="text"
                        placeholder="Пошук..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Назва</th>
                                <th>Адреса</th>
                                <th>Місто</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalons.map(salon => (
                                <tr key={salon.salon_id}>
                                    <td>{salon.salon_id}</td>
                                    <td>{salon.name}</td>
                                    <td>{salon.address}</td>
                                    <td>{salon.description}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(salon)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(salon)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setSalonVisible(true)} >
                        Додати салон
                    </Button>
                    <CreateSalon
                        show={salonVisible}
                        onHide={() => setSalonVisible(false)}
                        onSalonCreated={handleUpdateSalon}
                    />
                    <EditSalon
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateSalon={handleUpdateSalon}
                        salon={selectedSalon}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити видалення</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Ви впевнені, що хочете видалити салон?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn-cancel' onClick={() => setDeleteVisible(false)}>
                                Скасувати
                            </Button>
                            <Button className='btn-save' onClick={confirmDelete}>
                                Видалити
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Container>
    );
});

export default AdmSalon;
