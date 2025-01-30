import express from 'express'
const router= express.Router();
import authController from '../controllers/authControllers.js'

router.route('/').get(authController.home)
router.route('/register').get(authController.register);
router.route('/login').get(authController.login)

export default router;
