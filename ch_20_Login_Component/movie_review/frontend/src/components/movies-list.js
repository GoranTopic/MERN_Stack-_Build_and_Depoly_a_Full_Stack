import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

// bootstrap import 
import Container from  'react-bootstrap/Container';
import Button from  'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from  'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Card from  'react-bootstrap/Card';

const MoviesList = props => {
		const [ movies, setMovies ] = useState([]);
		const [ searchTitle, setSearchTitle ] = useState("");
		const [ searchRating, setSearchRating ] = useState("");
		const [ ratings, setRatings ] = useState(["All Ratings"]);
		
		useEffect(() => {
				// run after the components have rendered once,
				//  if we dont pass the second argument useEffect 
				//  is run on every render 
				retrieveMovies();
				retrieveRatings();
		}, []);

		const retrieveMovies = () =>{
				MovieDataService.getAll() // movie Data service returns a promise
						.then(response => { // after fetching data
								console.log(response.data);
								setMovies(response.data.movies); // set date in hook
						}).catch(e => {console.log(e)});
		}

		const retrieveRatings = () =>{
				MovieDataService.getRatings()
						.then(response => {
								console.log(response.data); // start with all ratings 
								setRatings(["All Ratings"].concat(response.data)); // add fetched ratings?
						}).catch(e => { console.log(e) });
		}

		const onChangeSearchTitle = e => {
				// get value from input bar
				const searchTitle = e.target.value;
				setSearchTitle(searchTitle);
		}


		const onChangeSearchRatings = e => {
				const searchRating = e.target.value;
				console.log(e.target);
				console.log("rating changed:");
				console.log(searchRating);
				setSearchRating(searchRating);
		}

		const find = (query, by) => {
				MovieDataService.find(query, by)
						.then(response => {  
								console.log("found movies:");
								console.log(response.data.movies);
								setMovies(response.data.movies);
						}).catch(e => { console.log(e) });
		}

		const findByTitle = () =>{
				find(searchTitle, "title");
		}

		const findByRating = () => {
				if(searchRating === "All Ratings"){
						retrieveMovies();
				}else{
						find(searchRating, "rated");
				}
		}

		const renderMovieCard = (movie, key) =>
				<Col>
						<div key={key}>
								<Card style={{ width:'18rem' }}>
										<Card.Img src={movie.poster + "/100px180"} alt="poster not found"/>
										<Card.Body>
												<Card.Title>{movie.title}</Card.Title>
												<Card.Text> Year: {movie.year} </Card.Text>
												<Card.Text> Rating: {movie.rated} </Card.Text>
												<Card.Text>{movie.plot}</Card.Text>
												<Link to={"/movies/"+movies._id}>View Reviews</Link>
										</Card.Body>
								</Card>
						</div>
				</Col>

						return(
								<div className="App">
										<Container>
												<Form>
														<Row>
																<Col>
																		<Form.Group>
																				<Form.Control type="text" 
																						placeholder="Search by title" 
																						value={searchTitle}
																						onChange={onChangeSearchTitle}/>
																		</Form.Group>
																		<Button variant="primary" type="button" onClick={findByTitle}>
																				Search
																		</Button>
																</Col>
																<Col>
																		<Form.Group>
																				<Form.Control as="select" 
																						onChange={onChangeSearchRatings}>
																						{ratings.map(
																								rating => <option value={rating}>{rating}</option>
																						)}
																				</Form.Control>
																		</Form.Group>
																		<Button variant="primary" type="button" onClick={findByRating}>
																				search
																		</Button>
																</Col>
														</Row>
												</Form>
												<Row>
														{movies.map(renderMovieCard)}
												</Row>
										</Container>
								</div>

		);
}

export default MoviesList;	
