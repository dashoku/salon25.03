// CategoryList.js
import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import './stylecomponents.css';
import { fetchCategories } from '../http/deviceAPI'; // Предположим, что у вас есть функция для получения списка категорий

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <div className="category-list-container">
      <p className="title-p1">КАТЕГОРІЇ</p>
      <div className="category-list">
        {categories.map(category => (
          <CategoryItem key={category.category_id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

