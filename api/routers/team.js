const router=require('express').Router()

const team = require('../controllers/team');
const checkAuth = require('../middlewares/checkAuth')

router.post('/make',checkAuth,team.make)

router.post('/leave',checkAuth,team.leave)

router.post('/join',checkAuth,team.join)

router.get('/all',team.displayAll)

router.get('/one',team.displayOne)
module.exports = router;