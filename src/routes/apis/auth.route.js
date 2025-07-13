import express from 'express';
import AuthController from '../../controllers/auth.controller.js';
import { authenticateJWT, isAdmin } from '../../middleware/authenticateJWT.js';
import { validateRegister, validateLogin} from '../../middleware/user.validate.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

export default router;
