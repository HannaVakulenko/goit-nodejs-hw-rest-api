const express = require('express');

const authController = require("../../controllers/auth-controller");

const schemas = require("../../schemas");

const { validateBody } = require("../../decorators");

const { authenticate } = require("../../middlewares");

const router = express.Router();

// register - http://localhost:3000/api/users/register
router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);

// login - http://localhost:3000/api/users/login
router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

// current - http://localhost:3000/api/users/current
router.get("/current", authenticate, authController.getCurrent);

// logout - http://localhost:3000/api/users/logout
router.post("/logout", authenticate, authController.logout);

// PATCH /api/users
router.patch("/", authenticate, validateBody(schemas.updateUserSubscriptionSchema), authController.updateUserSubscription);

module.exports = router;