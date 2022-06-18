import { StripeProvider } from "@stripe/stripe-react-native";
import StripeApp from "./StripeApp";
import React, { Component } from "react";
import {
    StyleSheet
} from "react-native";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();
export default class CardPayment extends Component {


    getCurrentDate() {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }



    addOrder(orders) {
        this.addPendingOrders(orders);
        orders.forEach((obj) => {
            db.collection("Orders").add({
                customerName: this.props.route.params.user.displayName,
                customerEmail: this.props.route.params.user.email,
                OrderDate: this.getCurrentDate(),
                OrderTimestamp: new Date().valueOf(),
                product_name: obj.name,
                product_provider: obj.provider,
                product_price: obj.price,
                product_image: obj.image,
                product_quantity: obj.quantity,
                address: this.props.route.params.address

            });
            db.collection("OrdersCheckedOut").add({
                customerName: this.props.route.params.user.displayName,
                customerEmail: this.props.route.params.user.email,
                OrderDate: this.getCurrentDate(),
                product_name: obj.name,
                product_provider: obj.provider,
                product_price: obj.price,
                product_image: obj.image,
                product_quantity: obj.quantity,
                address: this.props.route.params.address
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    addPendingOrders(orders) {
        orders.forEach(obj => {
            obj['itemStatus'] = "in preparation";
        });

        console.log("ooooooooooooo", orders);
        db.collection("PendingOrders").add({
            id: db.collection('PendingOrders').doc().id,
            customerName: this.props.route.params.user.displayName,
            customerEmail: this.props.route.params.user.email,
            OrderDate: this.getCurrentDate(),
            OrderTimestamp: new Date().valueOf(),
            address: this.props.route.params.address,
            TotalPrice: this.props.route.params.TotalAmount,
            OrderProducts: orders,
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }

    render() {
        console.log("CArd TotalAmount}", this.props.route.params.TotalAmount)
        this.addOrder(this.props.route.params.products);
        return (
            <StripeProvider publishableKey="pk_test_51KkE0nKp6AqW7tekVsUktEjRVxORKt0abudPefXwCYRpYHsEJo6yD7abWCWRqb2KS7Vg3VCEsIM9BtO4D28xtWp600UDl17oRV">
                <StripeApp
                    TotalAmount={this.props.route.params.TotalAmount}
                />
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