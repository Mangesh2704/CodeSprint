import express from 'express'
const router= express.Router();
import complaintController from '../controllers/complaintController'

router.route('/').get(complaintController.createComplaint);


export default router;
