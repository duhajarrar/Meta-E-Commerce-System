import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebase from "firebase/compat/app"
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, Button,
    Alert, TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'


var db = firebase.firestore();

export default class editProd extends Component {

    state = {
        //  items: [],
        id: '',
        name: '', price: '', quantity: ''
    }
    // state = {
    //     name: '', price: '', quantity: ''
    //   };


    componentDidMount() {
        const yourParam = this.props.route.params.item
        //this.setState({ items: yourParam });
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
            .where('id', '==', this.props.route.params.itemId)
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


    updateName() {
        const name = this.props.route.params.itemName
        //console.log(name);
        firebase.firestore().collection(this.MyDB).where('id', '==', this.props.route.params.itemId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ name: name });
                    //console.log(doc.id, " => ", doc.data());
                });
            })
    }

    onPressMinus() {
        if (this.props.route.params.itemQuantity > 0) {
            const quantity = this.props.route.params.itemQuantity - 1
            this.props.navigation.setParams({
                itemQuantity: quantity
            });
            firebase.firestore().collection(this.MyDB).where('id', '==', this.props.route.params.itemId)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update({ quantity: quantity });
                        console.log(doc.id, " => ", doc.data());
                    });
                })
        }
    }

    onPressPlus() {
        const quantity = this.props.route.params.itemQuantity + 1
        this.props.navigation.setParams({
            itemQuantity: quantity
        });
        console.log(quantity);
        firebase.firestore().collection(this.MyDB).where('id', '==', this.props.route.params.itemId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ quantity: quantity });
                    console.log(doc.id, " => ", doc.data());
                });
            })
    }

    onPressMinusPrice() {
        if (this.props.route.params.itemPrice > 0) {
            const price = this.props.route.params.itemPrice - 1
            this.props.navigation.setParams({
                itemPrice: price,
            });
            firebase.firestore().collection(this.MyDB).where('id', '==', this.props.route.params.itemId)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update({ price: price });
                        console.log(doc.id, " => ", doc.data());
                    });
                })
        }
    }

    onPressPlusPrice() {
        const price = this.props.route.params.itemPrice + 1
        this.props.navigation.setParams({
            itemPrice: price,
        });
        console.log(price);
        firebase.firestore().collection(this.MyDB).where('id', '==', this.props.route.params.itemId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ price: price });
                    console.log(doc.id, " => ", doc.data());
                });
            })
    }

    updateNamePrams(name) {
        this.props.navigation.setParams({
            itemName: name,
        })
    }

    updatePrice(price) {
        this.props.navigation.setParams({
            itemPrice: price,
        })
    }

    updateQuantity(quantity) {
        this.props.navigation.setParams({
            itemQuantity: quantity
        })
    }


    render = () => {
        // console.log(this.state.name)
        // console.log(this.state.price)
        // console.log(this.state.id)
        //
        console.log("Item......")
        console.log(this.props.route.params.item.name)
        console.log(this.props.route.params.item.price)
        console.log(this.props.route.params.item.id)

        console.log("id", this.props.route.params.itemId)
        console.log(this.props.route.params.itemName)
        console.log(this.props.route.params.itemPrice)
        console.log(this.props.route.params.itemQuantity)
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >

                <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <View style={styles.container}>
                            <View style={styles.details}>



                                <View style={styles.detailsWrapper}>
                                    <Text
                                        style={styles.detailsLabel}>
                                        {/* <AntDesign name='user' size={20} /> */}
                                        Product Name
                                    </Text>

                                    <TextInput style={styles.textInput}
                                        placeholderTextColor='grey'
                                        placeholder={this.props.route.params.itemName}
                                        returnKeyType="next"
                                        textContentType="name"
                                        onChangeText={(name) => { this.updateNamePrams(name) }}
                                        value={this.props.route.params.itemName}
                                    />

                                    <MaterialIcons style={styles.phone} name='edit' size={35} />
                                </View>



                                <View style={styles.detailsWrapper}>


                                    <Text
                                        style={styles.detailsLabel}>
                                        Product Quantity
                                    </Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.socialBarButton}
                                            onPress={() => {
                                                this.onPressMinus();
                                            }}
                                        >
                                            <AntDesign name="minuscircleo" size={25} color={'#2E922E'} style={{ padding: 5 }} />

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.socialBarButton}
                                            onPress={() => {
                                                this.onPressPlus();
                                            }}
                                        >
                                            <AntDesign name="pluscircleo" size={25} color={'#2E922E'} style={{ padding: 5 }} />
                                        </TouchableOpacity>

                                        <Text style={{
                                            color: "#800C69",
                                            padding: 5,
                                            fontSize: 15,
                                            fontWeight: "bold"
                                        }}>{"      × "}{this.props.route.params.itemQuantity}</Text>

                                    </View>

                                </View>




                                <View style={styles.detailsWrapper}>
                                    <Text
                                        style={styles.detailsLabel}>
                                        Product Price
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity style={styles.socialBarButton}
                                            onPress={() => {
                                                this.onPressMinusPrice();
                                            }}
                                        >
                                            <AntDesign name="minuscircleo" size={25} color={'#2E922E'} style={{ padding: 5 }} />

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.socialBarButton}
                                            onPress={() => {
                                                this.onPressPlusPrice();
                                            }}
                                        >
                                            <AntDesign name="pluscircleo" size={25} color={'#2E922E'} style={{ padding: 5 }} />
                                        </TouchableOpacity>

                                        <Text style={{
                                            color: "#800C69",
                                            padding: 5,
                                            fontSize: 15,
                                            fontWeight: "bold"
                                        }}>{"      × "}{this.props.route.params.itemPrice}</Text>

                                    </View>
                                </View>


                                <View style={styles.button}>
                                    <Button
                                        color='white'
                                        title="UPDATE PRODUCT"
                                        onPress={() => this.update()
                                            & Alert.alert('product updated')
                                        }
                                    />

                                </View>
                            </View>
                        </View>


                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>

        );
    };
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
        // justifyContent: 'space-between',
        // backgroundColor: '#ecf0f1',
        // padding: 8,
        // flexDirection: 'column',
        // alignItems: 'center'
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
        height: 200,
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
        // marginTop: 10,
        flexDirection: 'row',
        //flex: 2,
        // justifyContent: 'space-between',

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
    button: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white',
        margin: 30
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        margin: 9

    },
    headerWrapper: {
        flex: 0.45,
        marginVertical: 17,
        borderBottomWidth: 3,
        borderBottomColor: '#800C69'
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 'normal',

    },
    thumb: {
        marginTop: 20,
        width: 170,
        height: 170,
        alignSelf: 'center',
        borderRadius: 100
    },
    details: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginHorizontal: 22,
        width: 350
    },
    detailsLabel: {
        marginTop: 10,
        color: "#800C69",
        fontSize: 18,

    },
    detailsWrapper: {
        margin: 15,
    },
    color: {
        color: '#800C69',
        fontSize: 18
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#800C69',
        fontStyle: 'normal',
        fontSize: 16,
        width: "85%"
    },
    button: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#800C69",
        color: 'white',
        margin: 30
    },
    cameraWrapper: {
        position: 'absolute',
        top: 150,
        left: 225,
        backgroundColor: '#800C69',
        width: 40,
        height: 40,
        borderRadius: 100
    },
    camera: {
        alignSelf: 'center',
        margin: 8,

    },
    phone: {
        position: 'absolute',
        top: 23,
        left: 250,
        fontSize: 24,
        color: '#38700F',
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
    }
});

