import React from 'react';

import './checkout-item.styles.scss';


const CheckoutItem = ({ item }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={item.imageUrl} alt='cart item' />
        </div>
        <div className='name'>
            <span>{item.name}</span>
        </div>
        <div className='quantity'>
            <div><span>&#10094;</span>{item.quantity}<span>&#10095;</span></div>
        </div>
        <div className='price'>
            <span>{item.price * item.quantity}</span>
        </div>
        <div className='remove-button'>
            <span>&#10060;</span>
        </div>
    </div>
);

export default CheckoutItem;
