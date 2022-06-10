import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebase from "firebase/compat/app"
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

var db = firebase.firestore();

export default class editOffer extends Component {

    state = {
        item: [],
        id: '',
        offerPrice: null, textOfferPrice: '',
        selectedStartDate: null,
    }

    componentDidMount() {
        const yourParam = this.props.route.params.item
        this.setState({ item: yourParam });
        this.setState({ offerPrice: yourParam.price })
        this.setState({ offerPrice: yourParam.endDate })
        const text = "Offer Price: " + yourParam.price
        console.log('gg', text)
        this.setState({ textOfferPrice: text })
        console.log("xxxyyxxxx", this.state.textOfferPrice)

    }

    updateOfferPrice() {
        console.log('deleteOffer', this.state.item.id);
        console.log('deleteOffer', this.state.item.provider);
        console.log('deleteOffer', this.state.offerPrice);
        const offer = this.state.offerPrice
        firebase.firestore().collection("Offers").where('id', '==', this.state.item.id).where("provider", "==", this.state.item.provider)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ price: offer });
                    console.log(doc.id, " => ", doc.data());
                });
            })
    }

    updateOfferDate() {
        console.log('deleteOffer', this.state.item.id);
        console.log('deleteOffer', this.state.item.provider);
        console.log('deleteOffer', this.state.offerPrice);
        
        const date = new Date(this.state.selectedStartDate).valueOf()
        firebase.firestore().collection("Offers").where('id', '==', this.state.item.id).where("provider", "==", this.state.item.provider)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ endDate: date });
                    console.log(doc.id, " => ", doc.data());
                });
            })
    }



    onDateChange = (date) => {
        this.setState({
            selectedStartDate: date,
        });
        console.log("++++++++++++++++++", this.state.selectedStartDate)
        console.log("=================", new Date(this.state.selectedStartDate).valueOf())
        // console.log("=================", new Date(1652799921646))
    }

    render = () => {

        console.log("this.state.item", this.props.route.params.item)
        console.log(this.state.price)
        console.log(this.state.id)
        console.log(this.state.item)
        // this.setState(selectedStartDate:new Date((this.props.route.params.item.endDate)));


        // this.setState({ selectedStartDate:new Date((this.props.route.params.item.endDate)) });
        // const { selectedStartDate } = this.state;
        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>


                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>


                    <View style={styles.container}>

                        <View style={styles.infoBoxWrapper}>

                            <View
                                style={[styles.infoBox, {

                                }]}
                            >
                                <Image style={styles.image} source={{ uri: this.props.route.params.item.image }} />
                            </View>

                            < View >

                                <Text style={{ color: "#38700F", fontSize: 19, flexDirection: 'column', paddingTop: 10, paddingBottom: 5 }}>
                                    {`Product Name: `}{this.props.route.params.item.name}
                                </Text>
                                <View style={styles.separator} />
                                <Text style={{ color: "#38700F", fontSize: 19, flexDirection: 'column', paddingTop: 10, paddingBottom: 5 }}>
                                    {`Product Price: `}{this.props.route.params.item.originalPrice}
                                </Text>
                                <View style={styles.separator} />


                                <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 5 }}>
                                    <TextInput
                                        placeholder="Offer Price"
                                        placeholderTextColor="#B1B1B1"
                                        returnKeyType="next"
                                        keyboardType="number"
                                        textContentType="number"
                                        // value={this.state.offerPrice}
                                        onChangeText={(offerPrice) => this.setState({ offerPrice })}
                                        style={styles.input}
                                    />





                                </View>
                            </View>
                        </View>
                        <View>
                        </View>
                    </View>

                    {this.props.route.params.item.withEndDate
                        &&


                        <View style={styles.cardFooter}>

                            <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>

                                <Text style={{ fontSize: 16, color: "#800C69", fontWeight: "bold" }}>
                                    <Image style={styles.icon} source={require('../assets/calendar.png')} />
                                    {this.state.selectedStartDate ?
                                     "End Date: "+new Date(this.state.selectedStartDate).getFullYear()+
                                     "-"+parseInt(new Date(this.state.selectedStartDate).getMonth()+1) +
                                     "-"+new Date(this.state.selectedStartDate).getDate() 
                                    : 
                                    "End Date: "+new Date(this.props.route.params.item.endDate).getFullYear()+
                                    "-"+parseInt(new Date(this.props.route.params.item.endDate).getMonth()+1) +
                                    "-"+new Date(this.props.route.params.item.endDate).getDate()
                                    
                                    }
                                    {/* {'  '}End Date:{"  "}{new Date(this.state.selectedStartDate).getFullYear()}-{new Date(this.state.selectedStartDate).getMonth() + 1}-{new Date(this.state.selectedStartDate).getDate()} */}
                                </Text>
                            </View>

                            <TouchableOpacity>

                                <View >

                                    <View style={styles.infoBoxWrapper1}>

                                        <View >


                                            <View style={styles.container2}>
                                                <CalendarPicker
                                                    // minDate={new Date()}
                                                    //  endDate={new Date((this.state.item.endDate))}
                                                    initialDate={new Date((this.state.item.endDate))}

                                                    width={350}
                                                    height={350}
                                                    // selectedStartDate={new Date((this.state.item.endDate))}
                                                    onDateChange={this.onDateChange}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>



                        </View>



                    }


                    <View tyle={{ paddingBottom: 10 }}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() =>
                                this.updateOfferPrice() & this.updateOfferDate() & Alert.alert("Updated")
                            }
                        >
                            <Text
                                style={{
                                    color: "white",
                                    padding: 5,
                                    fontSize: 16,
                                    paddingBottom: 5,
                                }}
                            >
                                Edit Offer
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer1}
                        >

                        </TouchableOpacity>

                    </View>

                </View>


            </SafeAreaView >


        );
    };
}




