const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UserController {

    async registration(req, res, next) {
        const { email, password, name, surname, phone } = req.body;

        if (!email || !password || !name || !surname || !phone) {
            return next(ApiError.badRequest('Все поля должны быть заполнены'));
        }

        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            role: 'CLIENT',
            password: hashPassword,
            name,
            surname,
            phone
        });

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token, user });
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.internal('Користувача з таким email не знайдено'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.internal('Невірний пароль'));
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            // Возвращаем не только токен, но и данные пользователя
            return res.json({ token, user: req.user });
        } catch (error) {
            next(error);
        }
    }
    async getProfile(req, res, next) {
        try {
            const { id, email, role} = req.user;
            let profileData;

            if (isAuth) {
                // Fetch user data from the database based on user ID
                const user = await User.findByPk(id);
                if (!user) {
                    return next(ApiError.notFound('User not found'));
                }
                profileData = {
                    id: user.id,
                    email: user.email,
                    role,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                };
            } else if (role === 'MANAGER') {
                profileData = {
                    id,
                    email,
                    role,
                    // Additional data for manager profile if needed
                };
            }

            return res.json(profileData);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserController();
