const Router = require('express')
const router = new Router()
const procedureController = require('../controllers/procedureController')

router.post('/', procedureController.create)
router.put('/:id', procedureController.update)
router.delete('/:id', procedureController.delete)
router.get('/', procedureController.getAll)
router.get('/procedurelist', procedureController.getAll)
router.get('/procedurelist/:id', procedureController.getById)

module.exports = router
