let movies;

export default class MovieDAO{
		static async injectDB(conn){
				if(movies){ return } 
				try{
						// get the name space, or the name of the db from the env var
						const ns = process.env.MOVIEREVIEW_NS;
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
								query = { "rated": { $eq: filter['rated']} };
						}
				}
				let cursor;
				try{
						// save a page of the queried objecst in the cursor 
						cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page); 
						const moviesList = await cursor.toArray(); // make queried objs into an array
						const totalNumMovies = await movies.countDocuments(query); // query the db for number of documents
						return { moviesList, totalNumMovies };
				} catch(e){
						console.error('Unable to issur find command, ${e}');
						return { moviesList: [], totalNumMovies: 0 };
				}
		}
}
