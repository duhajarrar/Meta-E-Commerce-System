
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import CartProducts from '../components/CartPorducts'
import { connect } from 'react-redux'

class Cart extends Component {


    render() {
        console.log(this.props.cartItems.products)
        return (
            <View style={styles.container}>
                {this.props.cartItems.products.length > 0 ?
                    <CartProducts
                        onPress={this.props.removeItem}
                        onPressPlus={this.props.plusQantity}
                        onPressMinus={this.props.minusQantity}
                        onPressClearCart={this.props.clearCart}
                        products={this.props.cartItems}
                        navigation={this.props.navigation}
                        TotalAmount={this.props.cartItems.total}
                        ButtonTitle="Remove" />
                    : <Text>No items in your cart</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        plusQantity: (product) => dispatch({ type: 'Plus_Quantity', payload: product }),
        minusQantity: (product) => dispatch({ type: 'Minus_Quantity', payload: product }),
        clearCart: () => dispatch({ type: 'Clear_Cart' })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)
    (Cart);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

