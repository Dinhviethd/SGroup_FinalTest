import express from 'express';
import AuthController from '../../controllers/auth.controller.js';
import { authenticateJWT, isAdmin } from '../../middleware/authenticateJWT.js';
import { validateRegister, validateLogin} from '../../middleware/user.validate.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

// Admin routes
router.get('/', authenticateJWT, isAdmin, UserController.getAllUsers);
router.get('/:id', authenticateJWT, isAdmin, UserController.getUserById);
router.delete('/:id', authenticateJWT, isAdmin, UserController.deleteUser);

export default router;
