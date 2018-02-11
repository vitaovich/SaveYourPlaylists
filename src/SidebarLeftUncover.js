import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Header } from 'semantic-ui-react'
import playlistIcon  from './assets/images/playlist_icon.png'

class SidebarLeftUncover extends Component {
  render() {
    const visible = this.props.visible;
    const sidebarOptions = this.props.options || <Menu.Item>No Playlists Found</Menu.Item>;

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='uncover' width='wide' visible={visible} icon='labeled' vertical>
          <Header as='h3' icon textAlign='center'>
            <Image src={playlistIcon} size='massive' />
            <Header.Content>
              Playlists
            </Header.Content>
          </Header>
          {sidebarOptions}
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic padded='very'>
            {this.props.children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default SidebarLeftUncover
