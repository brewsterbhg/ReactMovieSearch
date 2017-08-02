import React, { Component } from 'react';
import MovieDetails from '../components/movie-details'
import AutoComplete from 'material-ui/AutoComplete';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './home.css';

const API_KEY = process.env.REACT_APP_API_KEY;

class Home extends Component {

  componentDidMount() {
    injectTapEventPlugin();
  }

  constructor(props) {
    super(props)

    // Bind functions
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);

    // Set state (dataSource will be for AutoComplete search, input value refers to search value)
    this.state = {
      dataSource: [],
      inputValue: '',
      movieId: 879,
      movie: null
    }
  }

  render() {
    let title = null;
    if (this.state.movie == null) {
      title = <div></div>
    }
    else {
      title = <MovieDetails movie={ this.state.movie } />
    }
    return (
      <div className="container">
        <div className="search-bar"></div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AutoComplete
            filter={ AutoComplete.noFilter }
            dataSource={ this.state.dataSource }
            dataSourceConfig={ {text: 'title', value: 'id'}  }
            onNewRequest={ this.onNewRequest }
            onUpdateInput={ this.onUpdateInput }
            floatingLabelText="Search For Movie"
            fullWidth={true}
            />
          </MuiThemeProvider>
          <div className="search-bar"></div>
          { title }
      </div>
    );
  }

  /* Function called when search value changes. Handles setting new state, and setting up the search querystring */
  onUpdateInput(inputValue) {
    this.setState({ inputValue,
    }, function () {
      if (this.state.inputValue === '') {
        return;
      }
      // Create the URL
      let searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
      let appendMovie = '&query=' + this.state.inputValue;
      let url = searchURL + `${ API_KEY }` + appendMovie;
      // Do 1 page to limit results to 20
      url += '?&page=1';

      this.searchMovies(url);
    });
  }

  /* Fires the search request. Sets the dataSource state to the first 5 results (to reduce clutter) */
  searchMovies(url) {
    // Do the fetch
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0)
        {
          // Grab the first five results and set the state. This will call the search bar AutoComplete
          let results = data.results.slice(0, 5);
          results['title'] = results.map(result => result['title'] = result.title + " (" + this.getYear(result.release_date) + ")");
          this.setState({ dataSource: results });
        }
      }).catch((err) => console.log('Error: ' + err));
  }

  /* Gets the year (for displaying in the search string) */
  getYear(date) {
    date = new Date(date);
    if (!isNaN(date.getTime())) {
      return date.getFullYear();
    }
    return date;
  }

  /* After getting the movie id, grab the movie as an object */
  getMovieById(id) {
    let searchURL = 'https://api.themoviedb.org/3/movie/';
    searchURL += `${ this.state.movieId }`;
    searchURL += '?&api_key=';
    searchURL += `${ API_KEY }`;
    this.fetchMovieFromAPI(searchURL);
  }

  fetchMovieFromAPI(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movie: data,
        }, function () {

        });
      }).catch((err) => console.log('Error: ' + err));
  }

  /* This function handles when the user selects an item from the search bar */
  onNewRequest(chosenRequest, index) {
    this.setState({
      movieId: chosenRequest.id
    }, function () {
      this.getMovieById(this.state.movieId);
    });
  }
}

export default Home;
