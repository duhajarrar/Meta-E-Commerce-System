import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebase from "firebase/compat/app"
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'



var db = firebase.firestore();

export default class editProfile extends Component {

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

  update() {
  this.updateName();
  this.updateAddress();
  this.updatePhone();

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
            console.log("xxxyyxxxx", this.state.userinfo)

          })
      }
    })
  }


  updateAddress() {
    const address = this.state.address
    console.log(address);
    firebase.firestore().collection("userList").where('email', '==', this.state.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ address: address });
          console.log(doc.id, " => ", doc.data());
        });
      })
  }

  updateName() {
    const name = this.state.displayName
    console.log("nameeeee", name);
    firebase.firestore().collection("userList").where('email', '==', this.state.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ displayName: name });
          console.log(doc.id, " => ", doc.data());
        });
      })
  }

  updatePhone() {
    const phone = this.state.phoneNumber
    console.log(phone);
    firebase.firestore().collection("userList").where('email', '==', this.state.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ phoneNumber: phone });
          console.log(doc.id, " => ", doc.data());
        });
      })
  }

  render = () => {

    return (
      <View style={styles.container}>

        <View style={styles.imageWrapper}>
          <Image source={{
            uri: this.state.userinfo.photoURL
          }} style={styles.thumb} />
          <View style={styles.cameraWrapper}>
            <AntDesign style={styles.camera} name='camera' size={22} color='white' />
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailsWrapper}>
            <Text
              style={styles.detailsLabel}>
              <AntDesign name='user' size={20} />
            </Text>
            <TextInput style={styles.textInput}
              placeholderTextColor='grey'
              placeholder={this.state.displayName}
              returnKeyType="next"
              textContentType="name"
              onChangeText={displayName => this.setState({ displayName })
               // & this.updateName()
              }
              value={this.state.displayName}
            // onSubmitEditing ={
            //   // displayName => this.setState({ displayName })
            //   //  &
            //    this.updateName()
            //    & 
            //    this.update()
            // }
            />

            <MaterialIcons style={styles.phone} name='edit' size={35} />
          </View>


          <View style={styles.detailsWrapper}>
            <Text style={styles.detailsLabel}>
              <Fontisto name='email' size={20} />
              {" "}</Text>
            <TextInput style={styles.textInput}
              underlineColorAndroid='transparent'
              //  editable={true}
              keyboardType='email-address'
              placeholder={this.state.userinfo.email}
              placeholderTextColor='grey'
            />
            {/* <MaterialIcons style={styles.phone} name='edit' size={35} /> */}
          </View>


          <View style={styles.detailsWrapper}>
            <Text style={styles.detailsLabel}>
              <Entypo name='location' size={20} />
            </Text>
            <TextInput style={styles.textInput}
              underlineColorAndroid='transparent'
              editable={true}
              keyboardType='email-address'
              placeholder={this.state.address}
              placeholderTextColor='grey'
              value={this.state.address}
              onChangeText={address => this.setState({ address })
                // & this.update() & this.updateAddress()
              }
            // onSubmitEditing ={address => this.setState({ address })
            //   & this.updateAddress() 
            // }



            />
            <MaterialIcons style={styles.phone} name='edit' size={35} />
          </View>


          <View style={styles.detailsWrapper}>
            <Text style={styles.detailsLabel}>
              <Entypo name='phone' size={20} />
            </Text>
            <TextInput style={styles.textInput}
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              editable={true}
              placeholder={this.state.userinfo.phoneNumber}
              placeholderTextColor='grey'
              value={this.state.phoneNumber}
              onTextChange={phoneNumber => this.setState({ phoneNumber })
             //   & this.updatePhone()
              }
            // onSubmitEditing={phoneNumber => this.setState({ phoneNumber })
            //   & this.updatePhone()
            // }
            />
            <MaterialIcons style={styles.phone} name='edit' size={20} />
          </View>

          <View style={styles.button}>
            <Button
              color='white'
              title="UPDATE PROFILE"
              onPress={() => this.update()
                & Alert.alert('profile updated')
              }
            />

          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  };
}



const styles = StyleSheet.create({
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
  }
});

