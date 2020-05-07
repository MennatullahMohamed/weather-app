import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import WeatherItem from "../components/weather-item";
import './styles.css'
import Geocode from "react-geocode";
const bgImage = require('../images/bg.jpg');
const API_KEY = 'AIzaSyCIPefnNjY6_6Q53dMWZAf84GtbtgfFYgM'
Geocode.setApiKey(API_KEY);

class MainSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            City: '',
            WeatherResult: '',
            WeatherIcon: null
        };
    }
    componentDidMount() {
        let that = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                response => {
                    if (response.results) {
                        const City = response.results[3].formatted_address;
                        that.setState({ City })
                        that.findWeather();
                    }
                },
                error => {
                    console.error(error);
                }
            );
        });
    }
    findWeather = async () => {
        if (this.state.City != '') {
            try {
                const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.City}&APPID=987947a25ba50bdfa3e4c33618ba6f42&units=metric`);
                const json = await res.json();
                if (json.weather) {
                    this.setState({ WeatherResult: json });
                    this.forceUpdate();
                }
                else {
                    alert("Make sure you're spelling right.")
                }
            } catch (err) {
                console.error('err', err);
            }
        }
        else {
            alert("Please enter a city name")
        }
    }
    render() {
        return (
            <Slider dots arrows={false}>
                <div className='container-div'>
                    <h1 className="intro-title">
                        Hello{'\n'}I'm{'\n'}Menna
                    </h1>
                    <img src={bgImage} style={{ width: '100%' }} />
                </div>
                <div className='container-div'>
                    <div>
                        <p className="title">Just type the city name</p>
                    </div>
                    <div>
                        <p className="sub-title">You must spelling correctly</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <input placeholder="For example cairo..."
                            onFocus={(e) => e.target.placeholder = ""}
                            onChange={(e) => this.setState({ City: e.target.value })}
                            onBlur={(e) => e.target.placeholder = "For example cairo..."}
                            className="search-input" />
                        <button className='find-button' onClick={() => this.findWeather()}>Find</button>
                    </div>
                    {this.state.WeatherResult && <WeatherItem WeatherResult={this.state.WeatherResult} />}
                </div>
            </Slider>
        );
    }
}

export default MainSlider;