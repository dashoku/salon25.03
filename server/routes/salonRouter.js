const Router = require('express')
const router = new Router()
const salonController = require('../controllers/salonController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', salonController.create)
router.put('/:id', salonController.update)
router.delete('/:id', salonController.delete)
router.get('/', salonController.getAll)
router.get('/slonlist', salonController.getAll)
router.get('/slonlist/:id', salonController.getById)

module.exports = router
