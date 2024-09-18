import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
} from "../../app/slices/weatherSlice.ts";
import { RootState } from "../../app/store";
import { formatDate } from "../../helpers/dateFormatter.ts";
import { kelvinToCelsius } from "../../helpers/kelvinToCelsius.ts";

const WeatherInfo = () => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState();
  const { weatherInfo, forecastWeatherInfo, searchedCity } = useSelector(
    (state: RootState) => state.weather
  );

  console.log(forecastWeatherInfo, "forecastWeatherInfo");
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCurrentWeather({ city: "Yerevan" }));
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchForecastWeather({ city: "Yerevan" }));
    };

    fetchData();
  }, [dispatch]);

  const handleSelect = (card) => {
    setSelectedDay(card.weather[0].id);
  };

  if (weatherInfo) {
    return (
      <div>
        <div className="card">
          <h3>{weatherInfo.name}</h3>
          <h2>
            {kelvinToCelsius(weatherInfo.main?.temp)}
            °C
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather?.[0].icon}@2x.png`}
            alt="icon"
          />
          <p>{weatherInfo?.weather?.[0].main}</p>
        </div>
        <div>
          <h1>5-Day Weather Forecast for {searchedCity}</h1>
          <div className="cards">
            {forecastWeatherInfo?.map((entry, index) => (
              <div
                key={index}
                className={`card ${
                  selectedDay?.id === entry.weather?.[0].id ? "selected" : ""
                }`}
                onClick={() => handleSelect(entry)}
              >
                <p>
                  <strong>{formatDate(entry.dt_txt)}</strong>
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${entry.weather?.[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>
                  <strong>{kelvinToCelsius(entry.main.temp)}°C</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <>loading..</>;
};

export default WeatherInfo;
