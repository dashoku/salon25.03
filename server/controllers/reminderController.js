const { Reminder } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReminderController {
    async create(req, res, next) {
        const { client_id, description, date_time, master_id } = req.body;
        try {
            const reminder = await Reminder.create({ client_id, description, date_time, master_id });
            return res.json(reminder);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const reminders = await Reminder.findAll();
            return res.json(reminders);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const reminder = await Reminder.findByPk(id);
            if (!reminder) {
                return next(ApiError.notFound(`Reminder with id ${id} not found`));
            }
            return res.json(reminder);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { client_id, description, date_time, master_id } = req.body;
        try {
            const reminder = await Reminder.findByPk(id);
            if (!reminder) {
                return next(ApiError.notFound(`Reminder with id ${id} not found`));
            }
            reminder.client_id = client_id;
            reminder.description = description;
            reminder.date_time = date_time;
            reminder.master_id = master_id;
            await reminder.save();
            return res.json(reminder);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const reminder = await Reminder.findByPk(id);
            if (!reminder) {
                return next(ApiError.notFound(`Reminder with id ${id} not found`));
            }
            await reminder.destroy();
            return res.json({ message: 'Reminder deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new ReminderController();
