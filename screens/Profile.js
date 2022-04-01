import React, { Component } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IconEmail from 'react-native-vector-icons/Zocial'

import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity } from 'react-native';

import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
var db = firebase.firestore();
export default class Profile extends Component {

  // state = { user: {} };
  // componentDidMount() {

  //   firebase.auth().onAuthStateChanged((user) => {

  //     if (user != null) {
  //       this.setState({ user: user });
  //     }
  //   })

  // }

  state = {
    email: null, password: '', errorMessage: '', loading: false, displayName: '', photoURL: '',
    familyName: '', givenName: '', phoneNumber: '', address: ''
  };
  state = {
    userinfo: {},
    user: {}
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ email: user.email });
        let userInf;
        db.collection('userList')
          .where('email', '==', user.email)
          .get()
          .then((querySnapshot) => {
            userInf = querySnapshot.docs.map(doc => doc.data());
            this.setState({ userinfo: userInf[0] });
            console.log("USEEr", this.state.userinfo)
            this.setState({ displayName: userInf[0].displayName });
            this.setState({ address: userInf[0].address });
            this.setState({ phoneNumber: userInf[0].phoneNumber });

          })
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{
          uri: this.state.userinfo.photoURL
        }} />

        <View
          style={styles.body}
        >
          <View
            style={styles.bodyContent}
          >
            <Text style={styles.name}>
              <AntDesign name='user' size={25} />
              {" "}  {this.state.displayName}</Text>

            <Text style={styles.name}>
              <IconEmail name='email' size={25} />
              {" "}  {this.state.email}</Text>

            <Text style={styles.name}>
              <Entypo name='location' size={25} />
              {" "}  {this.state.address}</Text>
            <Text style={{ padding: 30 }}>
              {" "}  { }</Text>

            <TouchableOpacity style={styles.buttonContainer}
              onPress={() => { this.props.navigation.navigate("edit") }}
            >
              <Text style={{
                color: "white",
                padding: 5
              }}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}
              onPress={() => { this.props.navigation.navigate("orderHistory") }}
            >
              <Text style={{
                color: "white",
                padding: 5
              }}>View Orders History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#800C69",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    //flex: 2,
    alignItems: 'center',
    padding: 40,
  },
  name: {
    fontSize: 16,
    color: "#38700F",
    fontWeight: "500",
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 299,

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
});
