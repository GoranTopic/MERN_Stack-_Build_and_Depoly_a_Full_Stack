import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController{
		static async apiGetMovies(req, res, next){
				/* this func parses the request obj, 
				 * call the movies Data access object and return 
				 * the result as a response */
				// if no movies per page is provided, set 20 as default
				const moviesPerPage = req.query.moviesPerPage? 
						parseInt(req.query.moviesPerPage) : 20;
				// if the page number is not passed, default to 0
				const page = req.query.page? 
						parseInt(req.query.page) : 0;
				// parse additional filters
				let filters = {};
				if(req.query.rated){ // if rated is provided
						filters.rated = req.query.rated; // use the rate passed
				}else if(req.query.title){ // if title is provide  
						filters.title = req.query.title; // use the title passed
				}
				// call the Movies DAO which queries the db 
				const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage})

				let response ={ // store response into obj reponse
						movies: moviesList,
						page: page,
						filters: filters,
						entries_per_page: totalNumMovies,
				}
				// restun json obj as response
				res.json(response);
		}

		static async apiGetMovieById(req,res,nex){
				try{
						let id = req.params.id || {} ; // luvely <3
						let movie = await MoviesDAO.getMovieById(id);
						if(!movie){
								res.status(404).json({ error: "not found" })
								return
						}
						res.json(movie);
				}catch(e){
						console.log(`api, ${e}`);
						res.status(500).json({ error: e });
				}
		}

		static async apiGetRatings(req, res, next){
				try{
						let propertyTypes = await MoviesDAO.getRatings();
						res.json(propertyTypes);
				}catch(e){
						console.log(`api, ${e}`); 
						res.status(500).json({error: e });
				}
		}

}
