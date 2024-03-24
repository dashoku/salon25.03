import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Table, Spinner, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateClient from "../components/modals/clients/CreateClient";
import EditClient from "../components/modals/clients/EditClient";
import { fetchClients as fetchClientsAPI, deleteClient } from "../http/deviceAPI";
import './stylepages.css';

const AdmClient = observer(() => {
    const [clientVisible, setClientVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchClients = async () => {
        try {
            const response = await fetchClientsAPI();
            setClients(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setError('Failed to fetch clients. Please try again.');
            setLoading(false);
        }
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setEditVisible(true);
    };

    const handleDelete = (client) => {
        setSelectedClient(client);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteClient(selectedClient.client_id);
            fetchClients();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Error deleting client:', error);
            setError('Failed to delete client. Please try again.');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredClients = clients.filter(client => {
        return (
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                        placeholder="Пошук"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.client_id}>
                                    <td>{client.client_id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.surname}</td>
                                    <td>{client.email}</td>
                                    <td>{client.age}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(client)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(client)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setClientVisible(true)} >
                        Add Client
                    </Button>
                    <CreateClient
                        show={clientVisible}
                        onHide={() => setClientVisible(false)}
                        onUpdateClients={fetchClients}
                    />
                    <EditClient
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateClient={fetchClients}
                        client={selectedClient}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити видалення</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Ви дійсно хочете видалити цього клієнта?</p>
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

export default AdmClient;
