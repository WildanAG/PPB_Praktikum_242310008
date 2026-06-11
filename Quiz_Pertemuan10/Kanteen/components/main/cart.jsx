import React from 'react';
import CartItem from '../molecules/cartItem';
import Navbar from '../molecules/navbar';

const Cart = () => {
    return (
        <SafeAreaView>
            <CartItem />
            <Navbar />
        </SafeAreaView>
    );
}

export default Cart;
