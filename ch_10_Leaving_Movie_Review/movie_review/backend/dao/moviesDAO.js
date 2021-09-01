import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let movies;

export default class MovieDAO{
		static async injectDB(conn){
				if(movies){ return } 
				try{
						// get the name space, or the name of the db from the env var
						const ns = process.env.MOVIE_REVIEW_NS;
						console.log(ns)
						// with the connection passed, ns on the collection movies
						movies = await conn.db( ns ).collection('movies');
				}catch(e){
						console.error('unable to connect to MoviesDAO: ${e}');
				}
		}
	
		static async getMovies({  // default filter
				filters = null, 
				page = 0, 
				moviesPerPage = 20, // will only get 20 movies at once
		} = {}){
				let query;
				if(filters){ // if a filter is passed, add it to the query obj
						if("title" in filters){ // if filter has own property title
								query = { $text: { $search: filters['title'] } };
						}else if("rated" in filters){ // if  filter has a rated property 
								query = { "rated": { $eq: filters['rated']} };
						}
				}
				let cursor;
				try{
						// save a page of the queried objecst in the cursor 
						console.log(query);
						cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page); 
						
						const moviesList = await cursor.toArray(); // make queried objs into an array
						const totalNumMovies = await movies.countDocuments(query); // query the db for number of documents
						return { moviesList, totalNumMovies };
				} catch(e){
						console.error(`Unable to issue find command, ${e}`);
						return { moviesList: [], totalNumMovies: 0 };
				}
		}

		static async getMovieById(id){
				try{
						return await movies.aggregate([
								{
										$match: { // run a query that matches the object id
												_id: new ObjectId(id),
										}
								},{ 
										$lookup:{ 
												from: 'reviews',
												localField: '_id',
												foreignField: 'movie_id',
												as: 'reviews',
										} 
								}
						]).next()
				}catch(e){
						console.error(`something went worng in getMovieById, MovieDAO: ${e}`);
						throw e;
				}
		}

		static async getRatings(){
				let ratings = [];
				try{
						ratings = await movies.distinct("rated");
						return ratings;
				}catch(e){
						console.error(`unable to get ratings: ${e}`);
						return ratings;
				}
		}

}
