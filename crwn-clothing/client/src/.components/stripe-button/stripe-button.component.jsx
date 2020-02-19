import React from 'react';
import {connect} from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import './stripe-button.styles.scss';
import { emptyCart } from '../../redux/cart/cart.actions';


const StripeButton = ({price, emptyCart}) => {
    // stripe wants the $ amt in pennies...kooky!
    const stripePrice = price * 100;
    const pKey = 'pk_test_gz4FauazR3pXgRLXqJvIThFu0009jqfnKN';

    const onToken = token => {
        console.log(token);
        axios({
            url: 'payment',
            method: 'POST',
            data:{
                amount: stripePrice,
                token
            }
        }).then(response=>{
            alert('Payment successful');
            emptyCart();
        }).catch(err=>{
            console.log(err);
            alert('There was an issue with your payment. Please use the test CC#.');
        }) 
    }

    return (
        <StripeCheckout
        label='Pay with Card'
        name="CRWN Clothing, LLC"
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Today's total: $${price}`}
        amount={stripePrice}
        panelLabel='Checkout'
        token={onToken}
        stripeKey={pKey}
        />
    )
};

const mapDispatchToProps = dispatch =>({
    emptyCart: () => dispatch(emptyCart())
});

export default connect(null, mapDispatchToProps)(StripeButton);
