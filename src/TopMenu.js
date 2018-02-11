import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import menuToggle from './assets/images/menu_toggle.svg'

class TopMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: '' }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const user = this.props.user;

    return (
      <Menu>
        <Image as={Menu.Item} src={menuToggle} onClick={this.props.toggleVisibility} />
        <Menu.Menu position='right'>
          <Menu.Item>
            {user}
          </Menu.Item>
          <Menu.Item name='help' active={activeItem === 'help'} onClick={this.props.onSignOut}>
           Sign out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default TopMenu
