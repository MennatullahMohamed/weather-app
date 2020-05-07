import React, { Component } from 'react'
import './styles.css'
export default class WeatherItem extends Component {
    render() {
        const { WeatherResult } = this.props;
        return (
            <div className="main-div">
                <p className="weather-text" style={{ fontSize: '30px' }}>{WeatherResult.name}, {WeatherResult.sys.country}</p>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${WeatherResult.weather[0].icon}.png`} />
                <p className="weather-text" style={{ fontSize: '30px' }}>{WeatherResult.weather[0].main}</p>
                <p className="weather-text" style={{ fontSize: '30px' }}>{WeatherResult.main.temp}{'\u00b0'}</p>
                <p className="weather-text">{WeatherResult.main.temp_max}{'\u00b0'} &nbsp; {WeatherResult.main.temp_min}{'\u00b0'}</p>
                <p className="weather-text">{WeatherResult.weather[0].description}</p>
            </div>
        )
    }
}
