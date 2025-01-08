# SpotiFriend Frontend
This is the frontend for the SpotiFriend project. It is a React application that uses the [SpotiFriend backend](https://github.com/NamelessProj/SpotiFriend-backend).

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server or `npm run dev` to start the server in development mode

### Environment Variables
The following environment variables are required:
```env
VITE_API_URL=http://localhost:3000/api
VITE_BASE_URL=http://localhost:5173
```
The `VITE_API_URL` variable is the URL of the backend API.

The `VITE_BASE_URL` variable is the URL of the frontend application.

You have to create a `.env` file in the root of the project to set these variables.