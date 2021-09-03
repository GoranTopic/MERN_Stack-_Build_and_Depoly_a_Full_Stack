//import logo from './logo.svg';
import React from 'react';

import Movie from './components/movie.js'
import Login from './components/login.js'
import MoviesList from './components/movies-list.js'
import AddReview from './components/add-review.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';


function App() {

		// hook for logged in user
		const [user, setUser] = React.useState(null);

		async function login(user = null){
				setUser(user);
		}

		async function logout(){
				setUser(null);
		}


		return (
				<div className="App">
						<Navbar bg="ligh" expand="lg">
								<Navbar.Brand href="#home">
										Movies-Review
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav"/>
								<Navbar.Collapse id="basic-navbar-nav">
										<Nav classname="mr-auto">
												<Nav.Link>
														<Link to={"/movies"}>Movies</Link>
												</Nav.Link>
												<Nav.Link>
														{ user ?
																		(<a href="#" onClick={logout}> Logout user</a>):
																		(<Link to={"/login"}>Login</Link>) }
												</Nav.Link>
										</Nav>
								</Navbar.Collapse>
						</Navbar>
						<Switch>
								<Route exact path={["/", "/movies"]} component={MoviesList}> </Route>
								<Route path="/movies/:id/review" render={ 
										(props) => <AddReview {...props} user={user}/>
										}> 
								</Route>
								<Route  path="/movies/:id/" render={ 
										(props) => <Movie {...props} user={user}/>
										}>
								</Route>
								<Route path="/login" render={
										(props) => <Login {...props} login={login}/>
										}>
								</Route>
						</Switch>
				</div>
		);
}

export default App;
