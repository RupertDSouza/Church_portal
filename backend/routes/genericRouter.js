const express = require("express");
const initializeRepo = require("../middleware/repoMiddleware");
const crudRouter = require("./crudRouter");

/**
 * Creates a standard CRUD router for a given path, model, and access roles.
 * @param {string} path - The URL path segment (e.g. "ward", "news")
 * @param {object} model - The Mongoose/Sequelize model to attach to req.model
 * @param {string|string[]} access - Role(s) allowed to access this route
 */
function createRouter(path, model, access) {
    const router = express.Router();
    router.use(
        `/${path}`,
        (req, res, next) => {
            req.access = access;
            req.model = model;
            next();
        },
        initializeRepo,
        crudRouter
    );
    return router;
}

module.exports = createRouter;
