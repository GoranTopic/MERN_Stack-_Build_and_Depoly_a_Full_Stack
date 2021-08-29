import express from 'express';
import cors from 'cors';
//import movies from './api/movies.route.js';

const app = express(); // make instance of the express app
app.use(cors()); // use the middleware cors
app.use(express.json()); // use json middleware

// define movies route
//app.user('api/v1/movies', movies);

app.use('*', (req,res) => { 
		// define a global route thath catches any get requests
		res.status(404).json({error: "not found"})
})


export default app;

