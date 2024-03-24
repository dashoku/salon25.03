import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Container, Table, Spinner, Modal, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateProcedure from "../components/modals/procedures/CreateProcedure";
import EditProcedure from "../components/modals/procedures/EditProcedure";
import { fetchProcedures as fetchProceduresAPI, deleteProcedure } from "../http/deviceAPI";
import './stylepages.css';

const AdmProcedure = observer(() => {
    const [procedureVisible, setProcedureVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [procedures, setProcedures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProcedures = async () => {
        try {
            const response = await fetchProceduresAPI();
            setProcedures(response);
            setLoading(false);
        } catch (error) {
            console.error('Помилка отримання процедур:', error);
            setError('Помилка отримання процедур. Спробуйте ще раз.');
            setLoading(false);
        }
    };

    const handleEdit = (procedure) => {
        setSelectedProcedure(procedure);
        setEditVisible(true);
    };

    const handleDelete = (procedure) => {
        setSelectedProcedure(procedure);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProcedure(selectedProcedure.procedure_id);
            fetchProcedures();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Помилка отримання процедур:', error);
            setError('Помилка отримання процедур. Спробуйте ще раз.');
        }
    };

    useEffect(() => {
        fetchProcedures();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProcedures = procedures.filter(procedure => {
        return (
            procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            procedure.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <th>Назва процедури</th>
                                <th>Опис</th>
                                <th>Ціна</th>
                                <th>Категорія</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProcedures.map(procedure => (
                                <tr key={procedure.procedure_id}>
                                    <td>{procedure.procedure_id}</td>
                                    <td>{procedure.name}</td>
                                    <td>{procedure.description}</td>
                                    <td>{procedure.price}</td>
                                    <td>{procedure.category_id}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(procedure)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(procedure)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setProcedureVisible(true)} >
                        Додати Процедуру
                    </Button>
                    <CreateProcedure
                        show={procedureVisible}
                        onHide={() => setProcedureVisible(false)}
                        onUpdateProcedures={fetchProcedures}
                    />
                    <EditProcedure
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        procedure={selectedProcedure}
                        onUpdateProcedures={fetchProcedures}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити видалення</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Видалити процедуру?</p>
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

export default AdmProcedure;
