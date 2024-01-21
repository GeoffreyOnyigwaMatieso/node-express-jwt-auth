# Full-Stack Node.js Application with Express Backend, MongoDB, and JWT Authentication
## Overview
This repository contains a full-stack Node.js application with Express.js for the backend, MongoDB as the database, and JWT (JSON Web Token) authentication. The frontend is also built using Express to serve static files.

## Features
JWT Authentication: Implements secure user authentication using JSON Web Tokens.
Express.js Backend: A robust backend framework with routing and middleware support.
MongoDB Integration: Utilizes MongoDB as the database for data storage.
Frontend with Express: Express serves static files for the frontend interface.
Modular Structure: Codebase is organized into modules for easy maintenance and scalability.
## Prerequisites
Before running the application, ensure you have the following installed:

Node.js and npm
MongoDB
Git (optional)
Getting Started
Clone the Repository:

```
git@github.com:Gmatieso/node-express-jwt-auth.git
cd node-express-jwt-auth
```
### Install Dependencies:
```
npm install
```
### Configure Environment Variables:

Create a .env file in the root directory with the following variables:

### env
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
### Configure the Database:
Create a MongoDB database and obtain the connection URI.
Update the config/db.js file with your MongoDB URI.
Run the Application:
```
nodemon start
```
The application will be accessible at http://localhost:3000.

## Project Structure
Backend (Node.js/Express)

The backend code is in the backend directory.
Entry point: backend/index.js
Frontend (Express for Static Files)

Frontend code and static files are in the frontend directory.
Entry point: frontend/index.html
Database (MongoDB)

MongoDB setup and schema are in the db directory.
API Endpoints
POST /api/register

Registers a new user.
Request Body:
json
```
{
  "username": "yourusername",
  "password": "yourpassword"
}
```
POST /api/login

Logs in an existing user and generates a JWT token.
Request Body:
json
```
{
  "username": "yourusername",
  "password": "yourpassword"
}
```
GET /api/profile

Retrieves the user's profile information.
Requires a valid JWT token.
## Contributing
Contributions are welcome! Please follow the contribution guidelines when submitting pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, please contact the project maintainer:

Name: Your Name
Email: your.email@example.com
Feel free to explore and enhance this full-stack application as per your project requirements. Happy coding!
