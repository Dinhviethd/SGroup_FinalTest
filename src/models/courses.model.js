import mongoose from "mongoose";

const voteSchema= new mongoose.Schema({
    tittle:{
        type: String,
        required: true,
    },
    description: {
        type: String, 
        require: true,
    },
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
     createAt:{
        type: Date,
        default: Date.now,
    },
})

const CourseModel= mongoose.model("courses", voteSchema);
export default CourseModel;