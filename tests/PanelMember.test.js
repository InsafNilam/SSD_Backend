const { application } = require("express");
const mongoose = require("mongoose");
const supertest =  require("supertest")
const usersRoute = require("../src/Routes/users");

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

test("Get Topics", async() => {
    const topic = await usersRoute;
    await supertest(app).get("/get-topics")
    .expect(200)
    .then((response) => {
        expect(response.body[0].leaderId).toBe(topic.leaderId);
        expect(response.body[0].description).toBe(topic.description);
        expect(response.body[0].supervisorId).toBe(topic.supervisorId);
        expect(response.body[0].name).toBe(topic.name);

     })
})