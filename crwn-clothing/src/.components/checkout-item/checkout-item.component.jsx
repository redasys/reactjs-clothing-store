import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';
import { clearItem, addItem, removeItem } from '../../redux/cart/cart.actions';


const CheckoutItem = ({ item, clearItem, addItem, removeItem }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={item.imageUrl} alt='cart item' />
        </div>
        <div className='name'>
            <span>{item.name}</span>
        </div>
        <div className='quantity'>
            <div className='arrow'
                onClick={() => removeItem(item)}>&#10094;
            </div>
            <span className='value'>{item.quantity}</span>
            <div className='arrow'
                onClick={() => addItem(item)}>
                &#10095;
            </div>

        </div>
        <div className='price'>
            <span>{item.price * item.quantity}</span>
        </div>
        <div className='remove-button' onClick={() => clearItem(item)}>
            <span>&#10060;</span>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItem(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
