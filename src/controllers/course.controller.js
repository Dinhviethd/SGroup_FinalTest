import courseService from '../services/enrollment.service.js';

class CourseController {
    async getAllCourse(req, res) {
        try {
            const polls = await courseService.getAllCourse();
            return res.status(200).json({
                success: true,
                data: polls
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCourseById(req, res) {
        try {
            const poll = await courseService.getCourseById(req.params.id);
            if (!poll) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: poll
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createCourse(req, res) {
        try {
            const courseData = {
                ...req.body,
                creator: req.user._id
            };
            const course = await courseService.createCourse(courseData, req.user._id);

            return res.status(201).json({
                success: true,
                message: 'Course created successfully',
                data: course
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCourse(req, res) {
        try {
            const course = await courseService.updateCourse(req.params.id, req.body);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                data: course
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteCourse(req, res) {
        try {
            const result = await courseService.deleteCourse(req.params.id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Course deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async enrollCourse(req, res) {
        try {
            const enrollment = await courseService.enrollCourse(req.user._id, req.params.id);
            return res.status(201).json({
                success: true,
                message: 'Enrolled in course successfully',
                data: enrollment
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new CourseController();