import React, { Component } from 'react';

/* global gapi */

class YoutubePlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {playlists : []}

    this.getYoutubePlaylists = this.getYoutubePlaylists.bind(this);
    this.handlePlaylistsList = this.handlePlaylistsList.bind(this);
  }

  getYoutubePlaylists() {
    console.log('Fetching youtube playlists');
    let gapi = window.gapi;
    var request = gapi.client.youtube.playlists.list({
      mine: true,
      part: 'snippet, contentDetails',
      maxResults: '50'
    });
    request.execute(this.handlePlaylistsList);
  }

  handlePlaylistsList(response) {
    console.log(response.result);
    this.setState({playlists: response.result.items})
  }

  componentDidMount() {
    gapi.client.load('youtube', 'v3', this.getYoutubePlaylists);
  }



  render() {
    const playlists = this.state.playlists;
    const list = playlists.map((playlist) =>
      <Playlist key={playlist.id}
                id={playlist.id}
                title={playlist.snippet.title}/>
    );
    return (
      <ul>{list}</ul>
    );
  }
}

function Playlist(props) {
  const title = props.title;
  return (
    <li>
      {title}
    </li>
  );
}

export default YoutubePlaylists;
