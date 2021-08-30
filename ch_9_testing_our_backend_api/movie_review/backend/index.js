import app from './server.js';
// import server object
import MoviesDAO from "./dao/moviesDAO.js"; 
// import the movies Data Access Object 
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main(){

		dotenv.config(); // load the dot env variables 

		const port = process.env.PORT || 8000;
		const url = process.env.MOVIE_REVIEW_DB_URL;
		const client  = new mongodb.MongoClient( url );

		try {
				await client.connect();	
				await MoviesDAO.injectDB(client);
				app.listen(port, () =>{
						console.log('server is running on port: ' + port);
				});
		} catch (e){
				console.error(e);
				process.exit(1);
		}
}

main().catch(console.error);
