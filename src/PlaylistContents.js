import React, { Component } from 'react'
import { List, Header, Icon, Image } from 'semantic-ui-react'
import playlistIcon  from './assets/images/playlist_icon.png'

class PlaylistContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playlist = this.props.playlist || { playlistId: '', title: 'No Playlist Selected' }
    const contents = this.props.contents || [{ contentId: '', title: 'No content available', description: 'Nothing' }];

    return(
      <div>
        <Header as='h3' icon>
          <Image src={playlistIcon}/>
          <Header.Content>
            {playlist.title}
          </Header.Content>
        </Header>
        <List divided relaxed ordered animated>
          {contents.map(content => {
            return (
              <List.Item key={content.contentId}>
                <List.Icon name='video play' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>{content.title}</List.Header>
                  <List.Description as='a'>{content.description}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>

    )
  }
}

export default PlaylistContents
