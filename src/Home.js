import React, { Component } from 'react';
import Profile from './Profile';
import YoutubePlaylists from './YoutubePlaylists';
import SidebarLeftUncover from './SidebarLeftUncover';
import TopMenu from './TopMenu';
import PlaylistContents from './PlaylistContents';
import { requestVideoPlaylist, requestMineChannel } from './GoogleApiUtils';
import { putUser, postVideo, getUser } from './ApiUtils';
import { Button, Icon } from 'semantic-ui-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {sidebarVisible: true, signInStatus: {isSignedIn: false}};

    this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);
    this.handleUserPlaylistsUpdate = this.handleUserPlaylistsUpdate.bind(this);
    this.handleAddChannel = this.handleAddChannel.bind(this);
  }

  render() {
    const session = this.props.session;
    const user = session.user;
    const handleSignOut = session.handleSignOut;
    const sidebarVisible = this.state.sidebarVisible;
    const selectedPlaylist = this.state.selectedPlaylist;
    const contents = this.state.contents;
    const channels = user.channels;
    return (
      <div>
        <TopMenu
          user={<Profile user={user} />}
          onSignOut={handleSignOut}
          toggleVisibility={this.handleToggleSideMenu}
        />
        <SidebarLeftUncover
          visible={sidebarVisible}
          options={ <div>
            <Button color='youtube' onClick={this.handleAddChannel}>
              <Icon name='youtube' /> YouTube
            </Button>
            <YoutubePlaylists
            channels={channels}
            onHandleUserPlaylists={this.handleUserPlaylistsUpdate}
            onHandlePlaylistSelect={this.handlePlaylistSelect}/>
                    </div>
                  }
        >
          <PlaylistContents
            playlist={ selectedPlaylist }
            contents={ contents }
          />
        </SidebarLeftUncover>
      </div>
    );
  }

  handleAddChannel() {
    console.log('Adding channel');
    requestMineChannel().then(res => {
      const channelId = res.result.items[0].id;
      let user = this.props.session.user;
      if(!user.channels.includes(channelId)) {
        user.channels.push(channelId);
        putUser(user).then( res => {
          const newUser = res.user;
          if(newUser) {
            this.props.updateUser(newUser);
          } else {
            //user didnt successfully update
          }
        });
      }
      // channel already exists
    })
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
