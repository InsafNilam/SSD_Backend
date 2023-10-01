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

test("Get Group Details ", async() => {
    const group = await usersRoute;
    await supertest(app).get("/group")
    .expect(200)
    .then((response) => {
        expect(response.body[0].leaderId).toBe(group.leaderId);
		expect(response.body[0].supervisorId).toBe(group.supervisorId);
        expect(response.body[0].name).toBe(group.name);
		expect(response.body[0].description).toBe(group.description);
		expect(response.body[0].members).toBe(group.members);
     })
})