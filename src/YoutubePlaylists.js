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
      const playlistPromises = playlists.map(playlist => {
        return postPlaylist(playlist);
      })
      Promise.all(playlistPromises)
      .then(result => {
        const playlists = result.map(res => res.playlist);
        const playlistIds = result.map(res => res.playlist._id);
        this.props.onHandleUserPlaylists(playlistIds);
        console.log(playlists);
        this.setState({ playlists: playlists });
      });
    }
  }

  componentDidMount() {
    gapi.client.load('youtube', 'v3', this.getYoutubePlaylists);
  }

  render() {
    console.log(this.props.channels);
    const playlists = this.state.playlists;
    const list = playlists.map((playlist) =>
      <Menu.Item key={playlist._id}>
        <PlaylistItem id={playlist._id}
                  title={playlist.title}
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
