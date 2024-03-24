  import React from 'react';
  import { NavLink } from 'react-router-dom';
  import SalonList from './SalonList';
  import './stylecomponents.css';

  const CategoryItem = ({ category }) => {
    return (
      <div className="category-item">
        <NavLink to={`${SalonList}/${category.category_id}`} className='navlink'>
          <img className='category-it-img' src={process.env.REACT_APP_API_URL + category.img} alt={category.name} />
          <h5>{category.name}</h5>
        </NavLink>
      </div>
    );
  };

  export default CategoryItem;
