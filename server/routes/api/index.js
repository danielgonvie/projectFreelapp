const router = require('express').Router();

router.use('/auth', require('./auth.routes'))
router.use('/artists', require('./artist.routes'))


module.exports = router;