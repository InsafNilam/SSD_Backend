const mongoose =require('mongoose');

const TopicSchema = new mongoose.Schema({
    leaderId:{
        type:String,
        required:true
    },
    supervisorId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isApprove:{
        type: String,
    },
    isEvaluate:{
        type: Boolean,
        default: false
    },
    upload_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Topic = mongoose.model('topics',TopicSchema);