import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface WeatherInfo {
  searchedCity: string;
  weatherInfo: {} | null;
  forecastWeatherInfo: {} | null;
  isError: boolean;
}

const initialState: WeatherInfo = {
  searchedCity: "Yerevan",
  weatherInfo: null,
  forecastWeatherInfo: null,
  isError: false,
};

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "466d43c278ea5c2b140fcde2f24afc0e";

export const fetchCurrentWeather = createAsyncThunk(
  "fetchCurrentWeather",
  async ({ city }) => {
    console.log(city, "city");
    const res = await fetch(
      `${BASE_URL}/weather?q=${city || "Yerevan"}&appid=${API_KEY}`
    );
    const result = await res?.json();
    return result;
  }
);

export const fetchForecastWeather = createAsyncThunk(
  "fetchForecastWeather",
  async ({ city }) => {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${city || "Yerevan"}&appid=${API_KEY}`
    );
    const result = await res?.json();
    return result;
  }
);

export const weatherSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setSearchedCity: (state, action) => {
      state.searchedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.weatherInfo = action.payload;
    });
    builder.addCase(fetchCurrentWeather.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(fetchForecastWeather.fulfilled, (state, action) => {
      const dailyForecast = action.payload?.list?.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
      );
      state.forecastWeatherInfo = dailyForecast;
    });
  },
});

export const { setSearchedCity } = weatherSlice.actions;

export default weatherSlice.reducer;
