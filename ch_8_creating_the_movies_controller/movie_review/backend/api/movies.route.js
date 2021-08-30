import express from 'express';
import Moviescontroller from './movies.controller.js';

const router = express.Router() // get access to exporess router?

router.route('/').get(Moviescontroller.apiGetMovies);



export default router
