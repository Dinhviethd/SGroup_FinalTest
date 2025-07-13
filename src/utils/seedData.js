import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserModel from '../models/users.model.js';
import CourseModel from '../models/courses.model.js';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create sample users
        const users = await createUsers();
        console.log('Users created successfully');

        // Create sample courses
        await createCourses(users);
        console.log('Courses created successfully');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

const createUsers = async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const sampleUsers = [
        {
            
            name: 'John Doe',
            email: 'john@example.com',
            passwordHash: hashedPassword,
            role: 'user'
        },
        {name: 'Admin User',
            email: 'admin@example.com',
            passwordHash: adminPassword,
            role: 'admin'
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            passwordHash: hashedPassword,
            role: 'user'
        },
        {
            name: 'Teacher Bob',
            email: 'bob@example.com',
            passwordHash: hashedPassword,
            role: 'user'
        }
    ];

    // Clear existing users except admin
    await UserModel.deleteMany({ role: 'user' });
    
    // Insert new users
    const createdUsers = await UserModel.create(sampleUsers);
    return createdUsers;
};

const createCourses = async (users) => {
    const sampleCourses = [
        {
            tittle: 'JavaScript Fundamentals',
            description: 'Learn the basics of JavaScript programming',
            createdBy: users[0]._id,
            createAt: new Date()
        },
        {
            tittle: 'NodeJS Advanced',
            description: 'Advanced NodeJS concepts and practices',
            createdBy: users[1]._id,
            createAt: new Date()
        },
        {
            tittle: 'MongoDB Masterclass',
            description: 'Master MongoDB database design and queries',
            createdBy: users[2]._id,
            createAt: new Date()
        },
        {
            tittle: 'Express Framework',
            description: 'Building web applications with Express',
            createdBy: users[0]._id,
            createAt: new Date()
        },
        {
            tittle: 'React Basics',
            description: 'Introduction to React development',
            createdBy: users[1]._id,
            createAt: new Date()
        }
    ];

    // Clear existing courses
    await CourseModel.deleteMany({});
    
    // Insert new courses
    await CourseModel.create(sampleCourses);
};

// Run seeding
seedData();