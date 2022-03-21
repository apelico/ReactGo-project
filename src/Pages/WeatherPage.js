import './WeatherPage.css';
import React, { useEffect, useState } from 'react'
import RenderText from '../Components/RenderText';

export default function WeatherPage() {
    const [weather, setWeather] = useState([]);

    const getJson = async () => {
        const res = await fetch('/api/getCurrentWeatherData')
        const data = await res.json();
        setWeather(JSON.parse(data));
    }

    useEffect(() => {
        getJson()
    }, [])

  return (
      <>
      <RenderCurrentWeatherData data={weather} />
      <RenderDailyWeatherData data={weather} day={1} />
      <RenderDailyWeatherData data={weather} day={2} />
      <RenderDailyWeatherData data={weather} day={3} />
      <RenderDailyWeatherData data={weather} day={4} />
      <RenderDailyWeatherData data={weather} day={5} />
      <RenderDailyWeatherData data={weather} day={6} />
      <RenderDailyWeatherData data={weather} day={7} />
      </>
  )
}

const RenderCurrentWeatherData=({data}) => {
  if(data.current !== undefined){
    return(
      <div className='temperature'>
          <RenderText id='day' text={`Current`}/>
          <RenderText id='currentTemperature' text={`${ConvertKelvinToFahrenheit(data.current.temp)}°`}/>

          <div>
            <RenderText id='weatherDescription' text={data.current.weather[0].description}/>
            <RenderText id='weatherFeelsLike' text={`Feels like ${ConvertKelvinToFahrenheit(data.current.feels_like)}°`}/>
          </div>

          <div className='row'>
            <div className='column'>
              <p>Wind</p>
              <RenderText  text={`${GetDirectionFromDegrees(data.current.wind_deg)} ${data.current.wind_speed} mph`}/>
            </div>
            <div className='column'>
              <p>visibility</p>
              <RenderText text={`${ConvertMetersToMiles(data.current.visibility)} mi`}/>
            </div>
          </div>

          <div className='row'>
            <div className='column'>
              <p>Humidity</p>
              <RenderText text={`${data.current.humidity}%`}/>
            </div>
            <div className='column'>
              <p>Clouds</p>
              <RenderText text={`${data.current.clouds}%`}/>
            </div>
          </div>
      </div>
    )
  }

  return <></>
}

const RenderDailyWeatherData=({data, day}) => {
  if(data.current !== undefined){
    return(
      <div className='temperature'>
          <RenderText id='day' text={`${ConverUTCToDay(data.daily[day].dt)}`}/>
          <RenderText id='currentTemperature' text={`${ConvertKelvinToFahrenheit(data.daily[day].temp.min)}°/${ConvertKelvinToFahrenheit(data.daily[day].temp.max)}`}/>

          <div>
            <RenderText id='weatherDescription' text={data.daily[day].weather[0].description}/>
          </div>

          <div className='row'>
            <div className='column'>
              <p>SunRise</p>
              <RenderText  text={`${ConvertUTCToTime(data.daily[day].sunrise)} AM`}/>
            </div>
            <div className='column'>
            <p>SunSet</p>
              <RenderText  text={`${ConvertUTCToTime(data.daily[day].sunrise)} PM`}/>
            </div>
          </div>

          <div className='row'>
            <div className='column'>
              <p>Humidity</p>
              <RenderText text={`${data.current.humidity}%`}/>
            </div>
            <div className='column'>
            <p>Wind</p>
              <RenderText  text={`${GetDirectionFromDegrees(data.daily[day].wind_deg)} ${data.daily[day].wind_speed} mph`}/>
            </div>
          </div>
      </div>
    )
  }

  return <></>
}

function ConvertKelvinToFahrenheit(value){
  return parseInt((value * 1.8 ) - 459.67)

}

function GetDirectionFromDegrees(angle) {
  var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index]
}

function ConvertMetersToMiles(meters){
  return parseInt(meters*0.000621371192);
}

function ConvertUTCToTime(UTC){
var date = new Date(UTC * 1000);
var timeStampCon = date.getHours() + ':' + date.getMinutes();

return timeStampCon
}

function ConverUTCToDay(UTC){
  var date = new Date(UTC * 1000);
  var day = date.getDay();

  switch(day){
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    default:
      return 'null'
    
  }
}
