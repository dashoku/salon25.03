const { WorkingHours } = require('../models/models');
const ApiError = require('../error/ApiError');

class WorkingHoursController {
    async create(req, res, next) {
        const { master_id, day_of_week, start_time, end_time } = req.body;
        try {
            const workingHours = await WorkingHours.create({ master_id, day_of_week, start_time, end_time });
            return res.json(workingHours);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const workingHours = await WorkingHours.findAll();
            return res.json(workingHours);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const workingHours = await WorkingHours.findByPk(id);
            if (!workingHours) {
                return next(ApiError.notFound(`Working hours with id ${id} not found`));
            }
            return res.json(workingHours);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { master_id, day_of_week, start_time, end_time } = req.body;
        try {
            let workingHours = await WorkingHours.findByPk(id);
            if (!workingHours) {
                return next(ApiError.notFound(`Working hours with id ${id} not found`));
            }
            workingHours.master_id = master_id;
            workingHours.day_of_week = day_of_week;
            workingHours.start_time = start_time;
            workingHours.end_time = end_time;
            await workingHours.save();
            return res.json(workingHours);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const workingHours = await WorkingHours.findByPk(id);
            if (!workingHours) {
                return next(ApiError.notFound(`Working hours with id ${id} not found`));
            }
            await workingHours.destroy();
            return res.json({ message: 'Working hours deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new WorkingHoursController();
