import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

const StripeButton = ({price}) => {
    // stripe wants the $ amt in pennies...kooky!
    const stripePrice = price * 100;
    const pKey = 'pk_test_gz4FauazR3pXgRLXqJvIThFu0009jqfnKN';

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

export default StripeButton;
