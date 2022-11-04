import React from "react";
export default function Forecastday(props){
    console.log(props.findDay);
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[props.findDay.getDay()];
    let hours= props.findDay.getHours();
    let minute= props.findDay.getMinutes();
    let months=["January","Febraury","March","April","May","June","July","August","September","October","November","December"]; 
    let month=months[props.findDay.getMonth()];
    if(minute<10){
        minute=`0${minute}`;
    }
    return(
        <div>
            `{hours}:{minute} on {day} , {month} `
        </div>
    )
}