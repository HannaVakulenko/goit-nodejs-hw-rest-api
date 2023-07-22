## GoIT Node.js Course Homework - hw02-express
### Tasks:
01. Wrote REST API for working with contact collection. To work with the REST API was used [Postman] (https://www.getpostman.com/).

02. An account has been created for MongoDB Atlas and db-contacts, and it contains a contacts collection.
The Mongoose npm package was used to create a connection to MongoDB.
In the query processing functions, the code for CRUD operations on contacts from a file (hw02-express branch) has been replaced with Mongoose methods for working with a collection of contacts in the MongoDB database (branch 03-mongodb).

03. Added user authentication / authorization logic via JWT (branch 04-auth).

04. Added the ability to download a user's avatar through [Multer] and a written integration test for the login controller - login (branch hw05-avatars)

05. Added user email verification after registration using the nodemailer package (branch hw06-email)

### Commands npm:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; server start in develop mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
