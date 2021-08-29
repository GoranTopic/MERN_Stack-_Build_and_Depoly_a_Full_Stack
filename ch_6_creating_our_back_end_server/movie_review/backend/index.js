import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";

async function main(){

		dotenv.config();

		const port = process.env.PORT || 8000;
		const url = process.env.MOVIE_REVIEW_DB_URL;
		console.log(url);
		const client  = new mongodb.MongoClient( url );

		try {
				await client.connect();	
				app.listen(port, () =>{
						console.log('server is running on port:' + port);
				});
		} catch (e){
				console.error(e);
				process.exit(1);
		}
}

main().catch(console.error);
