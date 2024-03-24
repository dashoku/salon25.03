const { Discount } = require('../models/models');
const ApiError = require('../error/ApiError');

class DiscountController {
    async create(req, res, next) {
        const { description, percentage, start_date, end_date } = req.body;
        try {
            const discount = await Discount.create({ description, percentage, start_date, end_date });
            return res.json(discount);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const discounts = await Discount.findAll();
            return res.json(discounts);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const discount = await Discount.findByPk(id);
            if (!discount) {
                return next(ApiError.notFound(`Discount with id ${id} not found`));
            }
            return res.json(discount);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { description, percentage, start_date, end_date } = req.body;
        try {
            const discount = await Discount.findByPk(id);
            if (!discount) {
                return next(ApiError.notFound(`Discount with id ${id} not found`));
            }
            discount.description = description;
            discount.percentage = percentage;
            discount.start_date = start_date;
            discount.end_date = end_date;
            await discount.save();
            return res.json(discount);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const discount = await Discount.findByPk(id);
            if (!discount) {
                return next(ApiError.notFound(`Discount with id ${id} not found`));
            }
            await discount.destroy();
            return res.json({ message: 'Discount deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new DiscountController();
