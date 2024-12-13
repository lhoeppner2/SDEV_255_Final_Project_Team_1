const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    courseId: { 
        type: String, 
        required: true, 
        unique: true, // Ensures courseCode is unique across all courses
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    credits: { type: Number, required: true },
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Reference to the User model
    }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;