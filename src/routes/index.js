import express from 'express'
import courseRoute from './apis/course.route.js'
import authRoute from './apis/auth.route.js'
import userRoute from './apis/user.route.js'
const router= express.Router();

router.use('/course', courseRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;