import React, { Component } from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { AntDesign, Entypo, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

import {
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Button,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
var db = firebase.firestore();
export default class addProduct extends Component {
  state = { id: {}, name: {}, uri: {}, provider: {}, price: {}, quantity: {} };
  componentDidMount() {
    this.MyDB;
  }
  addNewProduct() {
    if (
      this.state.name !== null &&
      this.state.name.length > 0 &&
      this.state.price !== null &&
      this.state.price.length > 0
    ) {
      const name = this.state.name;
      // console.log(this.state.price);
      // console.log(this.state.name);
      firebase
        .firestore()
        .collection(this.MyDB)
        .add({
          price: this.state.price,
          name: this.state.name,
          provider: this.MyDB,
          // image:this.state.uri,
          image:
            "https://media.istockphoto.com/photos/new-product-round-red-seal-picture-id188020497?k=20&m=188020497&s=612x612&w=0&h=14l5TS8674-Q2dx3PHcciIEuTZ9ULXH4lUObdWmBOIY=",
          quantity: this.state.quantity,
          id: this.state.id,
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
     // console.log("name1 : ", name);
    }
  }

  get MyDB() {
    const yourParam = this.props.route.params.ProviderName;
    //console.log(yourParam);
    return yourParam;
  }

  render() {
    firebase
      .firestore()
      .collection("Al-Shini-DB")
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.size);
        this.setState({ id: querySnapshot.size });
        // console.log(this.state.id);
      });
    //console.log(this.state.uri);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
        {/* Header */}
        

        <View style={{ style: styles.container, alignItems: "center" }}>
          <View style={{ style: styles.details, justifyContent: "center" }}>
            {/* /* 
            PUT YOUR CODE HERE !!!!!!!!!!!!!!!!!!          
            .
            .
            .
            .
         */}
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: 200, height: 200, marginTop: 50 }}
                source={{
                  uri: "https://media.istockphoto.com/photos/new-product-round-red-seal-picture-id188020497?k=20&m=188020497&s=612x612&w=0&h=14l5TS8674-Q2dx3PHcciIEuTZ9ULXH4lUObdWmBOIY=",
                }}
              />

      
              <TextInput
                placeholder="Product Name"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />

              <TextInput
                placeholder="Quantity"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="number"
                textContentType="number"
                value={this.state.quantity}
                onChangeText={(quantity) => this.setState({ quantity })}
                style={styles.input}
              />

              <TextInput
                placeholder="Price"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="number"
                textContentType="number"
                value={this.state.price}
                onChangeText={(price) => this.setState({ price })}
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.addNewProduct() & Alert.alert("Product added")
                }
              >
                <Text
                  style={{
                    color: "white",
                    padding: 5,
                    fontSize: 18,
                  }}
                >
                  Add product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


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

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    //borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 200,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    //margin: 2
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
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
    flexDirection: "column",
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: "10%",
    backgroundColor: "#ECD4EA",
    //fontcolor: 'black'
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    marginTop: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: "#ECD4EA",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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
    marginTop: 5,
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
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    fontSize: 18,
    borderColor: "#707070",
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
    flexDirection: "column",
    flex: 1,
  },
  socialBarSection: {
    marginTop: 10,
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-between",
  },
  socialBarlabel: {
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  container: {
    width: 350,
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    alignSelf: "flex-start",
    width: "100%",
    height: "100%",
  },

  textContainer: {
    flex: 1,
    alignSelf: "flex-end",
    textAlign: "right",

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  camera: {
    alignSelf: "center",
    margin: 8,
  },
  cameraWrapper: {
    position: "absolute",
    top: 150,
    left: 225,
    backgroundColor: "#800C69",
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#800C69",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  logo: {
    marginTop: 50,
    height: "20%",
    // height: 400,
    width: "100%",
    // flex: 1,
    resizeMode: "contain",
  },
});

let openImagePickerAsync = async () => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  // console.log(pickerResult);
  // console.log(pickerResult.uri, " before ++++");
  pickerResult.uri = pickerResult.uri.replace("file://", "");
  // console.log(pickerResult.uri, " after ++++");
  this.setState({ uri: pickerResult });
};

