import React from 'react';
import './Search.css';

class Search extends React.Component {
    
    render() {
        return <div className="search">
            <form method="GET" action="https://www.google.co.uk/search">
                <input className="search-input" type="search" name="q" placeholder="Search now..." ref="searchnow" autoFocus />
                <button type="submit" className="search-button">
                    <img src={`${process.env.PUBLIC_URL}/search.svg`} alt="search" />
                </button>
            </form>
        </div>
    }
}

export default Search