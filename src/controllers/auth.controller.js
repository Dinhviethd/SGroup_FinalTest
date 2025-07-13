import AuthService from '../services/auth.service.js';

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await AuthService.Register(username, email, password);
            
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const tokens = await AuthService.Login(email, password);
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: tokens
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new AuthController();