import express from 'express'
const router= express.Router();
import userController from '../controllers/userController.js'
import { isLoggedIn } from '../utils/middlewares.js';

router.route('/').get(userController.home)
router.route('/register').post(userController.register);
router.route('/login').post(userController.login)
router.route("/logout").get(isLoggedIn, userController.logout)

router.get("/session", isLoggedIn, userController.getSession)

export default router;
