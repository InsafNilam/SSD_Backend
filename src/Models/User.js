const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
    },
    register_date:{
        type: Date,
        default: Date.now
    },
    leaderId:{
        type:String
    },
    fullname:{
        type: String,
    },
    gender:{
        type: String,
    },
    dob:{
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    department: {
        type: String,
    },
    faculty: {
        type: String,
    },  
    interestField:{
        type:String
    }
});

module.exports = User = mongoose.model('users', UserSchema);