import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomePage from './.pages/homepage/Homepage.component';
import ShopPage from './.pages/shop/shop.component';
import Header from './.components/header/header.component';
import AuthPage from './.pages/auth/auth.component';

import './App.css';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './.pages/checkout/checkout.component';


class App extends React.Component {
  unsubscripeFromAuth = null;

  componentWillUnmount() {
    this.unsubscripeFromAuth();
  }

  componentDidMount() {

    const { setCurrentUser } = this.props;
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
    });
  };
  
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/login' render={() => (this.props.currentUser ? <Redirect to='/' /> : <AuthPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
