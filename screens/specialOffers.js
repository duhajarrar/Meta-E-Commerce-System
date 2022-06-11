import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'


import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { connect } from 'react-redux'

const firebaseConfig = {
    apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
    authDomain: "testregistration-cbec3.firebaseapp.com",
    projectId: "testregistration-cbec3",
    storageBucket: "testregistration-cbec3.appspot.com",
    messagingSenderId: "731109863491",
    appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
    measurementId: "G-3Y36SZEZV9"
}

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


class specialOffers extends Component {

    state = { providerName: '', EndDate: false };

    constructor() {
        super();
        this.docs = firebase.firestore().collection('Offers').orderBy('endDate');
        this.state = {
            isLoading: true,
            productDB: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getDBData);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }




    getDBData = (querySnapshot) => {
        const productDB = [];
        querySnapshot.forEach((res) => {
            const { id, name, provider, price, originalPrice, image, quantity, withEndDate, endDate } = res.data();
            productDB.push({
                key: id + provider + name,
                id,
                name,
                provider,
                price,
                image,
                quantity: 0,
                originalPrice,
                withEndDate,
                endDate,
                isOffer: true,
            });
        });
        this.setState({
            productDB,
            isLoading: false
        });
    }

    CheckDate(item) {
        if (item.withEndDate) {
            if (item.endDate < new Date().valueOf())
                this.deleteOffer(item);
        }
    }

    deleteOffer(items) {
        console.log('deleteOffer', items);
        //   console.log('deleteOffer',items.id);
        firebase.firestore().collection("Offers").where("id", "==", items.id).where("provider", "==", items.provider)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

    }



    render() {
        console.log(this.state.productDB)
        return (

            <View style={styles.container}>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.productDB}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    renderItem={(post) => {

                        const item = post.item;

                        this.CheckDate(item);

                        //console.log("--", this.props.name)
                        // this.setState({providerName:this.props.products[0].provider})
                        return (
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View style={{
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        flex: 1,
                                    }}>

                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                        }}>
                                            <EntypoIcon name="shop" size={24} color={'#2E922E'} />
                                            <Text style={styles.price}>{" "}{item.provider}</Text>
                                        </View>

                                        <Text style={styles.title}>{item.name}</Text>

                                        {(item.withEndDate)?
                                            (
                                            <View >
                                                <Text style={styles.date} >
                                                    <MaterialCommunityIcons name="calendar-clock" size={18} color={'#2E922E'} />
                                                    {" "}{new Date(item.endDate).getFullYear()}-{new Date(item.endDate).getMonth() + 1}-{new Date(item.endDate).getDate()}
                                                </Text>
                                            </View>
                                            ):(
                                                <View >
                                                <Text style={styles.date} >
                                                    {/* <MaterialCommunityIcons name="calendar-clock" size={18} color={'#2E922E'} />
                                                    {" "}{new Date(item.endDate).getFullYear()}-{new Date(item.endDate).getMonth() + 1}-{new Date(item.endDate).getDate()} */}
                                                </Text>
                                            </View>

                                                
                                            )
                                        }
                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                        }}>
                                            <Text style={{
                                                textDecorationLine: 'line-through', fontSize: 14,
                                                color: "#38700F",
                                                marginTop: 5
                                            }}>{item.originalPrice}{" ₪"}</Text>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "red", marginTop: 5 }}> {item.price}{" ₪"}</Text>
                                        </View>



                                    </View>
                                </View>

                                <Image style={styles.cardImage} source={{ uri: item.image }} />

                                <View style={styles.cardFooter}>
                                    <View style={styles.socialBarContainer}>
                                        <View >
                                            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                                onPress={() => this.props.addItemToCart(item) &
                                                    Alert.alert('Added to Cart successfully')}>
                                                <Text style={{ fontSize: 14, color: "#800C69", fontWeight: 'bold', }}>
                                                    <MaterialCommunityIcons name="cart-plus" size={16} color={'#2E922E'} />
                                                    {' '}Add To Cart</Text>
                                            </TouchableOpacity>


                                        </View>
                                    </View>
                                </View>


                            </View>
                        )
                    }}
                />
                {/* <View style={styles.cardFooter}>


          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => { this.props.navigation.navigate("Cart") }} >
            <Text style={{ fontSize: 16, color: "#800C69", }}>
              <AntDesignIcon name="shoppingcart" size={20} color={'#2E922E'} />
              {" "}  My Cart
            </Text>
          </TouchableOpacity>

        </View> */}


            </View>
        );
    }

}
const mapDispatchToProps = (dispatch) => {
    return {

        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })

    }
}

export default connect(null, mapDispatchToProps)(specialOffers);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        height: 20,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
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
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        // flex: 1,
        height: 66,
        // width: null,
        // flex: 1,
        aspectRatio: 3,
        resizeMode: 'contain',
    },
    /******** card components **************/
    title: {
        fontSize: 14,
        flex: 1,
        fontWeight: "bold",
    },
    price: {
        fontSize: 14,
        color: "#38700F",
        marginTop: 5,
        fontWeight: "bold",
    },
    date: {
        fontSize: 12,
        //color: "#38700F",
        color: "red",
        marginTop: 5,
        fontWeight: "bold",
    },
    buyNow: {
        color: "#800C69",

    },
    icon: {
        width: 20,
        height: 20,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        paddingLeft: "50%",
        textAlign: "center",


    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",

    }
});