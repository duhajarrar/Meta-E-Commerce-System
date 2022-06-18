import React, { Component } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, Alert } from 'react-native';
var db = firebase.firestore();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class viewProducts extends Component {

    constructor() {
        super();
        console.log(this.props)
        this.docs = firebase.firestore().collection("RefundRequests");
        this.state = {
            isLoading: true,
            orderDB: [],
            haveWallet: null,
            walletMoney: null
        };
    }


    // state = {
    //     haveWallet,
    //     walletMoney,

    // }

    componentDidMount() {
        this.MyDB
        this.unsubscribe = this.docs.onSnapshot(this.getorderDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getorderDBData = () => {
        // console.log('this.props.route.params.ProviderName', this.props.route.params.ProviderName);
        let OrderInf;
        db.collection("RefundRequests").where('provider', '==', this.props.route.params.ProviderName)
            .where('Approval', '==', false)
            .where('status', '==', "waitForApprovall")
            .get()
            .then((querySnapshot) => {
                OrderInf = querySnapshot.docs.map(doc => doc.data());
                this.setState({ orderDB: OrderInf });
            })

    }



    setApproval(item) {
        // const address = this.state.address
        // this.AddToWallet(item);
        firebase.firestore().collection("RefundRequests").where('id', '==', item.id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ Approval: true });
                    doc.ref.update({ status: "Approved" });
                });
            })
        Alert.alert("Request Approved");
        this.WalletStatus(item);
    }

    reject(item) {
        // const address = this.state.address
        // this.AddToWallet(item);
        firebase.firestore().collection("RefundRequests").where('id', '==', item.id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ Approval: false });
                    doc.ref.update({ status: "Rejected" });
                });
            })
        Alert.alert("Request Rejected");
        this.WalletStatus(item);
    }


    WalletStatus(item) {
        let wallet;
        console.log("xxx");
        db.collection("Wallet").where('userEmail', '==', item.customerEmail)
            .get()
            .then((querySnapshot) => {
                wallet = querySnapshot.docs.map(doc => doc.data());
                // console.log("wallllllllllet", wallet[0].TotalMoney);
                // console.log("wallllllllllet", wallet.TotalMoney);
                console.log("wallllllllllet", wallet);
                if (wallet.length == 0) {
                    console.log("111111");
                    this.setState({ haveWallet: false });

                } else {
                    this.setState({ walletMoney: wallet[0].TotalMoney });
                    this.setState({ haveWallet: true });
                    console.log("22222");

                }


                this.AddToWallet(item);
            })

    }


    AddToWallet(item) {

        // let status = this.WalletStatus(item);

        if ((!(this.state.haveWallet))) {
            console.log("aaa");
            firebase
                .firestore()
                .collection("Wallet")
                .add({
                    userName: item.customerName,
                    userEmail: item.customerEmail,
                    TotalMoney: item.item.price,
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }

        else {
            console.log("bbb", this.state.walletMoney);
            let money = this.state.walletMoney;
            let total = this.state.walletMoney + item.item.price;
            console.log("Tootalll", total)
            firebase.firestore()
                .collection("Wallet").where('userEmail', '==', item.customerEmail)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        doc.ref.update({ TotalMoney: total });
                    });
                })

        }
    }



    render() {
        // console.log(this.state.orderDB)
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <View style={styles.cardHeader}>
                    <Text style={styles.buyNow}>
                    {this.props.route.params.ProviderName} Refund Requests
                    </Text>
                </View>


                <FlatList
                    data={this.state.orderDB}
                    renderItem={({ item }) =>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <TouchableOpacity
                                onPress={() => { this.goToEditOffer(item) }}
                            >

                                <View style={styles.container}>


                                    <View style={styles.infoBoxWrapper}>

                                        <View style={[styles.infoBox, {
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>
                                            <Image style={styles.image} source={{ uri: item.item.image }} />
                                        </View>


                                        <View style={[styles.infoBox, {
                                            color: '#90EE90',
                                            borderColor: 'white',
                                            borderRightWidth: 1,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderLeftWidth: 1
                                        }]}>

                                            <Text style={{ color: "#800C69", fontSize: 14 }}>
                                                {`Name: `}{item.item.name}
                                                {`                    Price: `}
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {item.item.price}</Text>
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, justifyContent: "left", alignItems: "left", padding: 10, paddingLeft: 25, }}>

                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            <Image style={styles.icon} source={require('../assets/user.png')} />
                                            {" Customer Name:"}{item.customerName}</Text>
                                        <Text style={{ fontSize: 14, color: "#800C69", }}>
                                            <Image style={styles.icon} source={require('../assets/conversation.png')} />
                                            {" Refund Reason:"} {item.refundReason}</Text>
                                    </View>

                                    <View style={styles.separator} />

                                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
                                        onPress={() =>
                                            this.setApproval(item)
                                        }
                                    >
                                        <Text style={{ fontSize: 16, color: "#800C69", fontWeight: 'bold', }}>
                                            <Image style={styles.icon} source={require('../assets/hand.png')} />
                                            {/* <MaterialCommunityIcons name="delete" size={20} color={'#800C69'} style={{ padding: 5 }} /> */}
                                            {' '}Approve The Request</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                        onPress={() =>
                                            this.reject(item)
                                        }
                                    >
                                        <Text style={{ fontSize: 16, color: "#800C69", fontWeight: 'bold', }}>
                                            <Image style={styles.icon} source={require('../assets/rejected1.png')} />
                                            {/* <MaterialCommunityIcons name="delete" size={20} color={'#800C69'} style={{ padding: 5 }} /> */}
                                            {' '}Reject The Request</Text>

                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />

            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        // backgroundColor: '#ecf0f1',
        // padding: 8,
        // flexDirection: 'column',
        // alignItems: 'center'
        marginTop: 25,
        flexDirection: 'column',
        alignItems: 'center',
        width: 50,
        height: 50,
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
        borderBottomColor: '#800C69',
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 120,
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
        height: 150,
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
        width: 28,
        height: 28,
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
        // backgroundColor: '#FFFFFF',
    },
    container: {
        width: 350,
        height: 300,
        marginBottom: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
    },
    image: {
        alignSelf: 'flex-start',
        width: '80%',
        height: '80%'
    },

    textContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        textAlign: 'right'

        // alignItems: 'center',
        // justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: "#800C69"
    },
    date: {
        fontSize: 14,
        //color: "#38700F",
        color: "red",
        marginTop: 5,
        fontWeight: "bold",
    },
});
