import React, { Component } from 'react'; import { Text, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();

export default class CheckOut extends Component {
  state = { user: {}, address: '', addressDB: [], email: {} };

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user != null) {
        this.setState({ user: user });
        this.setState({ email: user.email });
      }
    })

  }
  getAddressDBData = () => {

    let AddressInf;

    db.collection("usersAddresses")
      .where('email', '==', this.state.email)
      .get()
      .then((querySnapshot) => {
        AddressInf = querySnapshot.docs.map(doc => doc.data());
        this.setState({ addressDB: AddressInf });
        // console.log("GET DATA , ",this.state.email);
      })

  }
  getAddress(item) {
    return item.country + ',' + item.city + ',' + item.street + ',' + item.moreDescription;//format: Palestine,Ramallah,Irsal street,buliding No. 10;
  }

  getCurrentDate() {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }

  addOrder(orders) {
    this.addPendingOrders(orders);
    orders.forEach((obj) => {
      db.collection("Orders").add({
        customerName: this.state.user.displayName,
        customerEmail: this.state.user.email,
        OrderDate: this.getCurrentDate(),
        OrderTimestamp: new Date().valueOf(),
        product_name: obj.name,
        product_provider: obj.provider,
        product_price: obj.price,
        product_image: obj.image,
        product_quantity: obj.quantity,
        address: this.state.address

      });
      db.collection("OrdersCheckedOut").add({
        customerName: this.state.user.displayName,
        customerEmail: this.state.user.email,
        OrderDate: this.getCurrentDate(),
        product_name: obj.name,
        product_provider: obj.provider,
        product_price: obj.price,
        product_image: obj.image,
        product_quantity: obj.quantity,
        address: this.state.address
      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  }

  addPendingOrders(orders) {
    orders.forEach(obj => {
      obj['itemStatus'] = "in preparation";
    });

    console.log("ooooooooooooo", orders);
    db.collection("PendingOrders").add({
      id: db.collection('PendingOrders').doc().id,
      customerName: this.state.user.displayName,
      customerEmail: this.state.user.email,
      OrderDate: this.getCurrentDate(),
      OrderTimestamp: new Date().valueOf(),
      address: this.state.address,
      TotalPrice: this.props.route.params.TotalAmount,
      OrderProducts: orders,
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  Success() {
    if (this.state.addressDB.length === 0) {

      Alert.alert("Please Add Address");
    }
    else if (this.state.address == '') {
      console.log("Please Select Address");
      Alert.alert("Please Select Address");
    }
    else {
      // this.addOrder(this.props.route.params.products)
      // if (this.props.route.params.clearCart != null) {
      //   this.props.route.params.clearCart()
      // }
      this.props.navigation.navigate("PaymentMethod", {
        TotalAmount: this.props.route.params.TotalAmount,
        clearCart: this.props.route.params.clearCart,
        products: this.props.route.params.products,
        address: this.state.address,
      });
    }
  }

  render() {

    this.getAddressDBData();
    let pickerItems = this.state.addressDB.map((s, i) => {
      // console.log(s);
      return <Picker.Item key={i} value={this.getAddress(s)} label={this.getAddress(s)} />
    });
    return (

      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center", fontWeight: 'bold', }}
      >
        {(this.state.addressDB.length === 0)
          &&
          <View>
            <Text style={{
              fontSize: 14,
              textAlign: 'center',
              color: 'red',
              width: '80%'
            }}>No addresses Found ,Please try again</Text>
          </View>
        }
        {/* <Text>CheckOut Screen</Text> */}
        <Picker
          selectedValue={this.state.address}
          onValueChange={(value, index) =>
            this.setState({ address: value })
          }
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label=" Select Address" value="Unknown" />
          {pickerItems}
        </Picker>
        <Text style={styles.text}>Your address: {this.state.address}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.Success();
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 5,
              fontSize: 18,
            }}
          >
            Check out Order
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //   backgroundColor: 'yellow'
  },
  text: {
    fontSize: 24,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  }, buttonContainer: {
    // marginBottom: 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#800C69",
    color: 'white'
  },

});