const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: "#800C69"
    },
    infoBoxWrapper: {
        paddingTop: 50,
        borderBottomColor: 'white',
        //        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        // flexDirection: 'row',
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBoxWrapper1: {
        paddingTop: 10,
        borderBottomColor: 'white',
        //        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        // flexDirection: 'row',
        height: 280,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox: {
        paddingTop: 100,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        //margin: 2
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
        height: '45%',
        //flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        //backgroundColor: '#ECD4EA',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 60
    },
    cardImage: {
        // flex: 1,
        // height: 200,
        // width: null,
        aspectRatio: 2,
        resizeMode: 'contain',
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
        fontSize: 16,
        color: "#800C69",
    },
    icon: {
        width: 25,
        height: 25,
    },
    container: {
        width: 450,
        height: "100%",
        //   marginBottom: 25,
        //   borderRadius: 15,
        //   backgroundColor: '#ecf0f1',
        //  overflow: 'hidden'
    },

    image: {
        paddingTop: 50,
        width: '100%',
        height: '90%',
        // aspectRatio: 2,
        // resizeMode: 'contain',
    },

    textContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#800C69",
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    logo: {
        marginTop: 50,
        height: "20%",
        // height: 400,
        width: "100%",
        // flex: 1,
        resizeMode: 'contain'
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: '#FFFFFF',
    },
    form: {
        width: "86%",
        marginTop: 125,
        color: "#38700F", fontSize: 19, flexDirection: 'column', paddingTop: 20, paddingBottom: 5
    },
    inputIcon: {
        position: 'absolute',
        top: 21,
        left: 43
    },
    input: {
        fontSize: 18,
        borderColor: "#800C69",
        borderWidth: 1,
        paddingBottom: 1.5,
        marginTop: 25.5,
        borderRadius: 15,
        // fontWeight: 'bold',
        color: "black",
        paddingLeft: 48,
        marginHorizontal: 25,
        width: 300,
        height: 40,
    },
    buttonContainer: {
        marginBottom: 50,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 15,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: "white",
    },
    buttonContainer1: {
        marginBottom: 50,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 15,
        width: 250,
        borderRadius: 30,
        // backgroundColor: "#800C69",
        color: "white",
    },
    container1: {
        // paddingTop: 40,
        width: 300,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 25,
        // borderRadius: 15,
        backgroundColor: '#FFFFFF',
        // overflow: 'hidden'
    },
    container2: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // marginTop: 100,
    },
});
