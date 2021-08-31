import express from 'express';
import Moviescontroller from './movies.controller.js';
// import controller for movie route
import ReviewsController from './review.controller.js';
// import review controller 


const router = express.Router() // get access to exporess router?

// pass the controller to any url 
router.route('/').get(Moviescontroller.apiGetMovies);

// route for posting review
router.route("/review") // route for review CRUD
		.post(ReviewsController.apiPostReview) // create review 
		.put(ReviewsController.apiUpdateReview) // update
		.delete(ReviewsController.apiDeleteReview) // delete


export default router
