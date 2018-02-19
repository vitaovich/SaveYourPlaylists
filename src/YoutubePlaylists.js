import React, { Component } from 'react';
import { Menu, Header, Accordion } from 'semantic-ui-react'
import PlaylistItem from './PlaylistItem';
import { postPlaylist, getChannelPlaylists, syncPlaylists } from './ApiUtils';
import { requestPlaylistsList } from './GoogleApiUtils';

class YoutubePlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {channels: []}

    this.handleChannels = this.handleChannels.bind(this);
  }

  handleChannels(channels) {
    const asyncCalls = channels.map(channel => {
      console.log('Channel: ' + channel);
      return syncPlaylists(channel);
    });
    console.log('SYNCS');
    console.log(asyncCalls);
    Promise.all(asyncCalls)
    .then(res => {
      console.log('Completed syncing');
      console.log('Grabbing channels');
      console.log(res);
      let channelRequests = []
      channels.forEach(channel => {
        channelRequests.push(getChannelPlaylists(channel));
      });
      Promise.all(channelRequests)
      .then(channels => {
        console.log(channels);
        this.setState({channels: channels})
      })
    })
  }

  componentDidMount() {
    const channels = this.props.channels;
    console.log('Mounted youtubePlaylists');
    console.log(this.props.channels);
    this.handleChannels(channels)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Prev props');
    console.log(prevProps);
    console.log('Prev State');
    console.log(prevState);
    let outOfSync = false;
    const channels = this.props.channels;
    const prevChannels = prevState.channels.map(channel => channel.channelId);
    if(channels) {
      if(prevChannels) {
        channels.forEach(channel => {
          if(!prevChannels.includes(channel)) {
            outOfSync = true;
          }
        })
      }
    }
    if(outOfSync) {
      this.handleChannels(channels);
    }
  }

  render() {
    const channels = this.state.channels;
    const list = channels.map(channel =>
      <ChannelList key={channel.channelId} channelId={channel.channelId} playlists={channel.playlists} onHandlePlaylistSelect={this.props.onHandlePlaylistSelect}/>
    )
    return (
      <React.Fragment>
        <Header as='h2'>Youtube</Header>
        {list}
      </React.Fragment>
    );
  }
}

function ChannelList(props) {
  const channelId = props.channelId;
  const playlists = props.playlists;
  const playlistItems = playlists.map(playlist =>
    <Menu.Item key={playlist._id}>
      <PlaylistItem id={playlist._id}
                title={playlist.title}
                onHandlePlaylistSelect={props.onHandlePlaylistSelect}/>
    </Menu.Item>
  );
  return (
    <div>
      <Header as='h4'>{channelId}</Header>
      {playlistItems}
    </div>
  );
}

export default YoutubePlaylists;
