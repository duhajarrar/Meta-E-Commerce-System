import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import StarRating from 'react-native-star-rating';

import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple,
} from 'react-native-paper';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import { color } from 'react-native-reanimated';

import { useRoute } from '@react-navigation/native';
var db = firebase.firestore();

export default class Feedbacks extends Component {


    state = {
        feedback: null
        , FeedBacks: []
        , user: {}
    }


    state = {
        email: null, password: '', errorMessage: '', isLoading: false, displayName: '', photoURL: '',
        familyName: '', givenName: '', phoneNumber: '', address: ''
    };
    state = {
        userinfo: {},
        user: {},
    };


    state = {
        ProviderName: ''
        , rating: null
        , BravoRate: null
        , ShiniRate: null
        , BrothersRate: null
        , GardensRate: null
        , Rates: null
    }

    constructor(props) {
        super(props);
        this.forceUpdate();
        this.setState({ isLoading: this.props.route.params.isLoading });
        this.setState({ Rates: this.props.route.params.Rate });
        console.log("TESSSST", this.props.route.params.ProviderName)

        this.docs = firebase.firestore().collection('FeedBack')
        //.where('Provider', '==', this.props.route.params.ProviderName)
        this.state = {
            // isLoading: true,
            FeedBackDB: null
            , refresh: false
        };

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({ email: user.email });
                let userInf;
                db.collection('userList')
                    .where('email', '==', user.email)
                    .get()
                    .then((querySnapshot) => {
                        userInf = querySnapshot.docs.map(doc => doc.data());
                        this.setState({ userinfo: userInf[0] });
                        console.log("USEEr", this.state.userinfo)
                        this.setState({ displayName: userInf[0].displayName });
                        this.setState({ photoURL: userInf[0].photoURL });
                        this.setState({ phoneNumber: userInf[0].phoneNumber });

                    })
            }
        })
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getDBData);
        this.update();


    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getDBData = () => {
        let OrderInf;
        console.log("Provider", this.props.route.params.ProviderName)
        db.collection('FeedBack')
            .where('Provider', '==', this.props.route.params.ProviderName)
            .get()
            .then((querySnapshot) => {
                OrderInf = querySnapshot.docs.map(doc => doc.data());
                console.log("orders", OrderInf)
                console.log("Provider", this.props.route.params.ProviderName)
                this.setState({ FeedBackDB: OrderInf });
                //console.log("user-orders", this.state.FeedBackDB)
            })
        this.setState({
            //   FeedBackDB,
            isLoading: false
        });
    }

    addComment() {
        if (this.state.feedback != null) {
            db.collection("FeedBack").add({
                userName: this.state.displayName,
                comment: this.state.feedback,
                photoURL: this.state.photoURL,
                Provider: this.props.route.params.ProviderName,
                time: this.getCurrentDate()
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

        }

    }

    getCurrentDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var suffix = (hours >= 12) ? 'pm' : 'am';
        //only -12 from hours if it is greater than 12 (if not back at mid night)
        hours = (hours > 12) ? hours - 12 : hours;
        min = (min < 10) ? "0" + min : min;
        //if 00 then it is 12 am
        hours = (hours == '00') ? 12 : hours;
        console.log("thistime-hours", hours)
        var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + " " + suffix;
        console.log("user-time", finalObject)
        return finalObject;
    }


    onGeneralStarRatingPress(rating) {
        this.setState({
            generalStarCount: rating,
        });
    }

    update() {
        this.getRate(this.props.route.params.ProviderName);
    }

    getRate(ProviderName) {
        let Rating;
        let rate;
        db.collection("ProvidersRank")
            .where('ProviderName', '==', ProviderName)
            .get()
            .then((querySnapshot) => {
                Rating = querySnapshot.docs.map(doc => doc.data());
                console.log("Rates", Rating[0].StarCountAvg);
                rate = Rating[0].StarCountAvg;
                this.setState({ Rates: rate });
                this.props.navigation.setParams({
                    Rate: rate,
                })

            })
    }

    updateRate(ProviderName, rate, Count) {
        firebase.firestore().collection("ProvidersRank").where('ProviderName', '==', ProviderName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ StarCountAvg: rate });
                    doc.ref.update({ Count: Count });
                });
            })
        this.update();
    }

    onStarRatingPress(ProviderRate, ProviderName) {
        let Rating;
        let rate;
        let Count;
        let newRate;
        db.collection("ProvidersRank")
            .where('ProviderName', '==', ProviderName)
            .get()
            .then((querySnapshot) => {
                Rating = querySnapshot.docs.map(doc => doc.data());
                console.log("rating", Rating[0]);
                rate = Rating[0].StarCountAvg;
                Count = Rating[0].Count;
                console.log("Count", Count);
                console.log("rate", rate);
                console.log("ProviderRate", ProviderRate);
                newRate = ((Count * rate) + ProviderRate) / (Count + 1);
                console.log("newRate", newRate);
                this.updateRate(ProviderName, newRate, Count + 1);
            })

    }


    render() {
        console.log("userrrrrrr", this.state.displayName, this.state.photoURL)
        console.log("TESSSST", this.props.route.params.ProviderName, this.props.route.params.isLoading)

        if (this.state.isLoading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }
        return (

            <SafeAreaView style={{ flex: 1 }}>


                <View style={styles.cardHeader}>
                    <Text style={styles.buyNow}>
                        {this.props.route.params.ProviderName}
                        {" "}Feedback
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: 30, backgroundColor: 'white'
                }}>

                    <StarRating
                        disabled={false}
                        emptyStar="ios-star-outline"
                        fullStar="ios-star"
                        halfStar="ios-star-half"
                        iconSet="Ionicons"
                        maxStars={5}
                        rating={this.props.route.params.Rate}
                        selectedStar={(rating) => this.onStarRatingPress(rating, this.props.route.params.ProviderName)}
                        fullStarColor="#38700F"
                        halfStarColor="#38700F"
                        emptyStarColor="#38700F"
                        halfStarEnabled
                        starPadding={20}
                        starSize={55}
                    />
                </View>

                <View style={styles.separator} />

                <FlatList
                    style={styles.root}
                    data={this.state.FeedBackDB}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) =>
                        <View style={styles.container1}>
                            <TouchableOpacity onPress={() => { }}>
                                <Image style={styles.image}
                                    source={{
                                        uri: item.photoURL
                                    }} />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <View style={styles.contentHeader}>
                                    <Text style={styles.name}>{item.userName}</Text>
                                    <Text style={styles.time}>
                                        {item.time}
                                    </Text>
                                </View>
                                <Text rkType='primary3 mediumLine' style={{ paddingTop: 10 }}>{item.comment}</Text>
                            </View>
                        </View>
                    }
                />

                <View style={styles.cardFooter}>

                    <TextInput
                        placeholder="           write your feedback"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="next"
                        textContentType="name"
                        value={this.state.feedback}
                        onChangeText={feedback => this.setState({ feedback })}
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.addComment()
                            //   & Alert.alert('Comment Added')
                        }>
                        <Text style={{
                            color: "white",

                            fontSize: 18
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderColor: "#800C69",
        borderWidth: 2,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 80,

    },
    buttonContainer: {
        marginTop: 15,
        // marginLeft: 140,
        left: "80%",
        //right: "50%",
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 70,
        borderRadius: 20,
        backgroundColor: "#800C69",
        color: 'white'
    },
    root: {
        backgroundColor: "#ffffff",
        marginTop: 0,
    },
    container1: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor:'#C5C5C5'

    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 2,
        backgroundColor: "#800C69"

    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 5,
        marginRight: 10,
        paddingBottom: 10,
        borderWidth: 2,
        borderColor: "grey",

    },
    time: {
        fontSize: 9,
        color: "#808080",
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
    },
    cardFooter: {
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
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
    buyNow: {
        fontSize: 18,
        color: "#800C69",
    },
});