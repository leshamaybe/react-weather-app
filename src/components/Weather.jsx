import axios from 'axios';
import { useEffect, useState } from 'react';
import sunny from '../assets/Sunny.svg';
import plus from '../assets/plus.svg';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const apiKey = '';  // Use your OpenWeatherMap api key
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dateFormatter = (num) => (num > 9 ? num : '0' + num);
    let date = new Date();
    let currentDay = date.getDay();

    const addLocationHandler = async () => {
        let cityRequest = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},ru&appid=${apiKey}&units=metric`,
        );
        let res = cityRequest;

        const copy = Object.assign([], weatherData);
        copy.push({
            name: res.data.name,
            day: days[currentDay - 1],
            dateFormat: `${dateFormatter(date.getDate())}/${dateFormatter(
                date.getMonth() + 1,
            )}/${date.getFullYear()}`,
            temperature: res.data.main.temp,
            visibility: res.data.visibility,
            wind: res.data.wind.speed,
            feelsLike: res.data.main.feels_like,
            desc: res.data.weather[0].description,
        });

        setWeatherData(copy);
    };

    useEffect(() => {
        try {
            const getApi = async (lat, lon) => {
                let defaultCity = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
                );
                let res = defaultCity;

                setWeatherData(() => {
                    return [
                        {
                            name: res.data.name,
                            day: days[currentDay - 1],
                            dateFormat: `${dateFormatter(date.getDate())}/${dateFormatter(
                                date.getMonth() + 1,
                            )}/${date.getFullYear()}`,
                            temperature: res.data.main.temp,
                            visibility: res.data.visibility,
                            wind: res.data.wind.speed,
                            feelsLike: res.data.main.feels_like,
                            desc: res.data.weather[0].description,
                        },
                    ];
                });
            };

            navigator.geolocation.getCurrentPosition(function (position) {
                getApi(position.coords.latitude, position.coords.longitude);
            });
        } catch (err) {
            alert(err.message);
        }
    }, []);

    return (
        <>
            {weatherData.map((city, i) => {
                return (
                    <div key={i} className="weather-box">
                        <div className="weather-box-top">
                            <img src={sunny} alt="" />
                            <div className="weather-text">
                                <h1>{city.name}</h1>
                                <h2>
                                    {city.day} {city.dateFormat}
                                </h2>
                            </div>
                        </div>

                        <div className="weather-box-main">
                            <h1>
                                {Math.round(city.temperature)} <span>&#176;</span>
                            </h1>
                            <h2>{city.desc}</h2>
                        </div>

                        <div className="weather-box-footer">
                            <div className="weather-footer-left">
                                <div>Visibility: {city.visibility} m</div>
                                <div>
                                    Feels like: {Math.round(city.feelsLike)} <span>&#176;</span>
                                </div>
                            </div>
                            <div className="weather-footer-left">
                                <div>Wind: {city.wind} m</div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="weather-box">
                <button
                    disabled={weatherData.length < 3 ? false : true}
                    onClick={addLocationHandler}
                    className="add-location-button">
                    <img src={plus} alt="" />
                </button>
                <p>Add new location</p>
                <input
                    onChange={(event) => setCity(event.target.value)}
                    name="city"
                    type="text"
                    placeholder="City"
                    value={city}
                />
            </div>
        </>
    );
}

export default Weather;
