const express = require('express');

const router = express.Router();
const controller = require('../controller/user');


router.post('/signup', controller.singUp);

module.exports = router;