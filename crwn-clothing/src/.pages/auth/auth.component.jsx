import React from 'react';

import './auth.styles.scss';
import Login from '../../.components/login/login.component.jsx';
import SignUp from '../../.components/sign-up/sign-up.component';

const AuthPage = ({ currentUser }) => {
    return currentUser ?
        (<div className="auth">
            <h2>You are currenty logged in as {currentUser.displayName}</h2>
        </div>)
        : (<div className="auth">
            <Login></Login>
            <SignUp></SignUp>
        </div>)
}

export default AuthPage;