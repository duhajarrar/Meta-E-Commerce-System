import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeApp from "./StripeApp";
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default class CardPayment extends Component{
    render() {
        return (
            <StripeProvider publishableKey="pk_test_51KkE0nKp6AqW7tekVsUktEjRVxORKt0abudPefXwCYRpYHsEJo6yD7abWCWRqb2KS7Vg3VCEsIM9BtO4D28xtWp600UDl17oRV">
              <StripeApp />
            </StripeProvider>
        );
    }
}
//_onChange => form => console.log(form);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});