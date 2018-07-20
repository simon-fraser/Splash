import React from 'react';

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

        const direction = () => {
            let degrees = this.props.weather.wind.deg;
            let rotate = (degrees - 45);
            let transform = `rotate(${rotate}deg)`;
            
            return <img src="/weather/direction.svg" alt={`wind direction ${degrees}`} className="weather-wind" style={{ transform: transform}} />
        }

        if(this.props.weather == null) return null;

        return <div className="weather">
            <figure className="weather-icon-box"><img src={`/weather/${this.props.weather.weather[0].icon}.svg`} alt={this.props.weather.weather[0].description} className="weather-icon" /></figure>
            <p className="weather-text">{description()}</p>

            <div className="weather-suplimentary">
                <p className="weather-temp">Feels like {Math.round(this.props.weather.main.temp)}&#176;C</p>
                <div>{direction()} {Math.round(this.props.weather.wind.speed)} m/s</div>
            </div>
        </div>
    }
}

export default Weather