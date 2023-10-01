const { application } = require("express");
const mongoose = require("mongoose");
const supertest =  require("supertest")
const adminRoute = require("../src/Routes/Admin");

beforeEach((done)=>{
    mongoose.connect(
        `mongodb+srv://${process.env.REACT_APP_MONGODB_USERNAME}:${process.env.REACT_APP_MONGODB_SECRET}@cluster0.tg3da.mongodb.net/devx?retryWrites=true&w=majority`
    ).then(()=>{
        console.log("Database is Connected to the System");
        app.listen(4000,()=>{
            console.log("Listening on port 4000...");
        });
    }).catch((err)=>{
        console.log(err);
    });
    done();
})

afterEach((done) => {
    mongoose.connection.close(() => done());
})

test("GET User Details", async() => {
    const users = await adminRoute;
    await supertest(app).get("/users")
    .expect(200)
    .then((response) => {
        expect(response.body[0].username).toBe(users.username);
        expect(response.body[0].email).toBe(users.email);
        expect(response.body[0].password).toBe(users.password);
        
     })
})