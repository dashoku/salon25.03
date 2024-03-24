import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { updateDiscount } from '../../../http/deviceAPI'; // Import the updateDiscount function

const EditDiscount = ({ show, onHide, onUpdateDiscount, discount }) => {
    const [description, setDescription] = useState(discount ? discount.description : '');
    const [percentage, setPercentage] = useState(discount ? discount.percentage : '');
    const [startDate, setStartDate] = useState(discount ? discount.start_date : '');
    const [endDate, setEndDate] = useState(discount ? discount.end_date : '');
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setDescription(discount ? discount.description : '');
        setPercentage(discount ? discount.percentage : '');
        setStartDate(discount ? discount.start_date : '');
        setEndDate(discount ? discount.end_date : '');
    }, [show, discount]);

    const handleUpdate = async () => {
        if (!description || !percentage || !startDate || !endDate) {
            setError('Будь ласка, заповніть усі поля');
            return;
        }

        const updatedDiscount = {
            ...discount,
            description: description,
            percentage: percentage,
            start_date: startDate,
            end_date: endDate
        };

        try {
            await updateDiscount(discount.discount_id, updatedDiscount);
            onUpdateDiscount();
            onHide();
        } catch (error) {
            setError('Помилка при оновленні знижки');
            console.error('Помилка при оновленні знижки:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати знижку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDiscountDescription">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть опис знижки"
                            value={discount || (discount && discount.description) || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiscountPercentage">
                        <Form.Label>Відсоток</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введіть відсоток знижки"
                            value={discount || (discount && discount.percentage) || ''}
                            onChange={(e) => setPercentage(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiscountStartDate">
                        <Form.Label>Дата початку</Form.Label>
                        <Form.Control
                            type="date"
                            value={discount || (discount && discount.startDate) || ''}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiscountEndDate">
                        <Form.Label>Дата закінчення</Form.Label>
                        <Form.Control
                            type="date"
                            value={discount || (discount && discount.endDate) || ''}
                            onChange={(e) => setEndDate(e.target.value)}
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

export default EditDiscount;
