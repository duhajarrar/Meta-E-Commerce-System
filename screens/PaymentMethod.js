import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeApp from "./StripeApp";
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView,Alert } from 'react-native';


export default class CardPayment extends Component{
    render() {
        console.log("Card TotalAmount in PaymentMethod",this.props.route.params.TotalAmount)
        return (
            <SafeAreaView style={{ flex: 1 ,marginTop:25 }}>
                <ScrollView style={styles.scrollView}>


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                      <Text style = {styles.text}>Choose your Payment Method </Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("CardPayment",{
                         TotalAmount: this.props.route.params.TotalAmount,
                              }); }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../assets/credit-card.png')} />


                                <View style={styles.textContainer}>
                                    <TouchableOpacity >
                                        <Text>
                                            
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 20, color: "#800C69", fontWeight: 'bold', }}>
                                                    Credit Card </Text>
                                            </View>
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { Alert.alert("Your Order is Completed and ready to deliver") &
                            this.props.navigation.navigate("Shops")
                             }}>
                            <View style={styles.container}>
                                <Image style={styles.image} source={require('../assets/money1.png')} />

                                <View style={styles.textContainer}>
                                    <TouchableOpacity >
                                        <Text>
                                            {" "}
                                            <View>
                                                <Text style={{ paddingBottom: 5, fontSize: 20, color: "#800C69", fontWeight: 'bold', }}>
                                                    Cash </Text>
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
//_onChange => form => console.log(form);
const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 250,
        marginBottom: 25,
        marginTop: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '80%',
        height: '70%',
        justifyContent: 'center',
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