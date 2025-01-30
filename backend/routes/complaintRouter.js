import express from 'express'
const router= express.Router();
import complaintController from '../controllers/complaintController.js'

router.route('/add').post(complaintController.createComplaint);
router.route('/getAllComplaints').get(complaintController.getAllComplaints);
router.route('/getAllComplaints/:userId').get(complaintController.getComplaintsByUserId);
router.route('/updateComplaint/:complaintId').put(complaintController.updateComplaintStatus);
router.route('/deleteComplaint/:complaintId').delete(complaintController.deleteComplaint);

export default router;
