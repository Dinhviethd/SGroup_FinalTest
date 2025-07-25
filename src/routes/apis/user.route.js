import express from 'express';
import UserController from '../../controllers/user.controller.js';

const router = express.Router();

router.get('/:id/enrollments', UserController.getMyCourse);


export default router;