import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './.pages/homepage/Homepage.component';
import ShopPage from './.pages/shop/shop.component';
import Header from './.components/header/header.component';
import AuthPage from './.pages/auth/auth.component';

import './App.css';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './.pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';



class App extends React.Component {
  unsubscripeFromAuth = null;

  componentWillUnmount() {
    this.unsubscripeFromAuth();
  }

  componentDidMount() {

    const { checkUserSession } = this.props;
    checkUserSession();


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
          <Route
            exact
            path='/login'
            render={() => this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
                <AuthPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
