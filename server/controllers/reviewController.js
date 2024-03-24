const { Review } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReviewController {
    async create(req, res, next) {
        const { client_id, salon_id, master_id, rating, date_time, feedback } = req.body;
        try {
            const review = await Review.create({ client_id, salon_id, master_id, rating, date_time, feedback });
            return res.json(review);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const reviews = await Review.findAll();
            return res.json(reviews);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const review = await Review.findByPk(id);
            if (!review) {
                return next(ApiError.notFound(`Review with id ${id} not found`));
            }
            return res.json(review);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { client_id, salon_id, master_id, rating, date_time, feedback } = req.body;
        try {
            const review = await Review.findByPk(id);
            if (!review) {
                return next(ApiError.notFound(`Review with id ${id} not found`));
            }
            review.client_id = client_id;
            review.salon_id = salon_id;
            review.master_id = master_id;
            review.rating = rating;
            review.date_time = date_time;
            review.feedback = feedback;
            await review.save();
            return res.json(review);
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const review = await Review.findByPk(id);
            if (!review) {
                return next(ApiError.notFound(`Review with id ${id} not found`));
            }
            await review.destroy();
            return res.json({ message: 'Review deleted successfully' });
        } catch (err) {
            return next(ApiError.internalServerError(err.message));
        }
    }
}

module.exports = new ReviewController();
