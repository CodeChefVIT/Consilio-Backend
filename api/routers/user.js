const router=require('express').Router()

const user = require('../controllers/team');
const checkAuth = require('../middlewares/checkAuth')

router.patch('/edit', checkAuth, user.make)

module.exports = router;