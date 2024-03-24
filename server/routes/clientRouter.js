const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', clientController.create)
router.put('/:id', clientController.update)
router.delete('/:id', clientController.delete)
router.get('/', clientController.getAll)

module.exports = router
