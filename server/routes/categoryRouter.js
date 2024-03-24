const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)
router.get('/', categoryController.getAll)
router.get('/categorylist', categoryController.getAll)
router.get('/categorylist/:id', categoryController.getById)
module.exports = router
