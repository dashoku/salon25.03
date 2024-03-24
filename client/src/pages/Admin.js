import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import AdmCategory from "./AdmCategory";
import AdmProcedure from "./AdmProcedure";
import AdmSalon from "./AdmSalon";
import AdmMaster from "./AdmMaster";
import AdmClient from "./AdmClient";
import AdmManager from "./AdmManager";
import AdmDiscount from "./AdmDiscount";

import './stylepages.css';

const Admin = () => {
    const [showCategory, setShowCategory] = useState(false);
    const [showProcedure, setShowProcedure] = useState(false);
    const [showSalon, setShowSalon] = useState(false);
    const [showMaster, setShowMaster] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);

    const handleCategoryClick = () => {
        setShowCategory(true);
        setShowProcedure(false);
        setShowSalon(false);
        setShowMaster(false);
        setShowClient(false);
        setShowManager(false); 
        setShowDiscount(false); 
    };

    const handleProcedureClick = () => {
        setShowCategory(false);
        setShowProcedure(true);
        setShowSalon(false);
        setShowMaster(false);
        setShowClient(false);
        setShowManager(false); 
        setShowDiscount(false); 
    };

    const handleSalonClick = () => {
        setShowCategory(false);
        setShowProcedure(false);
        setShowSalon(true);
        setShowMaster(false);
        setShowClient(false);
        setShowManager(false);
        setShowDiscount(false);  
    };

    const handleMasterClick = () => {
        setShowCategory(false);
        setShowProcedure(false);
        setShowSalon(false);
        setShowMaster(true);
        setShowClient(false);
        setShowManager(false); 
        setShowDiscount(false); 
    };

    const handleClientClick = () => {
        setShowCategory(false);
        setShowProcedure(false);
        setShowSalon(false);
        setShowMaster(false);
        setShowClient(true);
        setShowManager(false);
        setShowDiscount(false);  
    };

    const handleManagerClick = () => {
        setShowCategory(false);
        setShowProcedure(false);
        setShowSalon(false);
        setShowMaster(false);
        setShowClient(false);
        setShowManager(true);
        setShowDiscount(false);  
    };

    const handleDiscountClick = () => {
        setShowCategory(false);
        setShowProcedure(false);
        setShowSalon(false);
        setShowMaster(false);
        setShowClient(false);
        setShowManager(false); 
        setShowDiscount(true); 
    };


    return (
        <Container className="adm-container">
            <div className="tab-button-container">
                <Button className="tab-custom-button" onClick={handleCategoryClick}>Категорії</Button>
                <Button className="tab-custom-button" onClick={handleProcedureClick}>Процедури</Button>
                <Button className="tab-custom-button" onClick={handleSalonClick}>Салони</Button>
                <Button className="tab-custom-button" onClick={handleMasterClick}>Майстри</Button>
                <Button className="tab-custom-button" onClick={handleClientClick}>Клієнти</Button>
                <Button className="tab-custom-button" onClick={handleManagerClick}>Менеджери</Button> 
                <Button className="tab-custom-button" onClick={handleDiscountClick}>Знижки</Button>

            </div>

            <div className="adm-table">
                {showCategory && <AdmCategory/>}
                {showProcedure && <AdmProcedure/>}
                {showSalon && <AdmSalon/>}
                {showMaster && <AdmMaster/>}
                {showClient && <AdmClient/>}
                {showManager && <AdmManager/>}
                {showDiscount && <AdmDiscount/>}
            </div>
        </Container>
    );
};

export default Admin;
