import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { ProtectedRoute, ProtectedRouteProps } from '../components/PrivateRoute/PrivateRoute';

import { AppState } from '../store';
import { SystemState } from '../store/system/system.types';

import { thunkSignIn, signOut, userChanged, subsribeChanges } from '../store/system/system.actions';

import './App.scss';


function SignIn() {
  return <h2>SignIn</h2>;
}

function Explorer() {
  return <h2>Explorer</h2>;
}

interface AppProps {
  system: SystemState;
  thunkSignIn: Function;
  userChanged: Function;
  signOut: typeof signOut;
}

class App extends Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
    subsribeChanges(this.props.userChanged);
  }

  onSignIn = () => {
    this.props.thunkSignIn();
  }

  onSignOut = () => {
    this.props.signOut();
  }

  render() {
    const { signedIn, user } = this.props.system;
    const defaultProtectedRouteProps: ProtectedRouteProps = {
      isAuthenticated: this.props.system.signedIn || false,
      authenticationPath: '/signin/'
    };

    return (
      <div className="App">
        <p>Logged: {signedIn ? 'yes' : 'no'}</p>
        <p>{user ? user.name : ''}</p>

        <button onClick={this.onSignIn}>login</button>
        <button onClick={this.onSignOut}>logout</button>

        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/signin/">SignIn</Link>
                </li>
                <li>
                  <Link to="/explorer/">Explorer</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/signin/" component={SignIn} />
              <ProtectedRoute exact={true} {...defaultProtectedRouteProps} path="/explorer/" component={Explorer} />
              <Redirect from="/" to="/explorer/" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(mapStateToProps, { signOut, thunkSignIn, userChanged })(App);
