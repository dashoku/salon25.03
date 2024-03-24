const { Expense } = require('../models/models');
const ApiError = require('../error/ApiError');

class ExpenseController {
    async create(req, res, next) {
        const { client_id, salon_id, master_id, amount, date_time, description } = req.body;
        try {
            const expense = await Expense.create({ client_id, salon_id, master_id, amount, date_time, description });
            return res.json(expense);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const expenses = await Expense.findAll();
            return res.json(expenses);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const expense = await Expense.findByPk(id);
            if (!expense) {
                return next(ApiError.notFound(`Expense with id ${id} not found`));
            }
            return res.json(expense);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { client_id, salon_id, master_id, amount, date_time, description } = req.body;
        try {
            const expense = await Expense.findByPk(id);
            if (!expense) {
                return next(ApiError.notFound(`Expense with id ${id} not found`));
            }
            expense.client_id = client_id;
            expense.salon_id = salon_id;
            expense.master_id = master_id;
            expense.amount = amount;
            expense.date_time = date_time;
            expense.description = description;
            await expense.save();
            return res.json(expense);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const expense = await Expense.findByPk(id);
            if (!expense) {
                return next(ApiError.notFound(`Expense with id ${id} not found`));
            }
            await expense.destroy();
            return res.json({ message: 'Expense deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new ExpenseController();
