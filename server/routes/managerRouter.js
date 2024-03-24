const Router = require('express')
const router = new Router()
const managerController = require('../controllers/managerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', managerController.create)
router.put('/:id', managerController.update)
router.delete('/:id', managerController.delete)
router.get('/', managerController.getAll)

module.exports = router