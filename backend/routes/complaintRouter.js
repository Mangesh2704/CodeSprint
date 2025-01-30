import express from 'express'
const router= express.Router();
import complaintController from '../controllers/complaintController.js'

router.route('/add').post(complaintController.createComplaint);


export default router;
