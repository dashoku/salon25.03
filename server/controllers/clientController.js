const { Client } = require('../models/models');
const ApiError = require('../error/ApiError');

class ClientController {
    async create(req, res, next) {
        const { name, surname, email, age, phone, password } = req.body;
        try {
            const client = await Client.create({ name, surname, email, age, phone, password });
            return res.json(client);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const clients = await Client.findAll();
            return res.json(clients);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                return next(ApiError.notFound(`Client with id ${id} not found`));
            }
            return res.json(client);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, surname, email, age, phone, password } = req.body;
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                return next(ApiError.notFound(`Client with id ${id} not found`));
            }
            client.name = name;
            client.surname = surname;
            client.email = email;
            client.age = age;
            client.phone = phone;
            client.password = password;
            await client.save();
            return res.json(client);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const client = await Client.findByPk(id);
            if (!client) {
                return next(ApiError.notFound(`Client with id ${id} not found`));
            }
            await client.destroy();
            return res.json({ message: 'Client deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new ClientController();
