import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPw: ''
    });
    
    const { displayName, email, password, confirmPw } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (password !== confirmPw) {
            alert("Passwords don't match")
            return;
        }

        signUpStart({ displayName, email, password });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCredentials({...userCredentials, [name]: value });
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I don't have an account</h2>
            <span>Sign up with your email address</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    label='USER NAME'
                    handleChange={handleChange} />
                <FormInput
                    type='email'
                    name='email'
                    label='EMAIL'
                    value={email}
                    handleChange={handleChange} />
                <FormInput
                    type='password'
                    name='password'
                    label='PASSWORD'
                    value={password}
                    handleChange={handleChange} />
                <FormInput
                    type='password'
                    name='confirmPw'
                    label='CONFIRM PASSWORD'
                    value={confirmPw}
                    handleChange={handleChange} />
                <CustomButton type='submit'>Sign-Up</CustomButton>
            </form>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});
export default connect(null, mapDispatchToProps)(SignUp);
