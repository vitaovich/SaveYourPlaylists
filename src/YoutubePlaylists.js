import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import PlaylistItem from './PlaylistItem';
import { putPlaylist, postPlaylist, getChannelPlaylists } from './ApiUtils';
import { requestPlaylistsList } from './GoogleApiUtils';

/* global gapi */

class YoutubePlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {playlists : []}

    this.syncPlaylists = this.syncPlaylists.bind(this);
  }

  syncPlaylists(channelId) {
    console.log('Sync Playlist start!');
    const options = {part: 'id', channelId: channelId, maxResults: 50};

    const youtubeData = requestPlaylistsList(options)
    .then(response => response.result.items.map(item => item.id));

    const localData = getChannelPlaylists(channelId)
    .then(response => response.map(item => item._id));

    Promise.all([youtubeData, localData])
    .then(this.comparePlaylists)
    .then(this.updateLocalDB)
    .then(res => {
      console.log(res);
      getChannelPlaylists(channelId).then(
        response => this.setState({playlists: response})
      )
    })
  }

  updateLocalDB(changes) {
    console.log(changes);
    changes.forEach(change => {
      if(change.status === 'new') {
        console.log('Inserting playlist: ' + change._id);
        requestPlaylistsList({part: 'snippet', id: change._id})
        .then(res => {
          const playlists = res.result.items.map(item => {return {_id: item.id,
                                                                etag: item.etag,
                                                                title: item.snippet.title,
                                                                description: item.snippet.description,
                                                                channel: item.snippet.channelId
                                                              }});
          console.log('Posting playlist');
          console.log(playlists);
          playlists.forEach(playlist => {
            const promise = postPlaylist(playlist);
          });
        });
      } else {
        console.log('Removing playlist: ' + change._id );
      }
    })
  }

  comparePlaylists(res, rej) {
    const youtubePlaylists = res[0];
    const localPlaylists = res[1];
    let updatedList = []
    for(let i = 0; i < youtubePlaylists.length; i++) {
      let playlist;
      if(!localPlaylists.includes(youtubePlaylists[i])) {
        playlist = {_id: youtubePlaylists[i], status: 'new'};
        updatedList.push(playlist);
      }
    }
    for(let i = 0; i < localPlaylists.length; i++) {
      if(!youtubePlaylists.includes(localPlaylists[i])) {
        const playlist = {_id: localPlaylists[i], status: 'removed'};
        updatedList.push(playlist);
      }
    }
    return updatedList;
  }

  componentDidMount() {
    const channelId = this.props.channels[0];
    this.syncPlaylists(channelId);
  }

  render() {
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
