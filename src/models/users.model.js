import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
})

const UserModel = mongoose.model('users', userSchema); 
export default UserModel;