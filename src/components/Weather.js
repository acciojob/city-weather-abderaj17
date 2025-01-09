import React, { useState } from 'react'

const Weather = () => {
    const [query, setQuery ] = useState("");
    const [weather, setWeather ] = useState(null);
    const [error, setError] = useState("");

    const apiKey = "ebc1d22c0344b7746306b67843ceb451";


    const apiHandler = async ()=>{
        if(!query.trim()){
            setError("Please enter a city name.");
            setWeather(null);
            return;
        };

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.cod === 200){
            setWeather({
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            });
            setError("");
        }else{
            setError("City not found. Please try again.");
            setWeather(null);
        }
    }catch(err){
        setError("An errorr occurred while fetching the weather data.");
        setWeather(null);
    }
}

  return (
    <div className='weather-container' style={{textAlign: "center", marginTop: "20px"}}>
        <input type='text' className='search' 
        placeholder='Enter a city name'
        value={query}
        onChange={(e)=> setQuery(e.target.value)}
        style={{padding:"10px", width: "300px"}}
        />
        <button
        onClick={apiHandler}
        style={{padding:"10px 20px", marginLeft: "10px"}}>
            Search
        </button>
        {error && <p style={{color: "red", marginTop: "20px"}}>{error}</p>}

        {weather && (
            <div className='weather' style={{marginTop: "20px"}}>
                <h2>Weather in {query}</h2>
                <img src={weather.icon}alt='Weather Icon' />
                <p>Temperature: {weather.temperature}*C</p>
                <p>Description: {weather.description}</p>
                </div>
        )}
    </div>
  )
}

export default Weather