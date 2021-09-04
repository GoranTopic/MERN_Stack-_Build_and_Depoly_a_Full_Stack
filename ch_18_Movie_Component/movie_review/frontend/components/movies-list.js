import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { link } from "react-router-dom";

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
		const [ searchRatings, setSearchRatings ] = useState("");
		const [ ratings, setRatings ] = useState(["All Ratings"]);

		useEffect(() => {
				// run after the components have rendered once,
				//  if we dont pass the second argument useEffect 
				//  is run on every render 
				console.log("this ran")
				retrieveMovies()
				retrieveRatings()
		}, []);

		const retrieveMovies = () =>{
				MovieDataService.getAll() // movie Data service returns a promise
				.then(response => { // after fetching data
						console.log(response.date);
						setMovies(response.data.movies); // set date in hook
				}).catch(e => {console.log(e)});
		}

		const retrieveRatings = () =>{
				MovieDataService.getRatings()
				.then(response => {
						console.log(response.data); // start with all ratings 
						setRatings(["All Ratings"]).concat(response.data); // add fetched ratings?
				}).catch(e => { console.log(e) });
		}

		const onChangeSearchTitle = e => {
				// get value from input bar
				const searchTitle = e.target.value;
				setSearchTitle(searchTitle);
		}


		const onChangeSearchRatings = e => {
				const searchRatings = e.target.value;
				setSearchRating(searchRatings);
		}

		const find = (query, by) => {
				MovieDataService.find(query, by)
						.then(reponse => {  
								console.lof(response.data);
								setMovies(reponse.data);
						}).catch(e => { console.log(e) });
		}

		const findByTitle = () =>{
				find(searchTitle, "title");
		}

		const findByRating = () => {
				if(searchRatings === "All Ratings"){
						retiveMovies();
				}else{
						find(searchRatings, "rated");
				}
		}


		return(
				<div className="App">
						<Container>
								<Text> Hello world</Text>
						</Container>
				</div>

		);
}

export default MoviesList;	



/* 
		return (
				<div className="App">
						<Text> Hello world</Text>
						<Container>
								<Form>
										<Row>
												<Col>
														<From.Group>
																<From.Control type="text" 
																		placeholder="Search by title" 
																		value={searchTitle}
																		onChange={onChangeSearchTitle}/>
														</From.Group>
														<Button variant="primary" type="button" onClick={findByTitle}>
																Search
														</Button>
												</Col>
												<Col>
														<From.Group>
																<From.Control as="select" 
																		onChange={onChangeSearchRatings}>
																		{ratings.map(rating => <option value={ratings}>{rating}</option>)}
																</From.Control>
														</From.Group>
														<Button
																variant="primary"
																type="button"
																onClick={findByRating}>
																search
														</Button>
												</Col>
										</Row>
								</From>
										<Row>
												{movies.map((movie) => {
														return(
																<Col>
																		<Card style={{ width:'18rem' }}>
																				<Card.Img src={movie.poster + "/100px180"}/>
																				<Card.Body>
																						<Card.Title>{movie.title}</Card.Title>
																						<Card.Text> Rating: {movie.rated} </Card.Text>
																						<Card.Text>{movie.plot}</Card.Text>
																						<Link to={"/movies/"+movies._id}/>View Reviews</Link>
																		</Card.Body>
																</Card>
										</Col>
														);
												})}
						</Row>
				</Container>
				</div>
										);

*/	
