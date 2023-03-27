import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "70b633589a881d40f9bc32b473f07139"; // 날씨 API 키

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null); // 날씨 정보를 저장하는 상태
  const [location, setLocation] = useState(null); // 위치 정보를 저장하는 상태

  useEffect(() => {
    // 위치 정보 가져오기
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, error => {
      console.error("위치 정보를 가져올 수 없습니다.", error);
    });
  }, []);

  useEffect(() => {
    if (location) {
      // API 요청 보내기
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`)
        .then(response => {
          setWeatherData(response.data); // 날씨 정보 업데이트
        })
        .catch(error => {
          console.error("API 요청 중 에러 발생", error);
        });
    }
  }, [location]);

  return (
    <div>
      <h1>날씨 정보</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.location.name} 날씨 정보</h2>
          <p>온도: {weatherData.current.temp_c} °C</p>
          <p>습도: {weatherData.current.humidity}%</p>
          <p>날씨: {weatherData.current.condition.text}</p>
          <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} />
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default WeatherApp;