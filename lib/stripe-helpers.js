
// Because I'm not using the validatedItems function, the format for the cart details will not work for the line items field in the checkout session.
export const filterCartItems = (cartDetails) => {
    const validatedItems = [];
    for (const id in cartDetails) {
        const item = {
            price_data: {
                currency: cartDetails[id].currency,
                unit_amount: cartDetails[id].price,
                product_data: {
                    name: cartDetails[id].name,
                    ...cartDetails[id].product_data,
                },
                ...cartDetails[id].price_data,
            },
            quantity: cartDetails[id].quantity,
        };

        if (
            cartDetails[id].product_data &&
            typeof cartDetails[id].product_data.metadata === "object"
        ) {
            item.price_data.product_data.metadata = {
                ...item.price_data.product_data.metadata,
                ...cartDetails[id].product_data.metadata,
            };
        }

        if (
            typeof cartDetails[id].description === "string" &&
            cartDetails[id].description.length > 0
        )
            item.price_data.product_data.description =
                cartDetails[id].description;

        if (
            typeof cartDetails[id].image === "string" &&
            cartDetails[id].image.length > 0
        )
            item.price_data.product_data.images = [cartDetails[id].image];

        validatedItems.push(item);
    }
    
    return validatedItems;
}