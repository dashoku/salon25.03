const { Master, Salon, Procedure } = require('../models/models');
const ApiError = require('../error/ApiError');

class MasterController {
    async create(req, res, next) {
        const { name, password, phone, age, email, surname, salonId, procedureIds } = req.body;
        try {
            const master = await Master.create({ name, password, phone, age, email, surname, salonId });

            if (procedureIds && procedureIds.length > 0) {
                await master.addProcedures(procedureIds);
            }

            return res.json(master);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
    

    async getAll(req, res, next) {
        try {
            const masters = await Master.findAll();
            return res.json(masters);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const master = await Master.findByPk(id, { include: Salon });
            if (!master) {
                return next(ApiError.notFound(`Master with id ${id} not found`));
            }
            return res.json(master);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, password, phone, age, email, surname, salonId, procedureIds } = req.body;
        try {
            let master = await Master.findByPk(id);
            if (!master) {
                return next(ApiError.notFound(`Master with id ${id} not found`));
            }
            
            // Update master details
            master.name = name;
            master.password = password;
            master.phone = phone;
            master.age = age;
            master.email = email;
            master.surname = surname;
            master.salonId = salonId;

            await master.save();

            // Update associated procedures
            if (procedureIds && procedureIds.length > 0) {
                await master.setProcedures(procedureIds); // Set procedures for the master
            }

            return res.json(master);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const master = await Master.findByPk(id);
            if (!master) {
                return next(ApiError.notFound(`Master with id ${id} not found`));
            }
            await master.destroy();
            return res.json({ message: 'Master deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new MasterController();
