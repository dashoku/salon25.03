const { Salon } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

class SalonController {
    async create(req, res, next) {
        try {
            const { name, address, description } = req.body;
            const img = req.files ? req.files.img : null; 

            if (!img) {
                return res.status(400).json({ message: "Image file is required" });
            }

            const fileName = uuid.v4() + path.extname(img.name);
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const salon = await Salon.create({ name, address, description, img: fileName });
            return res.json(salon);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const salons = await Salon.findAll();
            return res.json(salons);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const salon = await Salon.findByPk(id);
            if (!salon) {
                return next(ApiError.notFound(`Salon with id ${id} not found`));
            }
            return res.json(salon);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, address, description } = req.body;
        try {
            const salon = await Salon.findByPk(id);
            if (!salon) {
                return next(ApiError.notFound(`Salon with id ${id} not found`));
            }

            const img = req.files ? req.files.img : null; 
            if (img) {
                const fileName = uuid.v4() + path.extname(img.name);
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                salon.img = fileName;
            }

            salon.name = name;
            salon.address = address;
            salon.description = description;
            await salon.save();
            return res.json(salon);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const salon = await Salon.findByPk(id);
            if (!salon) {
                return next(ApiError.notFound(`Salon with id ${id} not found`));
            }
            await salon.destroy();
            return res.json({ message: 'Salon deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new SalonController();
