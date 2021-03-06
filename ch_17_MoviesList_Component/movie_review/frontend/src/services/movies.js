import axios from "axios";

class MovieDataService {

		static getAll(page = 0){
				return axios.get(`http://localhost:5000/api/v1/movies?pagge=${page}`);
		}

		static get(id){
				return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
		}

		static find(query, by = "title", page = 0){
				return axios.get( `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`);
		}

		static createReview(data){
				return axios.post("http://localhost:5000/api/v1/movies/review", data);
		}

		static updateReview(data){	
				return axios.put("http://localhost:5000/api/v1/movies/review", data);
		}

		static deleteReview(id, userId){
				return axios.delete("http://localhost:5000/api/v1/movies/review", 
						{ date: {
								review_id: id, 
								user_id: userId
						} }
				);
		}

		static getRatings(){
				return axios.get("http://localhost:5000/api/v1/movies/ratings");
		}

}

export default MovieDataService;
