import { CheckBox } from 'react-native-elements'

import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebase from "firebase/compat/app"
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

var db = firebase.firestore();

export default class addOffer extends Component {

    state = {
        item: [],
        id: '',
        name: '', price: '', quantity: '', offerPrice: '',
        date: new Date(),
        selectedStartDate: null,
    }



    componentDidMount() {
        const yourParam = this.props.route.params.item
        this.setState({ item: yourParam });
        this.setState({ id: yourParam.id })
        this.setState({ name: yourParam.name })
        this.setState({ price: yourParam.price })
        this.setState({ quantity: yourParam.quantity })

    }

    update() {
        this.updateName();
        // this.updateAddress();
        // this.updatePhone();

        let userInf;
        db.collection(this.MyDB)
            .where('id', '==', this.state.id)
            .get()
            .then((querySnapshot) => {
                userInf = querySnapshot.docs.map(doc => doc.data());
                this.setState({ userinfo: userInf[0] });
                console.log("xxxyyxxxx", this.state.userinfo)

            })
    }


    get MyDB() {
        const yourParam = this.props.route.params.ProviderName
        //console.log(yourParam)
        return yourParam;
    }

    addOffer() {
        let withEndDate;
        let date=new Date(this.state.selectedStartDate).valueOf();
        if (date > 0)
            withEndDate = true;
        else
            withEndDate = false;

        db.collection("Offers").add({
            //  item: this.state.item,
            //  offerPrice: this.state.offerPrice,
            id: this.props.route.params.item.id,
            name: this.props.route.params.item.name,
            provider: this.props.route.params.item.provider,
            price: this.state.offerPrice,
            image: this.props.route.params.item.image,
            quantity: this.props.route.params.item.quantity,
            originalPrice: this.props.route.params.item.price,
            withEndDate:withEndDate,
            endDate: new Date(this.state.selectedStartDate).valueOf()
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }

    onDateChange = (date) => {
        this.setState({
            selectedStartDate: date,
        });
        console.log("++++++++++++++++++", this.state.selectedStartDate)
        console.log("=================", new Date(this.state.selectedStartDate).valueOf())
        console.log("=================", new Date(1652799921646))
    }
    render = () => {
    
        console.log("this.state.name",this.props.route.params.item)
        console.log(this.state.price)
        console.log(this.state.id)
        console.log(this.state.item)

        // const { selectedStartDate } = this.state;
        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>


                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>


                    <View style={styles.container}>

                        <View style={styles.infoBoxWrapper}>

                            <View>

                                <Text style={{ color: "#38700F", fontSize: 19, flexDirection: 'column', paddingTop: 20, paddingBottom: 5 }}>
                                    {`Product Name: `}{this.props.route.params.item.name}
                                </Text>
                                <View style={styles.separator} />
                                <Text style={{ color: "#38700F", fontSize: 19, flexDirection: 'column', paddingTop: 20, paddingBottom: 5 }}>
                                    {`Product Price: `}{this.props.route.params.item.price}
                                </Text>
                                <View style={styles.separator} />


                                <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
                                    <TextInput
                                        placeholder="Offer Price"
                                        placeholderTextColor="#B1B1B1"
                                        returnKeyType="next"
                                        keyboardType="number"
                                        textContentType="number"
                                        value={this.state.offerPrice}
                                        onChangeText={(offerPrice) => this.setState({ offerPrice })}
                                        style={styles.input}
                                    />


                                    <CheckBox
                                        title='Offer With End Date'
                                        checked={this.state.checked}
                                        onPress={() => this.setState({ checked: !this.state.checked })}
                                        style={{ backgroundColor: "white", paddingTop: 20, fontSize: 14, color: "#38700F" }}
                                    />

                                    <TouchableOpacity
                                        style={styles.buttonContainer}
                                        onPress={() =>
                                            this.addOffer() & Alert.alert("Added To Offers")
                                        }
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                padding: 5,
                                                fontSize: 16,
                                            }}
                                        >
                                            Add To Offers
                                        </Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </View>
                        <View>
                        </View>
                    </View>
                    {this.state.checked
                        &&


                        <View style={styles.cardFooter}>

                            <TouchableOpacity>

                                <View style={styles.container1}>

                                    <View style={styles.infoBoxWrapper}>

                                        <View style={styles.container1}>


                                            <View style={styles.container1}>
                                                <CalendarPicker
                                                    minDate={new Date()}
                                                    onDateChange={this.onDateChange}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <View style={{ justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <Text style={{ fontSize: 16, color: "#800C69", fontWeight: "bold" }}>
                                    <Image style={styles.icon} source={require('../assets/calendar.png')} />
                                    {'  '}End Date:{"  "}{new Date(this.state.selectedStartDate).getFullYear()}-{new Date(this.state.selectedStartDate).getMonth() + 1}-{new Date(this.state.selectedStartDate).getDate()}</Text>
                            </View>


                        </View>



                    }

                </View>


            </SafeAreaView>


        );
    };
}



const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: "#800C69"
    },
    infoBoxWrapper: {
        paddingTop: 10,
        borderBottomColor: 'white',
        //        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        // flexDirection: 'row',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBox: {
        width: '50%',
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
        height: '55%',
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
        bottom: 0
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
        alignSelf: 'flex-start',
        width: '100%',
        height: '70%',
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
        // marginBottom: 50,
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
    container1: {
        // paddingTop: 40,
        width: 400,
        height: 350,
        // marginBottom: 25,
        // borderRadius: 15,
        backgroundColor: '#FFFFFF',
        // overflow: 'hidden'
    },
});
