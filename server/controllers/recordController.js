const { Record} = require('../models/models');
const ApiError = require('../error/ApiError');

class RecordController {
    async create(req, res, next) {
        const { client_id, salon_id, master_id, procedure_id, date_time, status, payment } = req.body;
        try {
            const record = await Record.create({ client_id, salon_id, master_id, procedure_id, date_time, status, payment });
            return res.json(record);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const records = await Record.findAll();
            return res.json(records);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const record = await Record.findByPk(id);
            if (!record) {
                return next(ApiError.notFound(`Record with id ${id} not found`));
            }
            return res.json(record);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { client_id, salon_id, master_id, procedure_id, date_time, status, payment } = req.body;
        try {
            const record = await Record.findByPk(id);
            if (!record) {
                return next(ApiError.notFound(`Record with id ${id} not found`));
            }
            record.client_id = client_id;
            record.salon_id = salon_id;
            record.master_id = master_id;
            record.procedure_id = procedure_id;
            record.date_time = date_time;
            record.status = status;
            record.payment = payment;
            await record.save();
            return res.json(record);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const record = await Record.findByPk(id);
            if (!record) {
                return next(ApiError.notFound(`Record with id ${id} not found`));
            }
            await record.destroy();
            return res.json({ message: 'Record deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new RecordController();
