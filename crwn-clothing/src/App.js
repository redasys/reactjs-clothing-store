import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import './App.css';

import HomePage from './.pages/Homepage.component/Homepage.component';
import ShopPage from './.pages/shop/shop.component';
import Header from './.components/header/header.component';
import AuthPage from './.pages/auth/auth.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscripeFromAuth = null;

  componentWillUnmount(){
    this.unsubscripeFromAuth();
  }

  componentDidMount() {
    this.unsubscripeFromAuth = auth.onAuthStateChanged(user=> {
      console.log(user);
      this.setState({currentUser: user});
    })
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/login' component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
