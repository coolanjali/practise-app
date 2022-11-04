import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import Forecastday from "./Forecastday";
import WeatherIcon from "./WeatherIcon";
import Conversion from "./Conversion";
import WeatherDay from "./WeatherDay";
export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [description, setDescription] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [displayCity, setDisplayCity] = useState(null);
  let [setcoord, cordSetting]=useState("");
  let [date,setDate]=useState("");

  function callTemperature(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setDescription(response.data.weather[0].description);
    setIcon({
      Icon:response.data.weather[0].icon,
    });
    setDisplayCity(response.data.name);
    setLoaded(true);
    cordSetting({
        coordinates:response.data.coord,
    });
    setDate({
        findDate:new Date(response.data.dt *1000),
    })
  }
  function changeForm(event) {
    event.preventDefault();
    let apiKey = "e292e53be8a0b0afa984b45848e5d6c9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(callTemperature);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }

  let Weather = (
    <div className="container">
      <h2>Searching for City Weather ....</h2>
      <form className="formControl" onSubmit={changeForm}>
        <input
          type="search"
          placeholder="Enter city name"
          onChange={changeCity}
        />
        <input type="submit" placeholder="Search" className="btn btn-primary" />
      </form>
      <figure className="figure">
        <img
          src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
          alt="..."
        />
        <figcaption className="figure-caption">
          5:10pm on Wednesday,October 26
        </figcaption>
      </figure>
      <span className="temperatureMeasure">
        10° C
      </span>
      <div className="heading">
        <h3>Paris</h3>
        <ul>
          <li>Wind:50 km/h</li>
          <li>Humidity:12 %</li>
          <li>Cloudy</li>
        </ul>
      </div>
      <footer>
        Open Source coded by Priyanka in{" "}
        <a href="https://github.com/coolanjali/happy">Github</a>
      </footer>
    </div>
  );

  if (loaded) {
    return (
      <div className="container">
        <h2>Searching for City Weather ....</h2>
        <form className="formControl" onSubmit={changeForm}>
          <input
            type="search"
            placeholder="Enter city name"
            onChange={changeCity}
          />
          <input
            type="submit"
            placeholder="Search"
            className="btn btn-primary"
          />
        </form>
        <figure className="figure">
          <WeatherIcon code={icon.Icon} size={80} />
          <figcaption className="figure-caption">
            <Forecastday findDay={date.findDate}/>
          </figcaption>
        </figure>
        <span className="temperatureMeasure">
          <Conversion calculate={temperature}/>
        </span>
        <div className="heading">
          <h3>{displayCity}</h3>
          <ul>
            <li>Wind: {Math.round(wind)} Km/h</li>
            <li>Humidity:{Math.round(humidity)} %</li>
            <li>{description}</li>
          </ul>
        </div>
        <WeatherDay findDay={setcoord.coordinates}/>
        <footer>
          Open Source coded by Priyanka in{" "}
          <a href="https://github.com/coolanjali/practise-app">Github</a>
        </footer>
      </div>
    );
  } else {
    return Weather;
  }
}