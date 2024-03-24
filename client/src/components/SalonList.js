import React, { useState, useEffect } from 'react';
import SalonItem from './SalonItem';
import './stylecomponents.css';
import { fetchSalons } from '../http/deviceAPI';

const SalonList = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    const fetchAllSalons = async () => {
      try {
        const salonsData = await fetchSalons();
        setSalons(salonsData);
      } catch (error) {
        console.error('Ошибка загрузки салонов:', error);
      }
    };

    fetchAllSalons();
  }, []);

  return (
    <div className="salon-list-container">
      <p className="title-p1">САЛОНИ</p>
      <div className="salon-list">
        {salons.map(salon => (
          <SalonItem key={salon.salon_id} salon={salon} />
        ))}
      </div>
    </div>
  );
};

export default SalonList;

