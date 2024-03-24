const { Procedure } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path'); // Add this import
const uuid = require('uuid'); // Add this import

class ProcedureController {
    async create(req, res, next) {
        const { name, description, price, category_id } = req.body;
        const img = req.files ? req.files.img : null; // Extract uploaded image
        
        try {
            if (!img) {
                return res.status(400).json({ message: "Image file is required" });
            }
            
            const fileName = uuid.v4() + path.extname(img.name);
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const procedure = await Procedure.create({ name, description, price, category_id, img: fileName });
            return res.json(procedure);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const procedures = await Procedure.findAll();
            return res.json(procedures);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const procedure = await Procedure.findByPk(id);
            if (!procedure) {
                return next(ApiError.notFound(`Procedure with id ${id} not found`));
            }
            return res.json(procedure);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;
        try {
            let procedure = await Procedure.findByPk(id);
            if (!procedure) {
                return next(ApiError.notFound(`Procedure with id ${id} not found`));
            }
            procedure.name = name;
            procedure.description = description;
            procedure.price = price;
            procedure.category_id = category_id;
            await procedure.save();
            return res.json(procedure);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const procedure = await Procedure.findByPk(id);
            if (!procedure) {
                return next(ApiError.notFound(`Procedure with id ${id} not found`));
            }
            await procedure.destroy();
            return res.json({ message: 'Procedure deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const procedure = await Procedure.findOne(
            {
                where: { id },
            },
        )
        return res.json(procedure)
    }
}

module.exports = new ProcedureController();
