const Router = require('express')
const router = new Router()
const procedureRouter = require('./procedureRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const salonRouter = require('./salonRouter')
const masterRouter = require('./masterRouter')
const clientRouter = require('./clientRouter')
const managerRouter = require('./managerRouter')
const discountRouter = require('./discountRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)

router.use('/procedure', procedureRouter)
router.use('/salon', salonRouter)
router.use('/master', masterRouter)
router.use('/client', clientRouter)
router.use('/manager', managerRouter)
router.use('/discount', discountRouter)

module.exports = router
