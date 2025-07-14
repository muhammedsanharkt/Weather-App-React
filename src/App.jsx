// src/App.jsx

import React, { useState } from 'react';
import Weather from './components/Weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = 'c1ffb42a38edd21ab71b8be5169b8414';

  // Sample static city list (you can expand this!)
  const cityList = [
    'London',
    'Paris',
    'New York',
    'Berlin',
    'Tokyo',
    'Mumbai',
    'Sydney',
    'Cairo',
    'Moscow',
    'Beijing',
    'Dubai',
    'Singapore'
  ];

  const getWeather = async () => {
    if (!city) return;

    try {
      setError('');
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      setSuggestions([]); // Clear suggestions after search
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = cityList.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🌤️ Simple Weather App</h1>

      <form onSubmit={handleSubmit} className="mb-4 position-relative">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={handleChange}
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      {error && <p className="text-danger">{error}</p>}

      {weather && <Weather weather={weather} />}
    </div>
  );
}

export default App;
