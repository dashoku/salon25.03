// Import React and other necessary libraries
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Table, Spinner, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateMaster from "../components/modals/masters/CreateMaster";
import EditMaster from "../components/modals/masters/EditMaster";
import { fetchMasters as fetchMastersAPI, deleteMaster } from "../http/deviceAPI";
import './stylepages.css';

const AdmMaster = observer(() => {
    const [masterVisible, setMasterVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [masters, setMasters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMaster, setSelectedMaster] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchMasters = async () => {
        try {
            const response = await fetchMastersAPI();
            const mastersWithSalonAndProcedures = await Promise.all(response.map(async (master) => {
                const salonResponse = await fetchSalonForMaster(master.master_id);
                const proceduresResponse = await fetchProceduresForMaster(master.master_id);
                return { ...master, salon: salonResponse, procedures: proceduresResponse };
            }));
            setMasters(mastersWithSalonAndProcedures);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching masters:', error);
            setError('Failed to fetch masters. Please try again.');
            setLoading(false);
        }
    };

    const fetchSalonForMaster = async (masterId) => {
        try {
            const response = await fetch(`/api/masters/${masterId}/salon`);
            if (!response.ok) {
                throw new Error('Failed to fetch salon');
            }
            const salonData = await response.json();
            return salonData;
        } catch (error) {
            console.error('Error fetching salon:', error);
            return null;
        }
    };

    const fetchProceduresForMaster = async (masterId) => {
        try {
            const response = await fetch(`/api/masters/${masterId}/procedures`);
            if (!response.ok) {
                throw new Error('Failed to fetch procedures');
            }
            const proceduresData = await response.json();
            return proceduresData;
        } catch (error) {
            console.error('Error fetching procedures:', error);
            return null;
        }
    };

    const handleEdit = (master) => {
        setSelectedMaster(master);
        setEditVisible(true);
    };

    const handleDelete = (master) => {
        setSelectedMaster(master);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteMaster(selectedMaster.master_id);
            fetchMasters();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Error deleting master:', error);
            setError('Error deleting master. Please try again.');
        }
    };

    useEffect(() => {
        fetchMasters();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMasters = masters.filter(master => {
        const searchLowerCase = searchQuery.toLowerCase();
        return (
            master.name.toLowerCase().includes(searchLowerCase) ||
            master.surname.toLowerCase().includes(searchLowerCase) ||
            master.email.toLowerCase().includes(searchLowerCase)
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
                        className="mb-3"
                    />

                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ім'я</th>
                                <th>Призвіще</th>
                                <th>Телефон</th>
                                <th>Пошта</th>
                                <th>Вік</th>
                                <th>Салон</th>
                                <th>Процедури</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMasters.map(master => (
                                <tr key={master.master_id}>
                                    <td>{master.master_id}</td>
                                    <td>{master.name}</td>
                                    <td>{master.surname}</td>
                                    <td>{master.phone}</td>
                                    <td>{master.email}</td>
                                    <td>{master.age}</td>
                                    <td>{master.salon_id}</td>
                                    <td>
                                        {master.procedures ? (
                                            <ul>
                                                {master.procedures.map(procedure => (
                                                    <li key={procedure.procedure_id}>{procedure.name}</li>
                                                ))}
                                            </ul>
                                        ) : 'No Procedures'}
                                    </td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(master)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(master)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>


                    <Button className="add-button" onClick={() => setMasterVisible(true)} >
                        Додати майстра
                    </Button>
                    <CreateMaster
                        show={masterVisible}
                        onHide={() => setMasterVisible(false)}
                        onUpdateMasters={fetchMasters}
                    />
                    <EditMaster
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateMaster={fetchMasters}
                        master={selectedMaster}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити Видалити</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Видалити майстра?</p>
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

export default AdmMaster;
