const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');
const path = require('path'); // Add this import
const uuid = require('uuid'); // Add this import

class CategoryController {
    async create(req, res, next) {
        try {
            const { name, description } = req.body;
            const img = req.files ? req.files.img : null; 

            if (!img) {
                return res.status(400).json({ message: "Image file is required" });
            }

            const fileName = uuid.v4() + path.extname(img.name);
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const category = await Category.create({ name, description, img: fileName });
            return res.json(category);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }


    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return next(ApiError.notFound(`Категорія з ідентифікатором ${id} не знайдена`));
            }
            return res.json(category);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: `Категорія з ідентифікатором ${id} не знайдена` });
            }
            category.name = name;
            category.description = description;
            await category.save();
            return res.json(category);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: `Категорія з ідентифікатором ${id} не знайдена` });
            }
            await category.destroy();
            return res.json({ message: 'Категорія успішно видалена' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

}

module.exports = new CategoryController();
