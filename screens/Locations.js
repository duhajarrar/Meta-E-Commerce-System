import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
} from 'react-native-paper';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import { color } from 'react-native-reanimated';
var db = firebase.firestore();

export default class Locations extends Component {
    state = { user: {}, recipientName: {}, recipientPhone: {}, recipientEmail: {}, city: {}, country: {}, street: {}, moreDescription: {} };
    constructor() {
        super();
        this.docs = firebase.firestore().collection('usersAddresses');
        this.state = {
            userData: {},
            isLoading: true,
            addressDB: [],
            // id:{}
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getAddressDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getAddressDBData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({ userData: user });
                let AddressInf;
                let idDoc;
                db.collection('usersAddresses')
                    .where('email', '==', user.email)
                    .get()
                    .then((querySnapshot) => {
                        AddressInf = querySnapshot.docs.map(doc => doc);
                        // idDoc = querySnapshot.docs.map(doc => doc.id);
                        // console.log("address", AddressInf)
                        this.setState({ addressDB: AddressInf });
                        // this.setState({ id: idDoc });
                        // console.log("user-address", this.state.addressDB)
                    })
            }
        })

    }


    deleteAddress(id) {
        db.collection('usersAddresses')
            .doc(id).delete()
            .catch(function (error) {
                console.error("Error deleting document: ", error);
            });
    }

    goToEdit(item) {
        this.props.navigation.navigate("editAddress",
            {
                itemData: item.data(),
                itemId: item.id,
                city: item.data().city,
                country: item.data().country,
                email: item.data().email,
                moreDescription:item.data().moreDescription,
                recipientEmail: item.data().recipientEmail,
                recipientName: item.data().recipientName,
                recipientPhone: item.data().recipientPhone,
                street:item.data().street,

            })
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginLeft: 30 }}>
                <FlatList
                    data={this.state.addressDB}
                    renderItem={({ item }) =>

                        <View style={{ marginTop: 20 }}>
                            {/* <Text>{item.id}</Text> */}
                            <View>
                                <Text style={{ fontSize: 20, color: "#800C69", fontWeight: "bold" }}>
                                    Address
                                </Text>
                            </View>

                            <View style={{ paddingLeft: 60 }}>
                                <Text style={{ fontSize: 15 }}>
                                    <Text style={{ fontWeight: "bold" }}>Country: </Text>
                                    {item.data().country}
                                </Text>

                                <Text style={{ fontSize: 15 }}>
                                    <Text style={{ fontWeight: "bold" }}>City: </Text>{item.data().city}
                                </Text>

                                <Text style={{ fontSize: 15 }}>
                                    <Text style={{ fontWeight: "bold" }}>Street: </Text>{item.data().street}
                                </Text>


                                <Text style={{ fontSize: 15 }}>
                                    <Text style={{ fontWeight: "bold" }}>More info: </Text>{item.data().moreDescription}
                                </Text>


                            </View>
                            <View style={{ flex: 1, flexDirection: "row", marginLeft: 50 }}>
                                <TouchableOpacity style={styles.buttonContainer1}
                                    onPress={() => {
                                        console.log(item.data(), "****************************,", item.data().city) &
                                            this.goToEdit(item);
                                    }}
                                >
                                    <Text style={{
                                        color: "white",
                                        // padding: 2,
                                        fontSize: 15
                                    }}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonContainer1}
                                    onPress={() => { this.deleteAddress(item.id) & Alert.alert('Address deleted') }}
                                >
                                    <Text style={{
                                        color: "white",
                                        // padding: 2,
                                        fontSize: 15
                                    }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    marginTop: 10,
                                    marginRight: 30,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </View>

                    }
                />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { this.props.navigation.navigate("setLocation", { userData: this.state.userData }) }}
                >
                    <Text style={{
                        color: "white",
                        padding: 5,
                        fontSize: 18
                    }}>Add another Address</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        // marginBottom: 50,
        marginLeft: 50,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white'
    },
    buttonContainer1: {
        // marginBottom: 50,
        marginLeft: 5,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        width: 90,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white'
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