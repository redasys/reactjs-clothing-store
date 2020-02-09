import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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

  componentWillUnmount() {
    this.unsubscripeFromAuth();
  }

  componentDidMount() {
    this.unsubscripeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
      console.log(userAuth)
    });
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/login' render={() => (
            <AuthPage currentUser={this.state.currentUser} />
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
