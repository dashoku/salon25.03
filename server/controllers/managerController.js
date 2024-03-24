const { Manager } = require('../models/models');
const ApiError = require('../error/ApiError');

class ManagerController {
    async create(req, res, next) {
        const { name, password, phone, age, email, surname } = req.body;
        try {
            const manager = await Manager.create({ name, password, phone, age, email, surname });
            return res.json(manager);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const managers = await Manager.findAll();
            return res.json(managers);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const manager = await Manager.findByPk(id);
            if (!manager) {
                return next(ApiError.notFound(`Manager with id ${id} not found`));
            }
            return res.json(manager);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, password, phone, age, email, surname } = req.body;
        try {
            const manager = await Manager.findByPk(id);
            if (!manager) {
                return next(ApiError.notFound(`Manager with id ${id} not found`));
            }
            manager.name = name;
            manager.password = password;
            manager.phone = phone;
            manager.age = age;
            manager.email = email;
            manager.surname = surname;
            await manager.save();
            return res.json(manager);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const manager = await Manager.findByPk(id);
            if (!manager) {
                return next(ApiError.notFound(`Manager with id ${id} not found`));
            }
            await manager.destroy();
            return res.json({ message: 'Manager deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new ManagerController();
