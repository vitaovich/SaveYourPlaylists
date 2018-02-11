import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import PlaylistItem from './PlaylistItem';
import { postPlaylist } from './ApiUtils';

/* global gapi */

class YoutubePlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {playlists : []}

    this.getYoutubePlaylists = this.getYoutubePlaylists.bind(this);
    this.handlePlaylistsList = this.handlePlaylistsList.bind(this);
  }

  getYoutubePlaylists() {
    let gapi = window.gapi;
    var request = gapi.client.youtube.playlists.list({
      mine: true,
      part: 'snippet, contentDetails',
      maxResults: '50'
    });
    request.execute(this.handlePlaylistsList);
  }

  handlePlaylistsList(response) {
    if(response.result) {
      const playlists = response.result.items.map((item) => {
        return {etag: item.etag,
                _id: item.id,
                title: item.snippet.localized.title,
                description: item.snippet.localized.description}
      });
      playlists.forEach(playlist => {
        postPlaylist(playlist)
        .then(data => {console.log(data)});
      })
      this.setState({playlists: response.result.items})
    }
  }

  componentDidMount() {
    gapi.client.load('youtube', 'v3', this.getYoutubePlaylists);
  }

  render() {
    const playlists = this.state.playlists;
    const list = playlists.map((playlist) =>
      <Menu.Item key={playlist.id}>
        <PlaylistItem id={playlist.id}
                  title={playlist.snippet.title}
                  onHandlePlaylistSelect={this.props.onHandlePlaylistSelect}/>
      </Menu.Item>
    );
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default YoutubePlaylists;
