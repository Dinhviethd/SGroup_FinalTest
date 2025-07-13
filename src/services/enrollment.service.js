import EnrollModel from '../models/enrollment.model';
import mongoose from 'mongoose';

class EnrollmentService {
    constructor() {
        this.enrollModel = EnrollModel;
    }

    async getCourseByUserID(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('Invalid user ID');
            }

            const enrollments = await this.enrollModel.find({ 
                user: userId,
                status: 'active' 
            })
            .populate({
                path: 'course',
                select: 'tittle description createdBy createAt' 
            }); 

            if (!enrollments) {
                return [];
            }

            return enrollments;

        } catch (error) {
            throw new Error('Error getting user courses: ' + error.message);
        }
    }
}

export default new EnrollmentService();