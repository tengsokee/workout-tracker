const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");

// User routes
router.post('/api/users', UserController.createUser);
router.post('/api/login', UserController.login);

module.exports = router;
