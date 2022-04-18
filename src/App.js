import React, { useState } from 'react'
import './App.css';


function App() {

  const apiKey = "1daf154d8edb348e71799684ea0ae8a9";

  const [weaterData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setCity('')
        }
        )
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='app'>
      <div className="container">
        <div className="search-box">
          <input type='text'
            className="search-bar"
            placeholder='Enter city...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          />

        </div>

        {typeof weaterData.main == 'undefined' ? (
          <div>
            <p className='main-text'>Wellcome to weather app! Enter in a city to get the weather of.</p>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">
                {weaterData.name}, {weaterData.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weaterData.main.temp)} °C
              </div>
              <div className="weather">{weaterData.weather[0].main}</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
