const express = require('express');
const controller = require('../controller/crudController');
const contactModel = require('../models/contactModel');
const router = express.Router();

router.use(
    '/contact',
    (req, res, next) => {
        req.model = contactModel;
        next();
    },
    controller
);
module.exports = router;