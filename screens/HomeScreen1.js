import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import StarRating from 'react-native-star-rating';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.65);



var db = firebase.firestore();

const data = [
    {
        id: 1,
        name: 'Al-Shini',
        page: 'pageOne',
        url: require('../images/alshini.jpg')

    },
    {
        id: 2,
        name: 'Bravo',
        page: 'pageTwo',
        url: require('../images/bravo.png'),
    },
    {
        id: 3,
        name: 'Brothers',
        page: 'pageThree',
        url: require('../images/brothers.jpg'),
    },
    {
        id: 4,
        name: 'Gardens',
        page: 'pageFour',
        url: require('../images/gardens.jpg'),
    },
];
export default class HomeScreen1 extends Component {



    state = {
        ProviderName: ''
        , rating: null
        , BravoRate: null
        , ShiniRate: null
        , BrothersRate: null
        , GardensRate: null
        , BravoCount: null
        , ShiniCount: null
        , BrothersCount: null
        , GardensCount: null
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
        let count;
        db.collection("ProvidersRank")
            .where('ProviderName', '==', ProviderName)
            .get()
            .then((querySnapshot) => {
                Rating = querySnapshot.docs.map(doc => doc.data());
                //   console.log(Rating[0].StarCountAvg);
                rate = Rating[0].StarCountAvg;
                count = Rating[0].Count;
                if (ProviderName == "Gardens") {
                    this.setState({ GardensRate: rate });
                    this.setState({ GardensCount: count });
                }
                else if (ProviderName == "Bravo") {
                    this.setState({ BravoRate: rate });
                    this.setState({ BravoCount: count });
                }
                else if (ProviderName == "Al-Shini") {
                    this.setState({ ShiniRate: rate });
                    this.setState({ ShiniCount: count });
                }
                else if (ProviderName == "Brothers") {
                    this.setState({ BrothersRate: rate });
                    this.setState({ BrothersCount: count });
                }
            })
    }

    updateRate(ProviderName, rate, Count) {
        firebase.firestore().collection("ProvidersRank").where('ProviderName', '==', ProviderName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ test: "test" + 1 });
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

    onLoginFeedbackSuccess(Provider) {
        console.log("feedback successful --------------------");
        let rate;
        if (Provider == "Gardens") {
            rate = this.state.GardensRate;
        }
        else if (Provider == "Bravo") {
            rate = this.state.BravoRate;
        }
        else if (Provider == "Al-Shini") {
            rate = this.state.ShiniRate;
        }
        else if (Provider == "Brothers") {
            rate = this.state.BrothersRate;
        }
        this.addComment();
        this.updateRate("Brothers");

        this.props.navigation.navigate('Feedbacks', {
            ProviderName: Provider,
            Rate: rate,
            isLoading: false
        })
    }


