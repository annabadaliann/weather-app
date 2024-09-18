import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
  setSearchedCity,
} from "../../app/slices/weatherSlice.ts";
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx";
import "./style.css";

const SearchField = () => {
  const [value, setValue] = useState("Yerevan");
  const dispatch = useDispatch();
  const [errorModal, setErrorModal] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = async () => {
    dispatch(setSearchedCity(value));
    const getCurrentWeather = await dispatch(
      fetchCurrentWeather({ city: value })
    );
    const getForecastWeather = await dispatch(
      fetchForecastWeather({ city: value })
    );

    const isSuccess = await (
      await Promise.all([getCurrentWeather, getForecastWeather])
    ).every((promise) => {
      return promise.payload.cod == 200;
    });

    if (!isSuccess) {
      setErrorModal(true);
    }
  };

  return (
    <>
      <div className="search-field">
        <input onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ModalWrapper isOpen={errorModal} onClose={() => setErrorModal(false)}>
        <div>No city found! Please write something valid</div>
      </ModalWrapper>
    </>
  );
};

export default SearchField;
