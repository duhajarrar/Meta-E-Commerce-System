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



    render = () => {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        {/* <Image style={styles.logo} source={require('../images/logo1.png')} /> */}
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageOne"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/alshini.jpg')} />


                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        Al-Shini
                                    </Text>

                                    <StarRating
                                        disabled={false}
                                        emptyStar="ios-star-outline"
                                        fullStar="ios-star"
                                        halfStar="ios-star-half"
                                        iconSet="Ionicons"
                                        maxStars={5}
                                        rating={this.state.ShiniRate}
                                        selectedStar={(rating) => this.onStarRatingPress(rating, "Al-Shini")}
                                        fullStarColor="#38700F"
                                        halfStarColor="#38700F"
                                        emptyStarColor="#38700F"
                                        halfStarEnabled
                                        starPadding={10}
                                        starSize={35}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageTwo"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/bravo.png')} />


                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        Bravo
                                    </Text>
                                
                                    <StarRating
                                        disabled={false}
                                        emptyStar="ios-star-outline"
                                        fullStar="ios-star"
                                        halfStar="ios-star-half"
                                        iconSet="Ionicons"
                                        maxStars={5}
                                        rating={this.state.BravoRate}
                                        selectedStar={(rating) => this.onStarRatingPress(rating, "Bravo")}
                                        fullStarColor="#38700F"
                                        halfStarColor="#38700F"
                                        emptyStarColor="#38700F"
                                        starPadding={10}
                                        starSize={35}
                                    />

                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageThree"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/brothers.jpg')} />


                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        Brothers
                                    </Text>
                                    <StarRating
                                        disabled={false}
                                        emptyStar="ios-star-outline"
                                        fullStar="ios-star"
                                        halfStar="ios-star-half"
                                        iconSet="Ionicons"
                                        maxStars={5}
                                        rating={this.state.BrothersRate}
                                        selectedStar={(rating) => this.onStarRatingPress(rating, "Brothers")}
                                        fullStarColor="#38700F"
                                        halfStarColor="#38700F"
                                        emptyStarColor="#38700F"
                                        halfStarEnabled
                                        starPadding={10}
                                        starSize={35}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageFour"); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../images/gardens.jpg')} />


                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>
                                        Gardens
                                    </Text>

                                    <StarRating
                                        disabled={false}
                                        emptyStar="ios-star-outline"
                                        fullStar="ios-star"
                                        halfStar="ios-star-half"
                                        iconSet="Ionicons"
                                        maxStars={5}
                                        rating={this.state.GardensRate}
                                        selectedStar={(rating) => this.onStarRatingPress(rating, "Gardens")}
                                        fullStarColor="#38700F"
                                        halfStarColor="#38700F"
                                        emptyStarColor="#38700F"
                                        halfStarEnabled
                                        starPadding={10}
                                        starSize={35}
                                    />
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
    logo: {
        marginTop: 50,
        height: "20%",
        // height: 400,
        width: "100%",
        // flex: 1,
        resizeMode: 'contain'
    },
});