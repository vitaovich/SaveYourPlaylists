import React, { Component } from 'react';
import playlistSearch from './GoogleApiUtils';
import querystring from 'querystring'

const API_KEY = 'AIzaSyADQZkj1blmWY2cTdbG2O4CR4zDfkch4K4'

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  getSearchResults() {
    console.log('url is this: ' + this.props.url);
    var parsedUrl = querystring.parse(this.props.url);
    playlistSearch(API_KEY, parsedUrl.list)
      .then(data => {
        console.log(data);
        this.setState({data: data});
      })
      .catch(error => console.error(error));
  }

  createVideo(item) {
    return {
      id: item.id,
      title: item.snippet.title,
    }
  }

  createResultList(video) {
    console.log(video);
    return (
      <li key={video.id}>
        {video.title}
      </li>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.url !== this.props.url) {
      this.getSearchResults();
    }
  }

  render() {
    const items = this.state.data.items;
    let results = null;
    console.log(items);
    if(items !== undefined && items.length > 0) {
      console.log('creating video list');
      let videos = items.map(this.createVideo);
      console.log(videos);
      results = videos.map(this.createResultList);
    }
    return(
      <div>
      <h1>Playlist:{this.props.url}</h1>
      <ul>{results}</ul>
      </div>
    );
  }

}

export default SearchResults;
