 import React from 'react';

 import './auth.styles.scss';
import Login from '../../.components/login/login.component.jsx';
import SignUp from '../../.components/sign-up/sign-up.component';

 const AuthPage = () => (
     <div className="auth">
        <Login></Login>
        <SignUp></SignUp>
     </div>
 )

 export default AuthPage;