import ReviewsDAO from '../dao/reviewsDAO.js';


export default class ReviewsController{
		/* controller class for handeling review requests */
		static async apiPostReview(req, res, next){
				/* method for creating and posting a review */
				try{
						// get movie id from req
						console.log(req.body)
						console.log(req);
						const movieId = req.body.movie_id; 
						console.log(movieId);
						const review = req.body.review; // get review body 
						console.log(review);
						const userInfo = { // get userInfo
								name: req.body.name,
								_id: req.body.user_id
						}
						const date = new Date(); // get the current date
						// add a movie review to the databse
						const ReviewResponse = await ReviewsDAO.addReview(
								movieId,
								userInfo,
								review,
								date);
						// return status successfull
						res.json( { status:"success" } );
				}catch(e){
						res.status(500).json({ error: e.message });
						console.error(`unable to handle post review request ${e}`);
				}
		}

		static async apiUpdateReview(req,res,next){
				/* method foe updating a review */
				try{
						const reviewId = req.body.review_id
						const review = req.body.review; // the new review to update with

						const date = new Date(); // get the current date
						// add a movie review to the databse
						
						const ReviewResponse = await ReviewsDAO.addReview(
								reviewId,
								req.body.user_id,
								review,
								date);
						var { error } = ReviewResponse;
						if(error){
								res.status.json({error})
						}
						if(ReviewResponse.modifiedCount === 0){
								throw new Error ("unable to update review. User may not be original poster");
						}
						// return status successfull
						res.json( { status:"success" } );
				}catch(e){
						res.status(500).json({ error: e.message });
				}
		}

		static async apiDeleteReview(req,res,next){
				try{
						const reviewId = req.body.review_id;
						const userId = req.body.user_id;
						const ReviewResponse = await ReviewsDAO
								.deleteReview(reviewId, userId);
						res.json({status: "success"});
				}catch(e){
						res.status(500).json({ error: e.message });
				}
		}

}


