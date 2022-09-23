const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/user');
const {LOGIN, REGISTER, PROFILE} = require('../utils/constants/app-constants').ROUTES.USER;
const verifyToken = require('../utils/middlewares/authJWT');

userRoutes.post(LOGIN, userCtrl.login);
userRoutes.post(REGISTER, userCtrl.register);
userRoutes.get(PROFILE, verifyToken, userCtrl.profile);

module.exports = userRoutes;