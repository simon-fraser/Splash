import React  from 'react';
import base64Img from 'base64-img-promise';
import Search from './Search';
import Weather from './Weather';
import { OPEN_WEATHER_KEY } from './env';
import './Splash.css';

/* eslint-disable no-restricted-globals */
// Required for screen width

class Splash extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loaded: false,
            backgroundSize: null,
            background: null,
            weather: null
        }
    }

    // Run these before Mounting!
    componentWillMount() {
        const _ = this;
        const hours = 6;
        const now = new Date().getTime();
        const localstate = localStorage.getItem('splash$state');
        const setuptime = localStorage.getItem('splash$setup');

        // Get best resolution based on screen
        let screenWidth = screen.width;
        let resolution = [];
        resolution[0] = screenWidth;
        resolution[1] = (screenWidth / 1.6);

        // High Quality Multiplier
        if(window.devicePixelRatio > 1) {
            resolution[0] = (resolution[0]*2)
            resolution[1] = (resolution[1]*2)
        }
        this.setState({ backgroundSize: resolution.join('x') })

        // console.log((now - setuptime))
        // console.log((hours*60*60*1000))
        // console.log((localstate !== null && setuptime !== null))
        // console.log(((now - setuptime) < (hours*60*60*1000)))

        // If storage load state from previous storage!
        if((localstate !== null && setuptime !== null) && ((now - setuptime) < (hours*60*60*1000))) {
            this.setState(JSON.parse(localstate));
        } else {
            // Run all the commands to generate splash page
            Promise.all([this.getWeather(), this.get64Background()]).then(responses => {
                _.setState({
                    weather: responses[0],
                    background: responses[1],
                    loaded: true
                });
                localStorage.setItem('splash$state', JSON.stringify(this.state))
                localStorage.setItem('splash$setup', now)
            });
        }
    }

    // Get coordinates from browser
    getCoordinates() {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0
        }

        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    // Query UnSplash for a nice background, return as a base64 image string
    get64Background() {
        return base64Img.requestBase64(`https://source.unsplash.com/random/${this.state.backgroundSize}`)
        .then(function({res, data}) {
            return data
        })
        .catch(function (error) { return {'error': error} });
    }

    // Query AccuWeather for local weather update
    getWeather() {
        return this.getCoordinates().then(function(resolve) {
            if(resolve.coords) {
                return fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${OPEN_WEATHER_KEY}&lat=${resolve.coords.latitude}&lon=${resolve.coords.longitude}&units=metric`)
                .then(blob => {
                    if(blob.status === 200) return blob.json()
                })
                .then(data => {return data})
                .catch(function (error) { return {'error': error} });
            }
        });
    }

    // Combine and display our splash
    render() {

        return <React.Fragment>
            { (this.state.loaded) ?
                <div className="lander" style={{ backgroundImage:`url(${this.state.background})` }}>
                    <div className="container">
                        <Search />
                        <Weather weather={this.state.weather} />
                    </div>
                </div>
            :
                <div className="loading"><img src={`${process.env.PUBLIC_URL}/rolling.svg`} alt="Loading" /></div>
            }
        </React.Fragment>
    }
}

export default Splash
