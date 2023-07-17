// unit tests for the login controller using Jest

const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

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

    beforeEach( async () => {
        await User.deleteMany();
        await request(app).post('/api/users/register')
        .send({
        name: 'Login',
        email:"login@test.com",
        password:"qwertonity"
        })
    })


    test('should login existing user', async () => {
        const loginData = {
            email: "login@test.com",
            password: "qwertonity"
        }
        
        const subscription = "starter";

        const { body, statusCode } = await request(app)
        .post('/api/users/login')
        .send(loginData);

        console.log(body);
    // 1. the response must have a status code of 200
        expect(statusCode).toBe(200);

    // 2. the response must return a token 
        const user = await User.findOne({email: loginData.email});
        console.log(user);
        expect(body.token).toBe(user.token);

        expect(user.email).toBe(loginData.email);
        expect(user.subscription).toBe(subscription);

    // 3. the user object with 2 fields email and subscription with the String data type should be returned in the response
        expect(body.user.email).toBe(loginData.email);
        expect(body.user.subscription).toBe(subscription);

        expect(typeof body.user.email && typeof body.user.subscription).toBe("string");
    })
  
});