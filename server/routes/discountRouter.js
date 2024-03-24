const Router = require('express')
const router = new Router()
const discountRouter = require('../controllers/discountController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', discountRouter.create)
router.put('/:id', discountRouter.update)
router.delete('/:id', discountRouter.delete)
router.get('/', discountRouter.getAll)

module.exports = router