    renderItem = ({ item }) => {
        console.log(item.url);
        let url = item.url;
        console.log("urlllllllll", item.url);
        return (

            <TouchableOpacity

                onPress={() => {
                    this.props.navigation.navigate(item.page);
                }}
                // style={styles.container}
                style={{
                    borderWidth: 2,
                    padding: 20,
                    borderRadius: 20,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: "#800C69",
                    justifyContent: 'center'
                }
                }>

                <Image style={styles.image} source={item.url} />


                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => { this.onLoginFeedbackSuccess(item.name); }}>
                        <Text>
                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                            {" "}
                            <View>
                                <Text style={{ paddingBottom: 5, fontSize: 15, color: "#800C69", fontWeight: 'bold', }}>
                                    Add Feedback</Text>
                            </View>
                        </Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>

        );
    };


    render = () => {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 45 }}>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageOne"); }}>
                            <View style={styles.container1}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={[styles.image, { backgroundColor: 'white' }]} >
                                        <Image style={styles.image} source={require('../images/alshini.jpg')} />
                                    </TouchableOpacity>

                                    <View style={{
                                        flexDirection: 'vertical'
                                    }}>

                                        <View>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginVertical: 30, }}>
                                                Al-Shini </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column', alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>

                                            <StarRating
                                                disabled={false}
                                                emptyStar="ios-star-outline"
                                                fullStar="ios-star"
                                                halfStar="ios-star-half"
                                                iconSet="Ionicons"
                                                maxStars={5}
                                                rating={this.state.ShiniRate}
                                                fullStarColor="white"
                                                halfStarColor="white"
                                                emptyStarColor="#ffffff"
                                                halfStarEnabled
                                                starPadding={5}
                                                starSize={25}
                                            />

                                            <Text style={{
                                                fontSize: 12,
                                                color: "#ffffff",
                                                paddingLeft: 70,
                                                fontWeight: 'bold',
                                                // paddingBottom: 20
                                            }}>
                                                {Number(this.state.ShiniRate).toFixed(2)}
                                                ({this.state.ShiniCount})
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 30,
                            paddingLeft: "20%",
                            paddingRight: "20%"

                        }}
                            onPress={() =>
                                this.onLoginFeedbackSuccess("Al-Shini")
                            }
                        >
                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                            <Text style={[{
                                color: "#800C69",
                                fontSize: 18,
                                flex: 1,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                // paddingBottom: 20
                            }]}>{" "}Add Feedback </Text>

                            <Image style={styles.icon} source={require('../assets/next.png')} />

                        </TouchableOpacity>




                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageTwo"); }}>
                            <View style={styles.container1}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={[styles.image, { backgroundColor: 'white' }]} >
                                        <Image style={styles.image} source={require('../images/bravo.png')} />
                                    </TouchableOpacity>

                                    <View style={{
                                        flexDirection: 'vertical'
                                    }}>

                                        <View>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginVertical: 30, }}>
                                                Bravo </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column', alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>

                                            <StarRating
                                                disabled={false}
                                                emptyStar="ios-star-outline"
                                                fullStar="ios-star"
                                                halfStar="ios-star-half"
                                                iconSet="Ionicons"
                                                maxStars={5}
                                                rating={this.state.BravoRate}
                                                fullStarColor="white"
                                                halfStarColor="white"
                                                emptyStarColor="#ffffff"
                                                halfStarEnabled
                                                starPadding={5}
                                                starSize={25}
                                            />

                                            <Text style={{
                                                fontSize: 12,
                                                color: "#ffffff",
                                                paddingLeft: 70,
                                                fontWeight: 'bold',
                                                // paddingBottom: 20
                                            }}>
                                                {Number(this.state.BravoRate).toFixed(2)}
                                                ({this.state.BravoCount})
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 30,
                            paddingLeft: "20%",
                            paddingRight: "20%"

                        }}
                            onPress={() =>
                                this.onLoginFeedbackSuccess("Bravo")
                            }
                        >
                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                            <Text style={[{
                                color: "#800C69",
                                fontSize: 18,
                                flex: 1,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                // paddingBottom: 20
                            }]}>{" "}Add Feedback </Text>

                            <Image style={styles.icon} source={require('../assets/next.png')} />

                        </TouchableOpacity>




                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageThree"); }}>
                            <View style={styles.container1}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={[styles.image, { backgroundColor: 'white' }]} >
                                        <Image style={styles.image} source={require('../images/brothers.jpg')} />
                                    </TouchableOpacity>

                                    <View style={{
                                        flexDirection: 'vertical'
                                    }}>

                                        <View>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginVertical: 30, }}>
                                                Brothers </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column', alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>

                                            <StarRating
                                                disabled={false}
                                                emptyStar="ios-star-outline"
                                                fullStar="ios-star"
                                                halfStar="ios-star-half"
                                                iconSet="Ionicons"
                                                maxStars={5}
                                                rating={this.state.BrothersRate}
                                                fullStarColor="white"
                                                halfStarColor="white"
                                                emptyStarColor="#ffffff"
                                                halfStarEnabled
                                                starPadding={5}
                                                starSize={25}
                                            />

                                            <Text style={{
                                                fontSize: 12,
                                                color: "#ffffff",
                                                paddingLeft: 70,
                                                fontWeight: 'bold',
                                                // paddingBottom: 20
                                            }}>
                                                {Number(this.state.BrothersRate).toFixed(2)}
                                                ({this.state.BrothersCount})
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 30,
                            paddingLeft: "20%",
                            paddingRight: "20%"

                        }}
                            onPress={() =>
                                this.onLoginFeedbackSuccess("Brothers")
                            }
                        >
                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                            <Text style={[{
                                color: "#800C69",
                                fontSize: 18,
                                flex: 1,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                // paddingBottom: 20
                            }]}>{" "}Add Feedback </Text>

                            <Image style={styles.icon} source={require('../assets/next.png')} />

                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("pageFour"); }}>
                            <View style={styles.container1}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={[styles.image, { backgroundColor: 'white' }]} >
                                        <Image style={styles.image} source={require('../images/gardens.jpg')} />
                                    </TouchableOpacity>

                                    <View style={{
                                        flexDirection: 'vertical'
                                    }}>

                                        <View>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginVertical: 30, }}>
                                                Gardens </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column', alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>

                                            <StarRating
                                                disabled={false}
                                                emptyStar="ios-star-outline"
                                                fullStar="ios-star"
                                                halfStar="ios-star-half"
                                                iconSet="Ionicons"
                                                maxStars={5}
                                                rating={this.state.GardensRate}
                                                fullStarColor="white"
                                                halfStarColor="white"
                                                emptyStarColor="#ffffff"
                                                halfStarEnabled
                                                starPadding={5}
                                                starSize={25}
                                            />

                                            <Text style={{
                                                fontSize: 12,
                                                color: "#ffffff",
                                                paddingLeft: 70,
                                                fontWeight: 'bold',
                                                // paddingBottom: 20
                                            }}>
                                                {Number(this.state.GardensRate).toFixed(2)}
                                                ({this.state.GardensCount})
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 30,
                            paddingLeft: "20%",
                            paddingRight: "20%"

                        }}
                            onPress={() =>
                                this.onLoginFeedbackSuccess("Gardens")
                            }
                        >
                            <Image style={styles.icon} source={require('../assets/rating.png')} />
                            <Text style={[{
                                color: "#800C69",
                                fontSize: 18,
                                flex: 1,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                // paddingBottom: 20
                            }]}>{" "}Add Feedback </Text>

                            <Image style={styles.icon} source={require('../assets/next.png')} />

                        </TouchableOpacity>








                        {/* <View style={styles.container}> */}
                        {/*  <Image style={styles.image} source={require('../images/alshini.jpg')} />


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
                            </View> */}



                        {/* 

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
                        </TouchableOpacity> */}


                    </View>
                </ScrollView>
            </SafeAreaView >
        );

    }
}
const styles = StyleSheet.create({
    container: {
        // width: 350,
        height: 200,
        // marginBottom: 15,
        borderRadius: 15,
        // backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },
    container1: {
        width: SLIDER_WIDTH - 110,
        height: 200,
        // marginBottom: 15,
        borderRadius: 35,
        backgroundColor: '#800C69',
        overflow: 'hidden'
    },

    image: {
        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.47,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 30,
        marginHorizontal: 20,
        backgroundColor: "#e2e2e2",
        //flexBasis: '42%',
        width: 130,
        height: 130,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingBottom: 15,
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