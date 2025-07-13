import express from 'express';
import { authenticateJWT, isAdmin } from '../../middleware/authenticateJWT.js';
import CourseController from '../../controllers/course.controller.js';

const router = express.Router();

// Public routes
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getCourseById);

// Admin 
router.post('/', authenticateJWT, isAdmin, CourseController.createCourse);
router.patch('/:id', authenticateJWT, isAdmin, CourseController.updateCourse);
router.delete('/:id', authenticateJWT, isAdmin, CourseController.deleteCourse);

//All users
router.get('/:id/enroll', CourseController.enrollCourse);

export default router;