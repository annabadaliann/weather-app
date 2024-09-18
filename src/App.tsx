import React from "react";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo.tsx";
import SearchField from "./components/SearchField/SearchField.tsx";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <header>
        <div className="container">
          <h1>Weather app</h1>
        </div>
      </header>

      <div className="main">
        <div className="container">
          <SearchField />
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
