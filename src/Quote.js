import React from 'react';

class Quote extends React.Component {

    render() {
        if(this.props.quote == null) return null;

        return <div className="quotebox">
            <blockquote className="quote">
                <p>{this.props.quote.body}</p>
                <footer>{this.props.quote.author}</footer>
            </blockquote>
        </div>
    }
}

export default Quote;
