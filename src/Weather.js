import React from 'react';
import './Weather.css'

class Weather extends React.Component {

    render() {
        
        // Build Description string
        const description = () => {
            let output = "";
            let weatherConditions = this.props.weather.weather;

            weatherConditions.forEach(key => {
                output += key.description.split(' ').map(x => x.substr(0, 1).toUpperCase() + x.substr(1, x.length-1)).join(' ') + " ";
            });
            return output;
        }

        // 
        const icon = () => {
            let icon = this.props.weather.weather[0].icon;
            let replace = icon.replace('d','').replace('n','');

            return replace;
        }

        if(this.props.weather == null) return null;

        return <div className="weather">
            <div className="weather-detail">
                <span className="weather-desc">{description()}</span>
                <span className="weather-temp">{Math.round(this.props.weather.main.temp)}<span className="c">&#176;C</span></span>
            </div>
            <figure className="weather-icon" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/weather/${icon()}.svg)` }}></figure>
            <span className="weather-area">{this.props.weather.name}</span>
        </div>
    }
}

export default Weather