const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Demonstration
        // const conn = await mongoose.connect('mongodb://127.0.0.1:27017/devx', {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        // })
        const conn = await mongoose.connect(`mongodb+srv://${process.env.REACT_APP_MONGODB_USERNAME}:${process.env.REACT_APP_MONGODB_SECRET}@cluster0.tg3da.mongodb.net/devx?retryWrites=true&w=majority`, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
    }
};

module.exports=connectDB;