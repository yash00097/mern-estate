import { useState, useEffect, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const MarvelCharacterInput = ({ 
  value, 
  onChange, 
  publicKey, 
  privateKey 
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [keysValid, setKeysValid] = useState(true);

  useEffect(() => {
    setInputValue(value || '');
    setKeysValid(!!publicKey && !!privateKey);
  }, [value, publicKey, privateKey]);

  const generateAuthParams = useCallback(() => {
    const ts = new Date().getTime().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }, [publicKey, privateKey]);

  const fetchSuggestions = useCallback(
    debounce((input) => {
      if (!keysValid || !input) {
        setSuggestions([]);
        return;
      }
      
      const authParams = generateAuthParams();
      const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(input)}&limit=10&${authParams}`;
      
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(`API request failed: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setSuggestions(data?.data?.results?.map(char => char.name) || []);
        })
        .catch((err) => {
          console.error('Error fetching characters:', err);
          setSuggestions([]);
        });
    }, 300),
    [generateAuthParams, keysValid]
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (keysValid) {
      fetchSuggestions(newValue);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your favorite Marvel character name"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 p-0 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg max-h-48 overflow-y-auto z-10 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      
      {!keysValid && (
        <div className="text-red-500 text-sm mt-1">
          Marvel API keys are missing. Please check your environment variables.
        </div>
      )}
    </div>
  );
};

export default MarvelCharacterInput;
