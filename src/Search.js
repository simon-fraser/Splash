import React from 'react';
import './Search.css';

class Search extends React.Component {

    render() {
        return <div className="search">
            <form method="GET" action="https://duckduckgo.com/">
                <input className="search-input" type="search" name="q" placeholder="Search now..." ref="searchnow" autoFocus />
                <button type="submit" className="search-button" style={{ backgroundImage: 'url(./duckduckgo.svg)' }}></button>
            </form>
        </div>
    }
}

export default Search