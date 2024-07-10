const express = require('express');
const controller = require('../controller/crudController');
const newsModel = require('../models/newsModel');
const router = express.Router();

router.use(
    '/news',
    (req, res, next) => {
        req.model = newsModel;
        next();
    },
    controller
);
module.exports = router;