import React, { Component } from 'react';
import './rating.css';

export default class Rating extends Component {

  render() {
    let rating = this.props.rating;
    let style = {
      width: rating
    }

    return (
      <div>
        <div className="star-ratings-css">
          <div className="star-ratings-css-top" style={ style }>
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <div className="star-ratings-css-bottom">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
      </div>
    );
  }
}
