import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { Grid, Header, Segment } from 'semantic-ui-react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { redirectToReferrer: false }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.props;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='login'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
              Log-in to your account
            </Header>
              <Segment>
                <GoogleSignIn onHandleSignIn={this.props.onHandleSignIn}/>
              </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
