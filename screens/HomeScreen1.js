import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


var db = firebase.firestore();
export default class HomeScreen1 extends Component {

    state = {
        ProviderName: ''
        , rating: null
        , BravoRate: null
        , ShiniRate: null
        , BrothersRate: null
        , GardensRate: null
    }

    onGeneralStarRatingPress(rating) {
        this.setState({
            generalStarCount: rating,
        });
    }

    componentDidMount() {
        this.update();
    }

    update() {
        this.getRate('Gardens');
        this.getRate('Bravo');
        this.getRate('Al-Shini');
        this.getRate('Brothers');
    }

    getRate(ProviderName) {
        let Rating;
        let rate;
        db.collection("ProvidersRank")
            .where('ProviderName', '==', ProviderName)
            .get()
            .then((querySnapshot) => {
                Rating = querySnapshot.docs.map(doc => doc.data());
                //   console.log(Rating[0].StarCountAvg);
                rate = Rating[0].StarCountAvg;
                if (ProviderName == "Gardens") {
                    this.setState({ GardensRate: rate });
                }
                else if (ProviderName == "Bravo") {
                    this.setState({ BravoRate: rate });
                }
                else if (ProviderName == "Al-Shini") {
                    this.setState({ ShiniRate: rate });
                }
                else if (ProviderName == "Brothers") {
                    this.setState({ BrothersRate: rate });
                }
            })
    }

    updateRate(ProviderName, rate, Count) {
        firebase.firestore().collection("ProvidersRank").where('ProviderName', '==', ProviderName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ test: "test"+1 });
                });
            })
        this.update();
    }


    addComment() {

        firebase.firestore().collection("FeedBack").where("comment", "==", "test").get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });


        db.collection("FeedBack").add({
            userName: "test",
            comment: "test",
            photoURL: "test",
            Provider: "tst",
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }
   
    onLoginFeedbackSuccess(Provider, rate) {
        console.log("feedback successful --------------------");
        this.addComment();
        this.updateRate("Brothers");
        this.props.navigation.navigate('Feedbacks', {
            ProviderName: Provider,
            Rate: rate,
            isLoading: false
        })
    }


    render = () => {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageOne"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/alshini.jpg')} />


                                <View style={styles.textContainer}>
                                    <TouchableOpacity onPress={() => { this.onLoginFeedbackSuccess("Al-Shini", this.state.ShiniRate); }}>
                                        <Text>
                                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 15, color: "#800C69", fontWeight: 'bold', }}>
                                                    Add Feedback & Reviews </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageTwo"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/bravo.png')} />



                                <View style={styles.textContainer}>
                                    <TouchableOpacity onPress={() => { this.onLoginFeedbackSuccess("Bravo", this.state.BravoRate); }}>
                                        <Text>
                                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 15, color: "#800C69", fontWeight: 'bold', }}>
                                                    Add Feedback & Reviews </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>



                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageThree"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/brothers.jpg')} />


                                <View style={styles.textContainer}>
                                    <TouchableOpacity onPress={() => { this.onLoginFeedbackSuccess("Brothers", this.state.BrothersRate); }}>
                                        <Text>
                                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 15, color: "#800C69", fontWeight: 'bold', }}>
                                                    Add Feedback & Reviews </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageFour"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/gardens.jpg')} />


                                <View style={styles.textContainer}>
                                    <TouchableOpacity onPress={() => { this.onLoginFeedbackSuccess("Gardens", this.state.GardensRate); }}>
                                        <Text>
                                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 15, color: "#800C69", fontWeight: 'bold', }}>
                                                    Add Feedback & Reviews </Text>
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
const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 300,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
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