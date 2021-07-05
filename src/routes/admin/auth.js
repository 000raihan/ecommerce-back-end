const express = require('express');

const router = express.Router();
const controller = require('../../controller/admin/auth');


router.post('/admin/signup', controller.singUp);
router.post('/admin/signin', controller.signin);

router.get('/admin/profile', controller.isRequired, (req, res) => {
    res.status(200).json({user: req.user})
})

module.exports = router;