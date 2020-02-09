import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomePage from './.pages/Homepage.component/Homepage.component';
import ShopPage from './.pages/shop/shop.component';
import Header from './.components/header/header.component';
import AuthPage from './.pages/auth/auth.component';

import './App.css';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
  

  unsubscripeFromAuth = null;

  componentWillUnmount() {
    this.unsubscripeFromAuth();
  }

  componentDidMount() {

    const {setCurrentUser} = this.props; 
    this.unsubscripeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth);
      console.log(userAuth)
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/login' render={() => (
            <AuthPage />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch  => ({
  setCurrentUser: user => dispatch(setCurrentUser(user, ))
})

export default connect(null, mapDispatchToProps)(App);
