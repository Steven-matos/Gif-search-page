import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }

    componentDidMount(){
      this.performSearch();
    }

    performSearch = (query = 'Shiba') => {
      axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=A1f0ssS44F7XZuxQyGQww1FEkGvqGVlD`)
        .then(response => {
            this.setState({
              gifs: response.data.data,
              loading: false
            });
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });

    }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.loading)
              ? <p className="loading">Loading...</p>
              : <GifList data={this.state.gifs}/>
          }
        </div>
      </div>
    );
  }
}
