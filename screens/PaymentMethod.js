
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();


export default class PaymentMethod extends Component {


    state = { user: {}, address: '', addressDB: [], email: {} };

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {

            if (user != null) {
                this.setState({ user: user });
                this.setState({ email: user.email });
            }
        })

    }

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
                customerName: this.state.user.displayName,
                customerEmail: this.state.user.email,
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
                customerName: this.state.user.displayName,
                customerEmail: this.state.user.email,
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
            customerName: this.state.user.displayName,
            customerEmail: this.state.user.email,
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
        console.log("Card TotalAmount in PaymentMethod", this.props.route.params.TotalAmount)
        console.log("address in PaymentMethod", this.props.route.params.address)
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 15 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={styles.text}>Choose your Payment Method </Text>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("CardPayment", {
                                TotalAmount: this.props.route.params.TotalAmount,
                                clearCart: this.props.route.params.clearCart,
                                products: this.props.route.params.products,
                                address: this.props.route.params.address,
                                user: this.state.user
                            });
                        }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../assets/credit-card.png')} />


                                <View style={styles.textContainer}>
                                    <TouchableOpacity >
                                        <Text>

                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 20, color: "#800C69", fontWeight: 'bold', }}>
                                                    Credit Card </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            Alert.alert("Your Order is Completed and ready to deliver") &
                                this.props.navigation.navigate("Shops") &
                                this.props.route.params.clearCart() &
                                this.addOrder(this.props.route.params.products)
                        }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../assets/money1.png')} />

                                <View style={styles.textContainer}>
                                    <TouchableOpacity >
                                        <Text>
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 20, color: "#800C69", fontWeight: 'bold', }}>
                                                    Cash </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            // Alert.alert("Your Order is Completed and ready to deliver") &
                            // this.props.navigation.navigate("Wallet")
                            this.props.navigation.navigate("Wallet", {
                                TotalAmount: this.props.route.params.TotalAmount,
                                clearCart: this.props.route.params.clearCart,
                                products: this.props.route.params.products,
                                address: this.props.route.params.address
                            });
                        }}>
                            <View style={styles.container}>
                                <Image style={styles.image1} source={require('../assets/wallet3.png')} />

                                <View style={styles.textContainer}>
                                    <TouchableOpacity >
                                        <Text>
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 20, color: "#800C69", fontWeight: 'bold', }}>
                                                    My Wallet </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
//_onChange => form => console.log(form);
const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 220,
        marginBottom: 25,
        marginTop: 5,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '80%',
        height: '85%',
        justifyContent: 'center',
    },
    image1: {
        marginTop: 10,
        width: 220,
        height: 160,
        justifyContent: 'center',
    },

    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#800C69"
    },
    icon: {
        width: 35,
        height: 35,
        color: "#800C69"
    },
    logo: {
        marginTop: 50,
        height: "20%",
        // height: 400,
        width: "100%",
        // flex: 1,
        resizeMode: 'contain'
    },
});