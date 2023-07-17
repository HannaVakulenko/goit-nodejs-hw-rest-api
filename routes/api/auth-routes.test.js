// unit tests for the login controller Using Jest

// 1. the response must have a status code of 200
// 2. the response must return a token
// 3. the user object with 2 fields email and subscription with the String data type should be returned in the response

const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login route", () => {
    let server = null;
    
    beforeAll(async() => {
        
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    });

    afterAll(async() => {
        
        server.close();
        await mongoose.connection.close();
    });
  
    test("test correct login data", async() => {
        const loginData = {
            email: "hanna5@gmail.com",
            password: "qwertonyty"
        }
        const subscription = "pro";
        // mock request
        const { body, statusCode } = await request(app).post("/api/users/login").send(loginData); // { body, statusCode } destructuring response

        expect(statusCode).toBe(200); // the response must have a status code of 200
        expect(body.user.email).toBe(loginData.email);
        expect(body.user.subscription).toBe(subscription);

        const user = await User.findOne({email: loginData.email});
        expect(user.email).toBe(loginData.email);
        expect(user.subscription).toBe(subscription);
    
    });
});