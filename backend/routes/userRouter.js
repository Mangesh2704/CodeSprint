import express from 'express'
const router= express.Router();
import userController from '../controllers/userController.js'

router.route('/').get(userController.home)
router.route('/register').post(userController.register);
router.route('/login').post(userController.login)

export default router;
