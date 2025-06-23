import { errorHandler } from "../utils/error.js";
import CryptoJS from "crypto-js";

export const getMarvelCharacters = async (req, res, next) => {
  try {
    const { nameStartsWith } = req.query;
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      return next(
        errorHandler(500, "Marvel API keys not configured in environment variables")
      );
    }

    const ts = new Date().getTime().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const authParams = `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(nameStartsWith)}&limit=10&${authParams}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Marvel API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const characters = data?.data?.results?.map(character => ({
      id: character.id,
      name: character.name,
      description: character.description || "No description available",
      thumbnail: {
        path: character.thumbnail.path.replace(/^http:\/\//, 'https://'),
        extension: character.thumbnail.extension
      },
      comics: character.comics,
      series: character.series,
      events: character.events,
      urls: character.urls
    })) || [];
    
    res.status(200).json(characters);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};