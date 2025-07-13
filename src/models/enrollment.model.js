import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    enrollAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    }
});

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const EnrollModel = mongoose.model('enrollments', enrollmentSchema);
export default EnrollModel;