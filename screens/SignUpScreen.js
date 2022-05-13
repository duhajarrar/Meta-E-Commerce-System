import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Image
} from 'react-native';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import * as Segment from 'expo-analytics-segment';
import Icon from 'react-native-vector-icons/Ionicons'
import LockIcon from 'react-native-vector-icons/Fontisto'
import IconEmail from 'react-native-vector-icons/Zocial'
import db from '../config';

class SignUpScreen extends React.Component {
  state = {
    r: '', email: '', password: '', errorMessage: '', loading: false, displayName: '', photoURL: '',
    familyName: '', givenName: '', phoneNumber: '', address: '', uid: ''
  };

  onLoginSuccess() {
    this.addUser();
    this.props.navigation.navigate('App',{ ProviderName:"customer", userName:"customer"});
  }

  addUser() {
    db.collection("userList").add({
      displayName: this.state.displayName,
      email: this.state.email,
      photoURL: this.state.photoURL,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  // updateUid = (x) => this.setState({ uid: x })

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  async signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        userCredential.user.sendEmailVerification();
        userCredential.user.updateProfile({
          displayName: this.state.displayName,
          photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        })
        var user = userCredential.user;
        console.log("********************", user)

      })
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (error.code == "auth/email-already-in-use") {
          errorMessage = "The email address is already in use";
        } else if (error.code == "auth/invalid-email") {
          errorMessage = "The email address is not valid.";
        } else if (error.code == "auth/operation-not-allowed") {
          errorMessage = "Operation not allowed.";
        } else if (error.code == "auth/weak-password") {
          errorMessage = "Weak Password \n Password should be at least 6 characters";
        }
        console.log(errorMessage)
        this.onLoginFailure.bind(this)(errorMessage);

      });
    Segment.identify(this.state.email);
    Segment.trackWithProperties("User SignIn", {
      accountType: "CustomEmailAuth",
      email: this.state.email,
      displayName: this.state.displayName,
      // photoURL: this.state.photoURL,
      // phoneNumber: this.state.phoneNumber,

    });

  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image style={styles.logo} source={require('../images/logo1.png')} />

            <Text style={{ fontSize: 32, fontWeight: '700', color: '#800C69', padding: 20 }}>
              Sign Up
            </Text>
            <View>
              <View style={styles.v}>
                <Icon name={'md-person'} size={21} color={'#800C69'}
                  style={styles.inputIcon} />
                {/* <View style={styles.form}> */}
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#B1B1B1"
                  returnKeyType="next"
                  textContentType="name"
                  value={this.state.displayName}
                  onChangeText={displayName => this.setState({ displayName })}
                /></View>
              <View style={styles.v}>
                <IconEmail name={'email'} size={21} color={'#800C69'}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#B1B1B1"
                  returnKeyType="next"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
              </View>


              <View style={styles.v}>
                <LockIcon name={'locked'} size={21} color={'#800C69'}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#B1B1B1"
                  returnKeyType="done"
                  textContentType="newPassword"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'red',
                width: '80%'
              }}
            >
              {this.state.error}
            </Text>

            <TouchableOpacity activeOpacity={.5} style={styles.btnLogin}
              // style={{ width: '20%', marginTop: 20  }}
              onPress={() => this.signInWithEmail()}>
              <Text style={styles.textsubmit}>Sign Up</Text>
            </TouchableOpacity>


            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignIn') }}>
                <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center", fontWeight: 'bold', color: '#800C69' }}> Login Now </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "86%",
    marginTop: 15
  },
  logo: {
    // marginTop: 10,
    height: "30%",
    // height: 400,
    width: 400,
    // flex: 1,
    resizeMode: 'contain'
  },
  input: {
    fontSize: 20,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
    borderRadius: 45,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 48,
    marginHorizontal: 25,
  },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070",
    width: 320,
  },
  pass: {
    height: 20,
    width: 20
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLogin: {
    width: 120,
    height: 120,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logoText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.8
  },
  inputUsername: {
    width: 200,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#e3e3e3',
    color: 'black',
    paddingLeft: 48,
    marginTop: 15,
    marginHorizontal: 25,
    opacity: 0.5
  },
  inputIcon: {
    position: 'absolute',
    top: 21,
    left: 43
  },
  btnEye: {
    position: 'absolute',
    top: 24,
    right: 43
  },
  btnLogin: {
    width: 320,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#800C69',
    justifyContent: 'center',
    marginTop: 30,
  },
  textsubmit: {
    color: 'white',
    // fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 16,
    // color: '#707070'
  },
  textLogin: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
  },
  v: {
    width: 350
  }
});
export default SignUpScreen;