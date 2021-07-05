const express = require('express');

const router = express.Router();
const controller = require('../controller/auth');


router.post('/signup', controller.singUp);
router.post('/signin', controller.signin);

module.exports = router;