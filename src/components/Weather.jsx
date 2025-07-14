// src/components/Weather.jsx

import React from 'react';

function Weather({ weather }) {
  return (
    <div className="card mx-auto text-center shadow p-4" style={{ maxWidth: '400px', borderRadius: '16px' }}>
      <div className="card-body">
        <h2 className="card-title mb-2">
          {weather.name}, {weather.sys.country}
        </h2>

        <h5 className="text-secondary text-capitalize mb-3">
          {weather.weather[0].description}
        </h5>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="Weather icon"
          className="mb-3"
          style={{ width: '100px', height: '100px' }}
        />

        <h1 className="display-4 mb-3">{Math.round(weather.main.temp)}°C</h1>

        <div className="d-flex justify-content-center gap-4">
          <div>
            <small className="text-muted">Humidity</small>
            <p className="mb-0">{weather.main.humidity}%</p>
          </div>
          <div>
            <small className="text-muted">Wind</small>
            <p className="mb-0">{weather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
