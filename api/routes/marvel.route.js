import express from 'express';
import { getMarvelCharacters } from '../controllers/marvel.controller.js';

const router = express.Router();

router.get('/characters', getMarvelCharacters);

export default router;