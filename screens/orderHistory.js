import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
} from 'react-native-paper';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import { color } from 'react-native-reanimated';
var db = firebase.firestore();

export default class orderHistory extends Component {

    constructor() {
        super();
        this.docs = firebase.firestore().collection('Orders');
        this.state = {
            isLoading: true,
            orderDB: []
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
                let OrderInf;
                db.collection('Orders')
                    .where('customerEmail', '==', user.email)
                    .get()
                    .then((querySnapshot) => {
                        OrderInf = querySnapshot.docs.map(doc => doc.data());
                        console.log("orders", OrderInf)
                        this.setState({ orderDB: OrderInf });
                        console.log("user-orders", this.state.orderDB)
                    })
            }
        })

    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <Title>{`   
            User History`}</Title> */}

                <FlatList
                    data={this.state.orderDB}
                    renderItem={({ item }) =>

                   

                        <View style={styles.infoBoxWrapper}>

                            <View style={[styles.infoBox, {
                                borderColor: '#800C69',
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1
                            }]}>
                                <Title style={{
                                    color: "#38700F",
                                    padding: 5
                                }}>  {item.product_name} </Title>
                                <Caption style={{ color: "#800C69" }}>{item.product_provider}</Caption>
                            </View>

                            
                            <View style={[styles.infoBox, {
                                color: '#90EE90',
                                borderColor: '#800C69',
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1
                            }]}>
                                <Caption style={{ color: "#38700F", padding: 10 }}>
                                    {`Order date: `}{item.OrderDate}
                                    {`                    Price: `}{item.product_price}
                                    {`                                  Quantity: `}{item.product_quantity}

                                </Caption>
                            </View>

                        </View>











                    }
                />

            </SafeAreaView>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 45,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
