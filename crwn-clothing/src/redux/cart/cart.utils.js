export const addItemToCart = (cartItems, item) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
        return cartItems.map(i =>
            i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
        );
    }

    return [...cartItems, { ...item, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, item) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
        return cartItems.map(i =>
            i.id === item.id
                ? { ...i, quantity: i.quantity - 1 }
                : i
        );
    }
    return cartItems.filter(x=>x.id!==item.id);
}
