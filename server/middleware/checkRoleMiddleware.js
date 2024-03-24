const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const userController = require('./../controllers/userController');

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(401).json({ message: "Не авторизован" });
            }

            const token = authorizationHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role !== role) {
                return res.status(403).json({ message: "Нет доступа" });
            }

            req.user = decoded;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Срок действия токена истек" });
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: "Некорректный токен" });
            } else {
                res.status(401).json({ message: "Не авторизован" });
            }
        }
    };
};


const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            // Получаем информацию о роли из JWT-токена
            const userRoles = req.user.roles; // Предполагается, что информация о роли пользователя хранится в req.user

            // Проверяем, имеет ли пользователь доступ к маршруту
            const hasAccess = roles.some(role => userRoles.includes(role));
            if (!hasAccess) {
                return res.status(403).json({ message: "Нет доступа" });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Не авторизован" });
        }
    };
};

// Пример защищенного маршрута, требующего проверки роли
router.get('/profile', authMiddleware, checkRole(['CLIENT', 'MASTER', 'MANAGER']), userController.getProfile);



