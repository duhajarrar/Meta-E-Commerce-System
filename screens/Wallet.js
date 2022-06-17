// import * as React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, Dimensions,Alert } from 'react-native';
import React, { Component } from 'react';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();

export default class Wallet extends Component {

    constructor() {
        super();
        this.docs = firebase.firestore().collection('Wallet')
        this.state = {
            isLoading: true,
            totalBalance: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getorderDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getorderDBData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({ email: user.email });
                this.setState({ user: user });
                let wallet;
                db.collection('Wallet')
                    .where('userEmail', '==', user.email)
                    .get()
                    .then((querySnapshot) => {
                        wallet = querySnapshot.docs.map(doc => doc.data());
                        console.log("wallet", wallet)
                        this.setState({ totalBalance: wallet[0].TotalMoney });
                        console.log("this.state.totalBalance", this.state.totalBalance)
                    })
            }
        })

    }

    PayOrder(TotalAmount) {

        let total = this.state.totalBalance - TotalAmount;
        console.log("totall",total)
        if (total >= 0) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    firebase.firestore()
                        .collection("Wallet").where('userEmail', '==', user.email)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                doc.ref.update({ TotalMoney: total });
                                Alert.alert("Payment Successful");
                            });
                        })
                      
                }
            })
        } else {
            Alert.alert("You Dont Have Enough Balance");
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>


                <TouchableOpacity
                // onPress={() => { this.props.navigation.navigate("pageOne"); }}
                >

                    <View style={styles.container}>

                        <View style={{ paddingLeft: 20, paddingTop: 20, flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../assets/wallet1.png')} />
                            <Text style={{ fontSize: 16, color: "#800C69", fontWeight: 'bold', paddingTop: 35 }}>{" "}Total Wallet Balance</Text>
                        </View>

                        <TouchableOpacity style={[styles.card, { backgroundColor: 'white', }]} >
                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                {this.state.totalBalance}{" ₪"} </Text>
                        </TouchableOpacity>

                    </View>

                    {this.props.route.params.TotalAmount &&
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    this.PayOrder(this.props.route.params.TotalAmount);
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        padding: 5,
                                        fontSize: 18,
                                    }}
                                >
                                    Pay Your Order
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerbar: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    filters:
    {
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 5,
        justifyContent: "space-between"
    },
    footer: {
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 0,
        backgroundColor: "#fff",
        paddingHorizontal: 25,
        paddingTop: 20
    },
    container: {
        width: 350,
        height: 270,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },
    separator: {
        height: 2,
        backgroundColor: "#800C69"
    },
    icon: {
        width: 75,
        height: 75,
    },
    card: {
        shadowColor: '#474747',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 20,
        marginHorizontal: 120,
        backgroundColor: "#e2e2e2",
        //flexBasis: '42%',
        width: 120,
        height: 115,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonContainer: {
        // marginBottom: 50,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white',
        alignItems: "center", justifyContent: "center"
    },

});