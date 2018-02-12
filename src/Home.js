import React, { Component } from 'react';
import Profile from './Profile';
import YoutubePlaylists from './YoutubePlaylists';
import SidebarLeftUncover from './SidebarLeftUncover';
import TopMenu from './TopMenu';
import PlaylistContents from './PlaylistContents';
import { requestVideoPlaylist } from './GoogleApiUtils';
import { putUser, postVideo } from './ApiUtils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {sidebarVisible: true, signInStatus: {isSignedIn: false}};

    this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);
    this.handleUserPlaylistsUpdate = this.handleUserPlaylistsUpdate.bind(this);
  }

  render() {
    const session = this.props.session;
    const user = session.user;
    const handleSignOut = session.handleSignOut;
    const sidebarVisible = this.state.sidebarVisible;
    const selectedPlaylist = this.state.selectedPlaylist;
    const contents = this.state.contents;

    return (
      <div>
        <TopMenu
          user={<Profile user={user} />}
          onSignOut={handleSignOut}
          toggleVisibility={this.handleToggleSideMenu}
        />
        <SidebarLeftUncover
          visible={sidebarVisible}
          options={<YoutubePlaylists
                    onHandleUserPlaylists={this.handleUserPlaylistsUpdate}
                    onHandlePlaylistSelect={this.handlePlaylistSelect}/>}
        >
          <PlaylistContents
            playlist={ selectedPlaylist }
            contents={ contents }
          />
        </SidebarLeftUncover>
      </div>
    );
  }

  handlePlaylistSelect(playlist) {
    this.setState({selectedPlaylist: playlist});
    const playlistId = playlist.playlistId;
    console.log(playlist);
    requestVideoPlaylist(playlistId, '', result => {
      console.log(result);
      const contents = result.items.map(item => {
        return { _id: item.snippet.resourceId.videoId, etag: item.etag, title: item.snippet.title, description: item.snippet.description };
      })
      const contentPromises = contents.map(content => {
        return postVideo(content);
      })
      Promise.all(contentPromises)
      .then( res => {
        console.log('Videos should be posted');
        console.log(res);
        const contents = res.map(content => content.video);
        this.setState({contents: contents});
      });
    });
  }

  handleUserPlaylistsUpdate(playlists) {
    let currentUser = this.props.session.user;
    currentUser.playlists = playlists;
    putUser(currentUser);
  }

  handleToggleSideMenu() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }
}

export default Home;
