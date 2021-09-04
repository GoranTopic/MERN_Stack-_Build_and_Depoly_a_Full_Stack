import React, {useState, useEffect} from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

// bootstrap import 
import Card from  'react-bootstrap/Card';
import Container from  'react-bootstrap/Container';
import Image from  'react-bootstrap/Image';
import Col from  'react-bootstrap/Col';
import Row from  'react-bootstrap/Row';
import Button from  'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';

const Movie = props => {
		const [ movie, setMovie ] = useState({ id: null, title:"", rated:"", reviews: [] });

		useEffect( // run everytime the props params changes
				() => { getMovie(props.match.params.id) }, 
				[props.match.params.id]
		);

		const getMovie = id =>{
				MovieDataService.get(id)
						.then(response => {  
								setMovie(response.data);
								console.log("queried data from db");
								console.log(response.data);
						}).catch(e => {console.log(e)});
		}

		return(
				<div>
						<Container>
								<Row>
										<Col> 
												<Image fluid src={movie.poster+"/100px250"}/>
										</Col>
										<Col>
												<Card>
														<Card.Header as="h5">{movie.title}
														</Card.Header>
														<Card.Body>
																<Card.Text>
																</Card.Text>
																{props.user && <Link 
																		to={"/movies/" + props.match.params.id +"review" }> 
																		Add Review
																</Link> }
														</Card.Body>
												</Card>
												<br></br>
												<h2>Reviews</h2>
										</Col>
								</Row>
						</Container>
				</div>
		);
		




}


export default Movie;	
