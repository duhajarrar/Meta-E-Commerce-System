import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView } from 'react-native';


export default class HomeScreen1 extends Component {

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
        height: 200,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '80%'
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