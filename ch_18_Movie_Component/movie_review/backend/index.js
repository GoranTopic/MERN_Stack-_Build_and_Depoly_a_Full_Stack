import mongodb from "mongodb";
import dotenv from "dotenv";
import app from './server.js';
// import server object
import MoviesDAO from "./dao/moviesDAO.js"; 
// import the movies Data Access Object 
import ReviewsDAO from "./dao/reviewsDAO.js"; 
// import the reviews Data Access Object 

async function main(){

		dotenv.config(); // load the dot env variables 

		// connect to database
		const port = process.env.PORT || 8000;
		const url = process.env.MOVIE_REVIEW_DB_URL;
		const client_conn  = new mongodb.MongoClient( url );

		try {
				await client_conn.connect();	
				await MoviesDAO.injectDB(client_conn); // connect to db
				await ReviewsDAO.injectDB(client_conn); // connect to db
				app.listen(port, () => { // run app 
						console.log('server is running on port: ' + port);
				});
		} catch (e){
				console.error(e);
				process.exit(1);
		}
}

main().catch(console.error);
