const Router = require('express')
const router = new Router()
const masterController = require('../controllers/masterController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', masterController.create)
router.put('/:id', masterController.update)
router.delete('/:id', masterController.delete)
router.get('/', masterController.getAll)

module.exports = router