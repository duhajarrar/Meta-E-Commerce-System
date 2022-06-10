import React, { Component } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { StyleSheet, ScrollView, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

var db = firebase.firestore();

export default class addProductFromMeta extends Component {


  constructor() {
    super();
    console.log(this.props)
    this.docs = firebase.firestore().collection("MetaData");
    this.state = {
      isLoading: true,
      orderDB: []
    };
  }

  componentDidMount() {
    this.MyDB
    this.unsubscribe = this.docs.onSnapshot(this.getorderDBData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getorderDBData = () => {

    let OrderInf;
    db.collection("MetaData").onSnapshot((querySnapshot) => {
      OrderInf = querySnapshot.docs.map(doc => doc.data());
      this.setState({ orderDB: OrderInf });
    })

  }

  deleteOffer(items) {
    //     console.log('deleteOffer',items);
    //  //   console.log('deleteOffer',items.id);
    //     firebase.firestore().collection("Offers").where("id", "==", items.id).where("provider", "==", items.provider)
    //         .get()
    //         .then(querySnapshot => {
    //             querySnapshot.docs[0].ref.delete();
    //         });

  }

  goToEditOffer(item) {
    // console.log("edit offer");
    // this.props.navigation.navigate('editOffer', {
    //     userName: this.props.route.params.userName,
    //     ProviderName: this.props.route.params.ProviderName,
    //     item: item
    // });
  }

  addNewProduct(item) {
    console.log(item);
    console.log("to >> ", this.props.route.params.ProviderName);
    // if (
    //   item.name !== null &&
    //   item.name.length > 0 &&
    //   item.price !== null &&
    //   item.price.length > 0
    // ) {
    const name = item.name;
    console.log(item.price);
    console.log(item.name);
    firebase
      .firestore()
      .collection(this.props.route.params.ProviderName)
      .add({
        price: item.price,
        category: item.category,
        name: item.name,
        provider: this.props.route.params.ProviderName,
        image: item.image,
        quantity: item.quantity,
        id: item.id,

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log("name1 : ", name);

  }
  render() {
    // console.log(this.state.orderDB)
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <ScrollView
          vertical={true}
        >
          <FlatList // style={{ display: 'flex', flexDirection: 'row' }}
            data={this.state.orderDB}
             numColumns={2}
            renderItem={({ item }) =>
              // <View style={{ display: 'flex', flexDirection: 'row' }}>

              <View style={styles.card}>


                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}{" ₪"}</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{ uri: item.image }} />

                <View style={styles.cardFooter1}>
                  <View style={styles.socialBarContainer}>
                    <View >

                      <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        onPress={() => this.addNewProduct(item) & Alert.alert("Product added", item.name)
                        }>
                        <Text style={{ fontSize: 10, color: "#800C69", fontWeight: 'bold', }}>
                          <MaterialCommunityIcons name="cart-plus" size={12} color={'#2E922E'} />
                          {' '}Add Product</Text>
                      </TouchableOpacity>



                    </View>
                    <View style={styles.socialBarSection}>

                    </View>
                  </View>
                </View>
              </View>

              // </View>


            }
          />
        </ScrollView>

        <View style={styles.cardFooter}>

          <TouchableOpacity style={styles.socialBarButton}
            onPress={() => {
              this.props.navigation.navigate("ProviderLogin")
            }}
          >
            {/* <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6313/6313304.png' }} /> */}
            <AntDesign name="logout" size={23} color={'#800C69'} style={{ padding: 5 }} />

            <Text style={[styles.socialBarLabel, styles.buyNow]}>  Logout </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBarButton}
            onPress={() => {
              this.props.navigation.navigate('ProviderHome', {
                userName: this.props.route.params.userName,
                ProviderName: this.props.route.params.ProviderName
              });
            }}
          >
            {/* <Image style={styles.icon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6313/6313304.png' }} /> */}
            <AntDesign name="home" size={23} color={'#800C69'} style={{ padding: 5 }} />
            <Text style={[styles.socialBarLabel, styles.buyNow]}>  Home </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>


    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    // paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {

    alignItems: 'center'
  },
  separator: {
    marginTop: 5,
  },
  /******** card **************/
  card: {
    height: 190,
    width: 150,
    marginLeft: 20,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 1
    },
    display: 'flex', flexDirection: 'column',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '42%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: "33%"
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardFooter1: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingTop: 12.5,
    // paddingBottom: 25,
    // paddingHorizontal: 16,
    // borderBottomLeftRadius: 1,
    // borderBottomRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    //paddingBottom: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    height: "20%"
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    // height: "20%"
  },
  cardImage: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  /******** card components **************/
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,

  },
  price: {
    fontSize: 14,
    color: "#38700F",

    // marginTop: 5
  },
  buyNow: {
    color: "#800C69",
    fontWeight: 'bold',

  },
  icon: {
    width: 25,
    height: 25,
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
