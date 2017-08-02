import React, { Component } from 'react';
import Rating from './rating';
import './movie-details.css';

export default class MovieDetails extends Component {

  render() {
    console.log(this.props.movie);
    let imagePath = "https://image.tmdb.org/t/p/w500/";
    imagePath += `${ this.props.movie.poster_path }`;
    let runtime = this.formatRuntime(`${ this.props.movie.runtime }`);
    let releaseDate = this.formatDate(`${ this.props.movie.release_date }`);
    let genres = this.formatGenres(this.props.movie.genres);
    let rating = this.formatRating(`${ this.props.movie.vote_average }`);
    let releaseYear = this.getYear(`${ this.props.movie.release_date }`);

    return (
      <div className="details-container row">
      <div className="col-md-1"></div>
        <img src={ imagePath } className="poster col-md-4" alt="Movie Poster" />
        <div className="movie-details col-md-8">
          <div className="movie-title">
            <h1>{ this.props.movie.title } ({ releaseYear })</h1>
          </div>
          <div className="movie-body">
            <div className="first-line"></div>
            <h5>Release Date: { releaseDate }</h5>
            <h5>Genres: { genres }</h5>
            <h5>Runtime: { runtime }</h5>
            <h5>Description: { this.props.movie.overview }</h5>
            <Rating rating={ rating } />
          </div>
        </div>
      </div>
    );
  }

  /* Format genres to display as a string (they come in as an array) */
  formatGenres(genres) {

    // Convert the object to an array, then get the names
    let genreList = Object.keys(genres).map(function (key) { return genres[key]; });
    let list = genreList.map(genre => " " + genre.name);

    return list.toString();
  }

  /* Format default date from YYYY-MM-DD to display month name, day, year for readability */
  formatDate(date) {

    date = new Date(date);
    if (!isNaN(date.getTime())) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                      'September', 'October', 'November', 'December'];
      let day = date.getDate().toString();
      let month = (date.getMonth() + 1).toString();

      return (months[month[0]] + ' ' + (day[1] ? day : '0' + day[0]) + ', ' + date.getFullYear());
    }
    return date;
  }

  /* Format default runtime from minutes to hours/minutes. Return the formatted string */
  formatRuntime(runtime) {

    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    runtime = hours + ((hours > 1) ? " Hours " : " Hour ") + minutes + " Minutes";

    return runtime;
  }

  /* Format rating as a percent to pass into the ratings component (multiply it by 25 to fit font size of unicode stars) */
  formatRating(rating) {

    rating = rating * 25;
    return rating;
  }

  /* Gets the year (for displaying in the title) */
  getYear(date) {
    date = new Date(date);
    if (!isNaN(date.getTime())) {
      return date.getFullYear();
    }
    return date;
  }
}
