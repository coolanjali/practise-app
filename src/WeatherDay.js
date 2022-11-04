import React,{useState ,useEffect} from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
export default function WeatherDay(props){
let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(()=>{
    setLoaded(false);
  },[props.findDay]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function(finding,index){
            if(index>0 && index<6){
              return(
              <div className="col" key={index}>
            <WeatherForecastDay data={finding} />
           </div>
              );
            }else{
              return null;
            }
          })}
          
        </div>
      </div>
    );
  } else {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let longitude = props.findDay.lon;
    let latitude = props.findDay.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}