import express from 'express'; //import express module to create an express application
import dotenv from 'dotenv'; //import dotenv module to load environment variables from a .env file
import cors from 'cors'; //import cors module to handle Cross-Origin Resource Sharing issues
import {testDBConnection} from './src/config/db.js'; //import connectDB function from db.js to establish a connection to the MongoDB database
import habitRoutes from './src/routes/habit.routes.js'; //import habitRoutes from habit.routes.js to define the routes for habit-related API endpoints

//load variables from .env
dotenv.config();

//test connection to database
testDBConnection();

const app = express(); //create express app so that we can use it to define routes and middleware

//middleware : it allows us to parse incoming JSON requests and handle CORS (Cross-Origin Resource Sharing) issues.
app.use(cors());
app.use(express.json()); //parse incoming JSON requests

// build routes here
app.use('/api/v1/habits', habitRoutes);

//health check endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running'});
});

const PORT = process.env.port || 5000; //set the port to listen on, default to 5000 if not specified in .env

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})


// listen : Starts the server and turns on the port so requests can arrive
// u can call it once , it runs immediately 
// get : Registers a handler for one specific route + method
// u can call it multiple times , it runs when matching req comes
