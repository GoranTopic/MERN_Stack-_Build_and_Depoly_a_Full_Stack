import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
// needed to convert a string into a obj id of mongodb

let reviews;

export default class ReviewsDAO{
		static async injectDB(conn){
				if(reviews){
						return 
				}
				try {
						const reviews_ns = process.env.MOVIE_REVIEW_NS;
						reviews = await conn.db(reviews_ns).collection('reviews');
						reviews && console.log("review db connected"); // can't beliv this works 
				}catch(e){
						console.error(`unable to establish connection handle in reviewDAO: ${e}`);
				}
		}

		static async addReview(movieId, user, review, date){
				try{
						const reviewDoc = {
								name : user.name, 
								user_id: user._id, 
								date: date,
								review: review,
								movie_id: ObjectId(movieId)
						}
						//console.log(reviewDoc);
						return await reviews.insertOne(reviewDoc)
				}catch(e){
						console.log(`unable to post review: ${e}`);
						return { error: e }
				}
		}

		static async updateReview(reviewId, userId, review, date){
				try{
						const updateRespose = await review.updateOne({
								user_id: userId, 
								_id: ObjectI(reviewId)
						}, {$set:{review:review, date:date}});
						return updatedResponse;
				}catch(e){
						console.error(`unable to update review: ${e}`);
						return { error: e };
				}
		}

		static async deleteReview(reviewId, userId){
				try{
						const deleteResponse = await reviews.deleteOne({
								_id: ObjectId(reviewId),
								user_id: userId,
						})
						return deleteResponse
				}catch(e){
						console.error(`unable to delte review: ${e}`);
						return { error: e };
				}
		}

}


