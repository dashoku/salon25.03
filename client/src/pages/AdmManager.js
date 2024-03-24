import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Table, Spinner, Form} from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateManager from "../components/modals/managers/CreateManager";
import EditManager from "../components/modals/managers/EditManager";
import { fetchManagers as fetchManagersAPI, deleteManager } from "../http/deviceAPI";
import './stylepages.css';

const AdmManager = observer(() => {
    const [managerVisible, setManagerVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedManager, setSelectedManager] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchManagers = async () => {
        try {
            const response = await fetchManagersAPI();
            setManagers(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching managers:', error);
            setError('Failed to fetch managers. Please try again.');
            setLoading(false);
        }
    };

    const handleEdit = (manager) => {
        setSelectedManager(manager);
        setEditVisible(true);
    };

    const handleDelete = (manager) => {
        setSelectedManager(manager);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteManager(selectedManager.manager_id);
            fetchManagers();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Error deleting manager:', error);
            setError('Error deleting manager. Please try again.');
        }
    };

    useEffect(() => {
        fetchManagers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredManagers = managers.filter(manager => {
        const searchLowerCase = searchQuery.toLowerCase();
        return (
            manager.name.toLowerCase().includes(searchLowerCase) ||
            manager.surname.toLowerCase().includes(searchLowerCase) ||
            manager.email.toLowerCase().includes(searchLowerCase)
        );
    });

    return (
        <Container className="d-flex flex-column">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
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
                        className="mb-3"
                    />
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ім'я</th>
                                <th>Прізвище</th>
                                <th>Телефон</th>
                                <th>Електронна пошта</th>
                                <th>Вік</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredManagers.map(manager => (
                                <tr key={manager.manager_id}>
                                    <td>{manager.manager_id}</td>
                                    <td>{manager.name}</td>
                                    <td>{manager.surname}</td>
                                    <td>{manager.phone}</td>
                                    <td>{manager.email}</td>
                                    <td>{manager.age}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(manager)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(manager)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setManagerVisible(true)} >
                        Додати менеджера
                    </Button>
                    <CreateManager
                        show={managerVisible}
                        onHide={() => setManagerVisible(false)}
                        onUpdateManagers={fetchManagers}
                    />
                    <EditManager
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateManager={fetchManagers}
                        manager={selectedManager}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити Видалити</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Видалити менеджера?</p>
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

export default AdmManager;
