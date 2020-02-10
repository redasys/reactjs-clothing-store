import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';

import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';

const CartDropdown = (cartItems) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {
            cartItems.map(item=>(
                <CartItem key={item.id} item={item} />
            ))
        }
        </div>
        <CustomButton >GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
