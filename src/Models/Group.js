const mongoose =require('mongoose');

//supervisor & panel schema
const GroupSchema = new mongoose.Schema({
    
    leaderId:{
        type:String,
        required:true
    },

    supervisorId:{
        type:String,
    },

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    members:{
        type:Array,
        required:true
    },

    isApprove:{
        type: String,
    },

    panelId:{
        type: String,
    },

    register_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Group = mongoose.model('groups',GroupSchema);