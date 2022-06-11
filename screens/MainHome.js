
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';


export default class MainHome extends Component {




    render() {
        return (


            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView>


                    <View style={styles.cardHeader}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.title, { color: "#800C69" }]}>Welcome </Text>
                            <Text style={[styles.title, { color: "#800C69" }]}>to</Text>

                            <View style={{ alignItems: "center", justifyContent: "center", }}>
                                <Image style={styles.logo} source={require('../images/logo1.png')} />
                            </View>

                            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 180 }}
                            onPress={() =>
                                this.props.navigation.navigate("Shops")
                            }
                            >
                                <Text style={[{
                                    color: "#800C69", 
                                    fontSize: 22,
                                    flex: 1,
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    paddingBottom:20
                                }]}>Start Shopping </Text>
                                <Image style={styles.icon} source={require('../assets/next.png')} />

                            </TouchableOpacity>


                        </View>

                    </View>


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#800C69",
        height: 200,
        // position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0

    },
    //   avatar: {
    //     width: 150,
    //     height: 150,
    //     borderRadius: 70,
    //     borderWidth: 5,
    //     // borderColor: "#38700F",
    //     borderColor: "grey",
    //     marginBottom: 10,
    //     alignSelf: 'center',
    //     position: 'absolute',
    //     marginTop: 130
    //   },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        //flex: 2,
        alignItems: 'center',
        padding: 40,
    },
    name: {
        fontSize: 28,
        color: "#38700F",
        fontWeight: "500",
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: 190,

    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        // marginTop: 35,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white'
    },
    buttonContainer1: {
        marginTop: 35,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#38700F",
        color: 'white'
    },
    title: {
        fontSize: 32,
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    cardHeader: {
        paddingVertical: 107,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    // logo: {
    //     // marginTop: 10,
    //     height: "30%",
    //     // height: 400,
    //     width: 400,
    //     // flex: 1,
    //     resizeMode: 'contain'
    //   },
    icon: {
        width: 65,
        height: 65,
    },
});
