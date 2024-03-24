const { Income } = require('../models/models');
const ApiError = require('../error/ApiError');

class IncomeController {
    async create(req, res, next) {
        const { client_id, salon_id, master_id, amount, date_time, description } = req.body;
        try {
            const income = await Income.create({ client_id, salon_id, master_id, amount, date_time, description });
            return res.json(income);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const incomes = await Income.findAll();
            return res.json(incomes);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const income = await Income.findByPk(id);
            if (!income) {
                return next(ApiError.notFound(`Income with id ${id} not found`));
            }
            return res.json(income);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { client_id, salon_id, master_id, amount, date_time, description } = req.body;
        try {
            let income = await Income.findByPk(id);
            if (!income) {
                return next(ApiError.notFound(`Income with id ${id} not found`));
            }
            income.client_id = client_id;
            income.salon_id = salon_id;
            income.master_id = master_id;
            income.amount = amount;
            income.date_time = date_time;
            income.description = description;
            await income.save();
            return res.json(income);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const income = await Income.findByPk(id);
            if (!income) {
                return next(ApiError.notFound(`Income with id ${id} not found`));
            }
            await income.destroy();
            return res.json({ message: 'Income deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new IncomeController();
