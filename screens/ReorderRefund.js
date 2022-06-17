import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import Prompt from 'react-native-single-prompt';
//import {Modal} from 'react-native';
import Dialog from "react-native-dialog";

import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
var db = firebase.firestore();

export default class ReorderRefund extends Component {

    constructor(props) {
        super(props);
        this.state = {visible : false};

        this.docs = firebase.firestore().collection('RefundRequests')

      } 

  //state = {visible : false};

  //setVisible=()=>this.setState({visible: true})  

  state = {
    feedback: null,
    user: {},
  };


  state = {
    email: null,
    password: "",
    errorMessage: "",
    isLoading: false,
    displayName: "",
    photoURL: "",
    givenName: "",
    phoneNumber: "",
    address: "",
  };

  //     comment
  // ""
  // customerName
  // ""
  // product_name
  // ""
  // product_price
  // 0
  // product_provider
  // ""
  // product_quantity
  // 0
  // status
  // true

   showDialog = () => {
   // setVisible(true);
   this.setState({visible:true});
  };

   handleCancel = () => {
    //setVisible(false);
    this.setState({visible:false});

  };

   handleSend = (item) => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    //setVisible(false);
    console.log("printing item ........",item);
    this.addComment(item);
  };

  addComment(item) {

   // if (this.state.feedback != null) {
    console.log("leeeeeeeeeeena");
        Alert.alert("Your message is sent successfully....waiting for provider approval.")
        //this.setState({ feedback: null })
        db.collection("RefundRequests").add({
        //    customerName: this.state.displayName,
            //   comment: this.state.feedback,
        //     product_provider: this.props.route.params.item.provider,
        //     product_price: this.props.route.params.item.price,
        //     product_quantity:this.props.route.params.item.quantity,
        //     product_name:this.props.route.params.item.name,
          //  comment:"leeeeeeeena",
            product:item,
        })
            .catch(function (error) {
                console.error("Error sending message: ", error);
            });

   // } else {
     //   Alert.alert("Please Write a message")
   // }

}

getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var suffix = (hours >= 12) ? 'pm' : 'am';
    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hours = (hours > 12) ? hours - 12 : hours;
    min = (min < 10) ? "0" + min : min;
    //if 00 then it is 12 am
    hours = (hours == '00') ? 12 : hours;
    console.log("thistime-hours", hours)
    var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + " " + suffix;
    console.log("user-time", finalObject)
    return finalObject;
}



  render() {
   // console.log("REEEEEEEEEEEEEorder", this.props.route.params.item);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
        <FlatList
          data={this.props.route.params.item.OrderProducts}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
              // onPress={() => { this.props.navigation.navigate("pageOne"); }}
              >
                <View style={styles.container}>
                  <View style={styles.infoBoxWrapper}>
                    <View
                      style={[
                        styles.infoBox,
                        {
                          borderColor: "white",
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderLeftWidth: 1,
                        },
                      ]}
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                      />
                    </View>

                    <View
                      style={[
                        styles.infoBox,
                        {
                          color: "#90EE90",
                          borderColor: "white",
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderLeftWidth: 1,
                        },
                      ]}
                        >
                      <Text
                        style={{
                          color: "#38700F",
                          fontSize: 14,
                          fontWeight: "bold",
                          marginTop: 20,
                        }}
                      >
                        {`Provider: `}
                        {item.provider}
                        {`          Name: `}
                        {item.name}
                        {`                    Price: `}
                        {item.price}
                        {`                                  Quantity: `}
                        {item.quantity}
                      </Text>

                      <View style={styles.separator} />
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={this.showDialog}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#800C69",
                            fontWeight: "bold",
                          }}
                        >
                          <Image
                            style={styles.icon}
                            source={require("../assets/bank-account.png")}
                          />{" "}
                          Refund
                        </Text>
                      </TouchableOpacity>
                     < Dialog.Container visible={this.state.visible}>
                            <Dialog.Title>
                              Why Do You Want To Return The Product?{" "}
                            </Dialog.Title>
                            <Dialog.Input placeholder="   Write refund reason....."
                             value={this.state.feedback}
                             onChangeText={feedback => this.setState({ feedback })}
                            
                            ></Dialog.Input>
                            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                            <Dialog.Button label="Send" onPress={this.handleSend(item)} />
                          </Dialog.Container>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "#800C69" }}>
                      {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}{" "}
                      {`        `}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
    //  margin: 2
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
    marginTop: 20,
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
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardImage: {
    flex: 1,
    height: 100,
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
  buyNow: {
    fontSize: 16,
    color: "#800C69",
  },
  icon: {
    width: 30,
    height: 30,
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
    width: "80%",
    height: "100%",
  },

  textContainer: {
    flex: 1,
    alignSelf: "flex-end",
    textAlign: "right",

    // alignItems: 'center',
    // justifyContent: 'center'
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
