import enrollmentService from '../models/enrollment.model.js';

class UserController {
    async getMyCourse(req, res) {
        try {
            const userId = req.params.id;
            const courses = await enrollmentService.getCourseByUserID(userId);
            return res.status(200).json({
                success: true,
                data: courses
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new UserController();
