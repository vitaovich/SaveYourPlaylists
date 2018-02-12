import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {session: {isAuthenticated: false}}

    this.handleSession = this.handleSession.bind(this);
  }

  render() {
    const session = this.state.session;
    return (
        <Router>
          <div>
            <Route path="/login"
                  render={routeProps => <Login {...routeProps}
                                        redirectToReferrer={session.isAuthenticated}
                                        onHandleSignIn={this.handleSession}/>}
            />
            <PrivateRoute exact path='/' component={Home} redirectTo='/login' session={session}/>
          </div>
        </Router>
    );
  }

  handleSession(session) {
    // Is Getting called three times
    // console.log('User Session');
    // console.log(session);
    this.setState({ session: session });
  }
}

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
return (
  <Route {...rest} render={routeProps => {
    return rest.session.isAuthenticated ? (
      renderMergedProps(component, routeProps, rest)
    ) : (
      <Redirect to={{
        pathname: redirectTo,
        state: { from: routeProps.location }
      }}/>
    );
  }}/>
);
};

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

export default App;
