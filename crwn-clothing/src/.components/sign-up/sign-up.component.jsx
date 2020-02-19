import React from 'react';
import {connect} from 'react-redux'; 

import {signUpStart} from '../../redux/user/user.actions';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPw: ''
        }
    }    

    handleSubmit = async e =>{
        e.preventDefault();
        
        const {signUpStart} = this.props;
        const { displayName, email, password, confirmPw } = this.state;

        if(password!==confirmPw){
            alert("Passwords don't match")
            return;
        }

        signUpStart({displayName, email, password});

        
    }

    handleChange = e => {
        const { name, value} = e.target;
        this.setState({[name]:value});
    }

    

    render() {
        const { displayName, email, password, confirmPw } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign up with your email address</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        label='USER NAME'
                        handleChange={this.handleChange} />
                    <FormInput
                        type='email'
                        name='email'
                        label='EMAIL'
                        value={email}
                        handleChange={this.handleChange} />
                    <FormInput
                        type='password'
                        name='password'
                        label='PASSWORD'
                        value={password}
                        handleChange={this.handleChange} />
                    <FormInput
                        type='password'
                        name='confirmPw'
                        label='CONFIRM PASSWORD'
                        value={confirmPw}
                        handleChange={this.handleChange} />

                    <CustomButton type='submit'>Sign-Up</CustomButton>
                </form>
            </div>

        )
    }
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});
export default connect(null, mapDispatchToProps)(SignUp);
