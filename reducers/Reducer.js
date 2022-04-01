const initialState = {
    products: [],
    total: 0
}


const Reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'Clear_Cart':
            return {
                products: [],
                total: 0
            };

        case 'ADD_TO_CART':
            let aNewProducts = [...state.products, action.payload];
            let aNewTotal = 0;

            const newArray = [];
            aNewProducts.forEach(obj => {
                if (!newArray.some(o => o.key === obj.key)) {
                    newArray.push({ ...obj })
                }

            });

            newArray.forEach((product) => {
                // aNewTotal += product.price
                if (product.key == action.payload.key) {
                    product.quantity += 1
                }
                aNewTotal += (product.price * product.quantity)
                // aNewTotal += product.price
            });

            return {
                products: newArray,
                total: aNewTotal
            };

        case 'REMOVE_FROM_CART':
            // return state.filter(cartItem => cartItem.id !== action.payload.id)
            const rNewProducts = state.products.filter((p) =>
                p.key !== action.payload.key
            );
            let rNewTotal = 0;
            rNewProducts.forEach((product) => {
                rNewTotal += (product.price * product.quantity)
                // product.quantity += 1
            });
            // rNewProducts.quantity = 0
            return {
                products: rNewProducts,
                total: rNewTotal
            };


        case 'Plus_Quantity':

            let aNewProducts1 = [...state.products, action.payload];
            let aNewTotal1 = 0;

            const newArray1 = [];
            aNewProducts1.forEach(obj => {
                if (!newArray1.some(o => o.key === obj.key)) {
                    newArray1.push({ ...obj })
                }

            });

            newArray1.forEach((product) => {
                // aNewTotal += product.price
                if (product.key == action.payload.key) {
                    product.quantity += 1
                }
                aNewTotal1 += (product.price * product.quantity)
                // aNewTotal += product.price
            });

            return {
                products: newArray1,
                total: aNewTotal1
            };

        case 'Minus_Quantity':
            if (action.payload.quantity > 1) {
                let aNewProducts2 = [...state.products, action.payload];
                let aNewTotal2 = 0;

                const newArray2 = [];
                aNewProducts2.forEach(obj => {
                    if (!newArray2.some(o => o.key === obj.key)) {
                        newArray2.push({ ...obj })
                    }

                });

                newArray2.forEach((product) => {
                    // aNewTotal += product.price
                    if (product.key == action.payload.key) {
                        product.quantity -= 1
                    }
                    aNewTotal2 += (product.price * product.quantity)
                    // aNewTotal += product.price
                });

                return {
                    products: newArray2,
                    total: aNewTotal2
                };

            }

    }

    return state
}

export default Reducer

