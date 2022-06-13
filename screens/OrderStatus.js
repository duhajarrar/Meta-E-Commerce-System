import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);



var db = firebase.firestore();


export default class OrderStatus extends Component {




    constructor() {
        super();
        this.docs = firebase.firestore().collection('InDeliveryOrders').orderBy('OrderTimestamp');
        this.state = {
            isLoading: true,
            dOrderDB: [],
            pOrderDB: [],
            dTotalMoney: 0,
            pTotalMoney: 0,
            dTotalOrders: 0,
            pTotalOrders: 0,
            dnumOfOrders: 0,
            pnumOfOrders: 0
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
                db.collection('InDeliveryOrders').orderBy('OrderTimestamp', 'desc')
                    .where('customerEmail', '==', user.email)
                    .get()
                    .then((querySnapshot) => {
                        OrderInf = querySnapshot.docs.map(doc => doc.data());
                        let TotalMoney = 0;
                        let dnumOfOrders = 0;
                        OrderInf.forEach((obj) => {
                            // console.log("Orders====", Orders)
                            let ord = obj.OrderProducts;
                            let TotalPrice = 0;
                            ord.forEach((obj1) => {

                                TotalPrice += obj1.price;
                                obj['TotalPrice'] = TotalPrice;
                            });
                            TotalMoney += TotalPrice;
                            dnumOfOrders++;
                        });

                        console.log("orders", OrderInf)
                        console.log("TotalMoney===", TotalMoney)
                        this.setState({ dTotalMoney: TotalMoney });
                        this.setState({ dnumOfOrders: dnumOfOrders });
                        console.log("TotalMoney===", this.state.dTotalMoney)
                        this.setState({ dOrderDB: OrderInf });
                        console.log("user-orders", this.state.dOrderDB)
                    })
            }

            let OrderInf;
            db.collection('PendingOrders').orderBy('OrderTimestamp', 'desc')
                .where('customerEmail', '==', user.email)
                .get()
                .then((querySnapshot) => {
                    OrderInf = querySnapshot.docs.map(doc => doc.data());
                    let TotalMoney = 0;
                    let pnumOfOrders = 0;
                    OrderInf.forEach((obj) => {
                        // console.log("Orders====", Orders)
                        let ord = obj.OrderProducts;
                        let TotalPrice = 0;
                        ord.forEach((obj1) => {

                            TotalPrice += obj1.price;
                            obj['TotalPrice'] = TotalPrice;
                        });
                        TotalMoney += TotalPrice;
                        pnumOfOrders++;
                    });

                    console.log("orders", OrderInf)
                    console.log("TotalMoney===", TotalMoney)
                    this.setState({ pTotalMoney: TotalMoney });
                    this.setState({ pnumOfOrders: pnumOfOrders });
                    console.log("TotalMoney===", this.state.dTotalMoney)
                    this.setState({ pOrderDB: OrderInf });
                    console.log("user-orders", this.state.pOrderDB)
                })




        })
    }

    state = { Price: 0 }





    render = () => {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 65 }}>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("userPreprationOrders"); }}>
                            <View style={styles.container}>
                                <View style={styles.textContainer}>
                                    <Text>
                                        <Image style={styles.icon} source={require('../assets/put-in.png')} />
                                        {" "}
                                        <View>
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                                In Preparation Orders </Text>
                                        </View>
                                        <Image style={styles.icon3} source={require('../assets/next.png')} />
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View >
                                        <View >
                                            <Text style={{
                                                marginHorizontal: 20, fontSize: 16, color: "#800C69", fontWeight: 'bold',
                                            }}>
                                                Total Orders </Text>
                                        </View>
                                        <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} >
                                            {/* <Image style={styles.cardImage} //source={{ uri: item.image }}
                                            /> */}
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                                {this.state.pnumOfOrders} </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View >
                                        <View >
                                            <Text style={{
                                                marginHorizontal: 20, fontSize: 16, color: "#800C69", fontWeight: 'bold',
                                            }}>
                                                Total Money </Text>
                                        </View>
                                        <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} >
                                            {/* <Image style={styles.cardImage} //source={{ uri: item.image }}
                                            /> */}
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                                {this.state.pTotalMoney} </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </TouchableOpacity>




                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("userPendingOrders"); }}>
                            <View style={styles.container}>
                                <View style={styles.textContainer}>
                                    <Text>
                                        <Image style={styles.icon2} source={require('../assets/fast-delivery-2.png')} />
                                        {" "}
                                        <View>
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', paddingBottom: 8}}>
                                                In Delivery Orders </Text>

                                        </View>
                                        <Image style={styles.icon3} source={require('../assets/next.png')} />
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View >
                                        <View >
                                            <Text style={{
                                                marginHorizontal: 20, fontSize: 16, color: "#800C69", fontWeight: 'bold',
                                            }}>
                                                Total Orders </Text>
                                        </View>
                                        <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} >
                                            {/* <Image style={styles.cardImage} //source={{ uri: item.image }}
                                            /> */}
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                                {this.state.dnumOfOrders} </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View >
                                        <View >
                                            <Text style={{
                                                marginHorizontal: 20, fontSize: 16, color: "#800C69", fontWeight: 'bold',
                                            }}>
                                                Total Money </Text>
                                        </View>
                                        <TouchableOpacity style={[styles.card, { backgroundColor: 'white' }]} >
                                            {/* <Image style={styles.cardImage} //source={{ uri: item.image }}
                                            /> */}
                                            <Text style={{ fontSize: 18, color: "#800C69", fontWeight: 'bold', }}>
                                                {this.state.dTotalMoney}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </TouchableOpacity>


                    </View>
                </ScrollView >
            </SafeAreaView >
        );

    }
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 300,
        marginBottom: 25,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderColor: "#800C69"

    },

    image: {
        width: '100%',
        height: '70%'
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
        // paddingTop:10,
        width: 35,
        height: 35,
        color: "#800C69"
    },
    icon2: {
        width: 45,
        height: 45,
        color: "#800C69",
    },
    icon3: {
        width: 35,
        height: 35,
        color: "#800C69",
        // paddingBottom: 20
    },
    logo: {
        marginTop: 50,
        height: "20%",
        // height: 400,
        width: "100%",
        // flex: 1,
        resizeMode: 'contain'
    },
    cardImage: {
        height: 45,
        width: 45,
        alignSelf: 'center'
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
        marginHorizontal: 20,
        backgroundColor: "#e2e2e2",
        //flexBasis: '42%',
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
});