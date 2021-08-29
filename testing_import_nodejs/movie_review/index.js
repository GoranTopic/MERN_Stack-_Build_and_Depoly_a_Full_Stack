import mongodb from "mongodb";
import dotenv from "dotenv";
import app from './server.js';

async function main(){
		dotenv.config();
		const port = process.env.PORT || 8000;
		const url = process.env.MOVIEREVIEWS_DB_URL
		const client  = new mongodb.MongoClient( url );
		/*
		try {
				await client.connect();	
				app.listen(post, () =>{
						console.log('server is running on port:' + port);
				});
		} catch (e){
				console.error(e);
				process.exit(1);
		}
		*/
}

main().catch(console.error);
