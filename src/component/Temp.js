import React, { useEffect, useState } from "react";
import "./style.css";
import Weathercard from "./Weathercard";

const Temp = () => {
  const [serchValue, setSearchValue] = useState("Mumbai");
  const [tempinfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${serchValue}&units=metric&appid=4010c2d18a377d624bb7b9d03317d5d8`;
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search.."
            autoFocus
            id="search"
            value={serchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="searchTerm"
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      {/* Our Temp card */}
      <Weathercard tempinfo={tempinfo} />
    </>
  );
};

export default Temp;
