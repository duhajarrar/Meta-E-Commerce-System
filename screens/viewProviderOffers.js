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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

var db = firebase.firestore();

export default class viewProviderOffers extends Component {


    constructor() {
        super();
        console.log(this.props)
        this.docs = firebase.firestore().collection("Offers");
        this.state = {
            isLoading: true,
            orderDB: []
        };
    }

    componentDidMount() {
        this.MyDB
        this.unsubscribe = this.docs.onSnapshot(this.getorderDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getorderDBData = () => {

        let OrderInf;
        db.collection("Offers").where('provider', '==', this.props.navigation.state.params.ProviderName)
            .get()
            .then((querySnapshot) => {
                OrderInf = querySnapshot.docs.map(doc => doc.data());
                this.setState({ orderDB: OrderInf });
            })

    }

    deleteOffer(items) {
        console.log('deleteOffer',items);
     //   console.log('deleteOffer',items.id);
        firebase.firestore().collection("Offers").where("id", "==", items.id).where("provider", "==", items.provider)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

    }

    goToEditOffer(item) {
        console.log("edit offer");
        this.props.navigation.navigate('editOffer', {
            userName: this.props.navigation.state.params.userName,
            ProviderName: this.props.navigation.state.params.ProviderName,
            item: item
        });
    }


    render() {
       // console.log(this.state.orderDB)
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

                <View style={styles.cardHeader}>
                    <Text style={styles.buyNow}>
                       Edit {this.props.navigation.state.params.ProviderName} Offers
                    </Text>
                </View>


                <FlatList
                    data={this.state.orderDB}
                    renderItem={({ item }) =>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <TouchableOpacity
                            onPress={() => { this.goToEditOffer(item) }}
                            >

                                <View style={styles.container}>


                                    <View style={styles.infoBoxWrapper}>

                                        <View style={[styles.infoBox, {
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>
                                            <Image style={styles.image} source={{ uri: item.image }} />
                                        </View>


                                        <View style={[styles.infoBox, {
                                            color: '#90EE90',
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>

                                            <Text style={{ color: "#38700F", paddingLeft: 20, fontSize: 16 }}>
                                                {`Name: `}{item.name}
                                                {`                    Price: `} <Text style={{ textDecorationLine: 'line-through',color: 'red' }}>{item.originalPrice}{" "}</Text>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {item.price}</Text>
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={styles.separator} />

                                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                       onPress={() => this.deleteOffer(item)
                                        }
                                    >
                                        <Text style={{ fontSize: 16, color: "#800C69", fontWeight: 'bold', }}>
                                            {/* <Image style={styles.icon} source={require('../assets/product.png')} /> */}
                                            <MaterialCommunityIcons name="delete" size={20} color={'#800C69'} style={{ padding: 5 }} />
                                            {' '}Delete Offer</Text>

                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>






                        </View>
                    }
                />

                <View style={styles.cardFooter}>

                    <TouchableOpacity style={styles.socialBarButton}
                        onPress={() => {
                            this.props.navigation.navigate("ProviderLogin")
                        }}
                    >
                        {/* <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6313/6313304.png' }} /> */}
                        <AntDesign name="logout" size={23} color={'#800C69'} style={{ padding: 5 }} />

                        <Text style={[styles.socialBarLabel, styles.buyNow]}>  Logout </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialBarButton}
                        onPress={() => {
                            this.props.navigation.navigate('ProviderHome', {
                                userName: this.props.navigation.state.params.userName,
                                ProviderName: this.props.navigation.state.params.ProviderName
                            });
                        }}
                    >
                        {/* <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6313/6313304.png' }} /> */}
                        <AntDesign name="home" size={23} color={'#800C69'} style={{ padding: 5 }} />
                        <Text style={[styles.socialBarLabel, styles.buyNow]}>  Home </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        // backgroundColor: '#ecf0f1',
        // padding: 8,
        // flexDirection: 'column',
        // alignItems: 'center'
        flexDirection: 'column',
        alignItems: 'center',
        width: 50,
        height: 50,
    },

    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 45,
    },
    title: {
        fontSize: 20,
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
        //borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 150,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        //margin: 2
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
    //             container: {
    //                 flex: 2,
    //             marginTop: 20,
    // },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: '47%',
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: "10%",
        backgroundColor: '#ECD4EA',
        //fontcolor: 'black'
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: '#ECD4EA',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    cardImage: {
        flex: 1,
        height: 250,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
    },
    price: {
        fontSize: 16,
        color: "#38700F",
        marginTop: 5
    },
    shop: {
        fontSize: 18,
        flex: 1,
        color: "#800C69",
    },
    total: {
        fontSize: 16,
        color: "#38700F",
        marginTop: 5,
        marginLeft: "30%",
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: "center",

    },
    buyNow: {
        fontSize: 18,
        color: "#800C69",
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    socialBarSection: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',

    },
    socialBarlabel: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: '#FFFFFF',
    },
    container: {
        width: 350,
        height: 200,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },
    image: {
        alignSelf: 'flex-start',
        width: '100%',
        height: '100%'
    },

    textContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'

        // alignItems: 'center',
        // justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: "#800C69"
    },
});
