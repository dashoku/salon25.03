import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Table, Spinner, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateDiscount from "../components/modals/discounts/CreateDiscount";
import EditDiscount from "../components/modals/discounts/EditDiscount";
import { fetchDiscounts as fetchDiscountsAPI, deleteDiscount } from "../http/deviceAPI";
import './stylepages.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${day}.${month}.${year}`;
};

const AdmDiscount = observer(() => {
    const [discountVisible, setDiscountVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchDiscounts = async () => {
        try {
            const response = await fetchDiscountsAPI();
            setDiscounts(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching discounts:', error);
            setError('Failed to fetch discounts. Please try again.');
            setLoading(false);
        }
    };

    const handleEdit = (discount) => {
        setSelectedDiscount(discount);
        setEditVisible(true);
    };

    const handleDelete = (discount) => {
        setSelectedDiscount(discount);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteDiscount(selectedDiscount.discount_id);
            fetchDiscounts();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Error deleting discount:', error);
            setError('Failed to delete discount. Please try again.');
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleUpdateDiscount = async () => {
        try {
            const updatedDiscounts = await fetchDiscountsAPI();
            setDiscounts(updatedDiscounts);
        } catch (error) {
            console.error('Error updating discounts list:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredDiscounts = discounts.filter(discount => {
        return discount.description.toLowerCase().includes(searchQuery.toLowerCase());

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
                                <th>Опис</th>
                                <th>Процент знижки</th>
                                <th>Дата початку</th>
                                <th>Дата завершення</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDiscounts.map(discount => (
                                <tr key={discount.discount_id}>
                                    <td>{discount.description}</td>
                                    <td>{discount.percentage}</td>
                                    <td>{formatDate(discount.start_date)}</td>
                                    <td>{formatDate(discount.end_date)}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(discount)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(discount)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setDiscountVisible(true)} >
                        Додати знижку
                    </Button>
                    <CreateDiscount
                        show={discountVisible}
                        onHide={() => setDiscountVisible(false)}
                        onUpdateDiscounts={fetchDiscounts}
                    />
                    <EditDiscount
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateDiscount={handleUpdateDiscount}
                        discount={selectedDiscount}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердити видалення</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Видалити знижку?</p>
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

export default AdmDiscount;
