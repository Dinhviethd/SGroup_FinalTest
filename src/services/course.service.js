import Course from '../models/courses.model.js';
import mongoose from 'mongoose';
import User from '../models/users.model.js';
class CourseService {
    constructor() {
    this.course = Course;
  }

    async getAllCourse() {
    try {
      return await this.course.find({});
    } catch (error) {
      throw new Error("Error retrieving users: " + error.message);
    }
  }

    async getCourseById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    try {
      return await this.course.findById(id);
    } catch (error) {
      throw new Error("Error retrieving user: " + error.message);
    }
  }   

    async createCourse(courseData, userId) {
    try {
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID');
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            throw new Error('User not found');
        }
        const { title, description } = courseData;
        if (!title || !description) {
            throw new Error('Title and description are required');
        }
        const newCourse = await this.course.create({
            title,
            description,
            createdBy: userId,
            createAt: new Date()
        });
        return await this.course.findById(newCourse._id)
            .populate('createdBy', 'username email');
        
    } catch (error) {
        throw new Error('Error creating course: ' + error.message);
    }
}
    async updateCourse(id, updateData) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid course ID');
        }
        const existingCourse = await this.course.findById(id);
        if (!existingCourse) {
            throw new Error('Course not found');
        }
        const updateObject = {
            ...updateData,
            updatedAt: new Date()
        };
        const updatedCourse = await this.course.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { 
                new: true,
            }
        ).populate('createdBy', 'username email');

        return updatedCourse;

    } catch (error) {
        throw new Error('Error updating course: ' + error.message);
    }
}
    async deleteCourse(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid course ID');
            }

            const course = await this.course.findById(id);
            if (!course) {
                throw new Error('Course not found');
            }

            return true;
        } catch (error) {
            throw new Error('Error deleting course: ' + error.message);
        }
    }
    async enrollCourse(userId, courseId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
                throw new Error('Invalid user or course ID');
            }
            const course = await this.course.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            const enrollment = await enrollmentModel.create({
                user: userId,
                course: courseId,
                status: 'active'
            });
            return enrollment;
        } catch (error) {
            throw new Error('Error enrolling in course: ' + error.message);
        }
    }
}
export default new CourseService();