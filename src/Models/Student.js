const mongoose =require('mongoose');

const StudentSchema = new mongoose.Schema({
    filename:{
        type: String,
        required: true,
    },
    studentId:{
        type: String,
        required: true,
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);