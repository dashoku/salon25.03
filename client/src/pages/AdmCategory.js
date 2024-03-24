import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import { Button, Container, Table, Spinner, Form } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import CreateCategory from "../components/modals/categories/CreateCategory";
import EditCategory from "../components/modals/categories/EditCategory";
import { fetchCategories as fetchCategoriesAPI, deleteCategory } from "../http/deviceAPI";
import './stylepages.css';

const AdmCategory = observer(() => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchCategories = async () => {
        try {
            const response = await fetchCategoriesAPI();
            setCategories(response);
            setLoading(false);
        } catch (error) {
            console.error('Помилка отримання категорій:', error);
            setError('Не вдалося отримати категорії. Спробуйте ще раз.');
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setEditVisible(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteCategory(selectedCategory.category_id);
            fetchCategories();
            setDeleteVisible(false);
        } catch (error) {
            console.error('Помилка видалення категорії:', error);
            setError('Помилка видалення категорії. Спробуйте ще раз.');
        }
    };

    useEffect(() => {
        setSearchQuery("");
        fetchCategories();
    }, []);

    const handleUpdateCategory = async () => {
        try {
            const updatedCategories = await fetchCategoriesAPI();
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Помилка при оновленні списку категорій:', error);
        }
    };

    const filteredCategories = categories.filter(category => {
        return category.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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
                                <th>Категорія</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map(category => (
                                <tr key={category.category_id}>
                                    <td>{category.category_id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button className='edit-button' onClick={() => handleEdit(category)}><PencilSquare /></Button>{' '}
                                        <Button className='delete-button' onClick={() => handleDelete(category)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                    <Button className="add-button" onClick={() => setCategoryVisible(true)} >
                        Додати категорію
                    </Button>
                    <CreateCategory
                        show={categoryVisible}
                        onHide={() => setCategoryVisible(false)}
                        onUpdateCategories={fetchCategories}
                    />
                    <EditCategory
                        show={editVisible}
                        onHide={() => setEditVisible(false)}
                        onUpdateCategory={handleUpdateCategory} // Передаем новую функцию обновления категорий
                        category={selectedCategory}
                    />
                    <Modal show={deleteVisible} onHide={() => setDeleteVisible(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Підтвердіть видалення</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Видалити категорію?</p>
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

export default AdmCategory;
