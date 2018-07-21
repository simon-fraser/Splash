import React  from 'react';
import axios from 'axios';
import Weather from './Weather';
import Quote from './Quote';
import { OPEN_WEATHER_KEY } from './env';
import './Splash.css';

class Splash extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loaded: false,
            background: null,
            quote: null,
            weather: null
        }
    }

    // Run these before Mounting!
    componentWillMount() {
        const _ = this;
        const hours = 8;
        const now = new Date().getTime();
        const localstate = localStorage.getItem('splash$state');
        const setuptime = localStorage.getItem('splash$setup');
        
        // If storage load state from previous storage!
        if((localstate && setuptime) && ((now - setuptime) < (hours*60*60*1000))) {
            this.setState(JSON.parse(localstate));
        } else {
            // Run all the commands to generate splash page
            Promise.all([this.getBackground(), this.getWeather(), this.getQuote()]).then(responses => {
                _.setState({ 
                    background: responses[0],
                    weather: responses[1],
                    quote: responses[2],
                    loaded: true
                });
                localStorage.setItem('splash$state', JSON.stringify(this.state));
                localStorage.setItem('splash$setup', now);
            });
        }
    }

    // Get coordinates from browser
    getCoordinates = () => {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0
        }
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    // Query UnSplash for a nice background
    getBackground = () => {
        return axios.get('https://source.unsplash.com/random/1920x1080')
        .then(function (response) {
            if(response.status === 200) return response.request.responseURL;
            return {'error': 'no response'};
        })
        .catch(function (error) { return {'error': error} });
    }

    // Query QuotesAPI for a nice quote
    getQuote = () => {
        return axios.get('https://favqs.com/api/qotd')
        .then(function (response) {
            if(response.status === 200) {
                if(typeof response.data.quote !== 'undefined') {
                    return response.data.quote;
                }
            }
            return {'error': 'no response'};
        })
        .catch(function (error) { return {'error': error} });
    }

    // Query AccuWeather for local weather update
    getWeather = () => {
        return this.getCoordinates().then(function(resolve) {
            if(resolve.coords) {
                return axios.get(
                    'https://api.openweathermap.org/data/2.5/weather',
                    {
                        params: {
                            lat: resolve.coords.latitude,
                            lon: resolve.coords.longitude,
                            APPID: OPEN_WEATHER_KEY,
                            units: 'metric'
                        }
                    }
                )
                .then(function (response) {
                    if(response.status === 200) return response.data;
                    return {'error': 'no response'};
                })
                .catch(function (error) { return {'error': error} });
            }
        });
    }

    // Combine and display our splash
    render() {
        return <React.Fragment>
            { (this.state.loaded)?
                <div className="lander" style={{ backgroundImage: `url(${this.state.background})` }}>
                    
                    <div className="container">
                        <Weather weather={this.state.weather} />
                        <Quote quote={this.state.quote} />
                    </div>

                </div>
            :
                <div className="loading"><img src="/rolling.svg" alt="Loading" /></div> 
            }
        </React.Fragment>
    }
}

export default Splash
