const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/user');
const {LOGIN, REGISTER} = require('../utils/constants/app-constants').ROUTES.USER;

userRoutes.post(LOGIN, userCtrl.login);
userRoutes.post(REGISTER, userCtrl.register);

module.exports = userRoutes;