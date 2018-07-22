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

        // 
        const icon = () => {
            let icon = this.props.weather.weather[0].icon;
            let replace = icon.replace('d','').replace('n','');

            return replace;
        }

        // Wind direction symbol with rotation
        const direction = () => {
            let degrees = this.props.weather.wind.deg;
            let rotate = (degrees - 45);
            let transform = `rotate(${rotate}deg)`;
            
            return <img src={`${process.env.PUBLIC_URL}/weather/direction.svg`} alt={`wind direction ${degrees}`} className="weather-wind" style={{ transform: transform}} />
        }

        // Windspeed calc to MPH
        const windspeed = () => {
            let metersSpeed = this.props.weather.wind.speed;
            let tomph = 2.2369;

            return Math.round((metersSpeed * tomph));
        }

        if(this.props.weather == null) return null;

        return <div className="weather">
            <figure className="weather-icon-box"><img src={`${process.env.PUBLIC_URL}/weather/${icon()}.svg`} alt={this.props.weather.weather[0].description} className="weather-icon" /></figure>
            <p className="weather-text">{description()}</p>
            <p className="weather-place">{this.props.weather.name}</p>
            <div className="weather-suplimentary">
                <p className="weather-temp">{Math.round(this.props.weather.main.temp)}&#176;C</p>
                <div>{direction()} {windspeed()} mph</div>
            </div>
        </div>
    }
}

export default Weather