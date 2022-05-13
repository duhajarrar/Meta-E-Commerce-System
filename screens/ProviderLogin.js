
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard, Image
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import LockIcon from 'react-native-vector-icons/Fontisto'
import firebase from "firebase/compat/app"
import IconEmail from 'react-native-vector-icons/Zocial'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import { getAuth } from "firebase/compat/auth";
import { G } from "react-native-svg";

firebase.initializeApp({
  apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
  authDomain: "testregistration-cbec3.firebaseapp.com",
  projectId: "testregistration-cbec3",
  storageBucket: "testregistration-cbec3.appspot.com",
  messagingSenderId: "731109863491",
  appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
  measurementId: "G-3Y36SZEZV9"
});

var db = firebase.firestore();



class ProviderLogin extends React.Component {
  state = {
    userName: null, email: null, password: null, errorMessage: '', loading: false, displayName: '', photoURL: '',
    familyName: '', givenName: '', phoneNumber: '', address: ''
  };

  state = {
    Provider: {}
  };

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }


  onLoginSuccess() {
    
    this.props.navigation.navigate('App', {
      userName: this.state.userName,
      ProviderName:this.state.Provider.ProviderName
    });
  }
  // onLoginSuccess(){
  //   this.props.navigation.navigate('AppProvider')
  // }

  ProviderLogin() {
    // firebase.auth().onAuthStateChanged((user) => {
    if (this.state.userName != null) {
      let userInf;
      let userName = this.state.userName;
      console.log("--", userName)
      db.collection('ProviderList')
        .where('username', '==', userName)
        .get()
        .then((querySnapshot) => {
          userInf = querySnapshot.docs.map(doc => doc.data());
          // this.setState({ userinfo: userInf[0] });
          console.log("Providexxr", userInf[0])
          this.setState({ Provider: userInf[0] });
         // console.log("Provider---", this.state.Provider);
         
         this.Login();
       // this.signInWithEmail()

        })
    }
  }

   signInWithEmail() {
    const result =firebase
      .auth()
      .signInWithEmailAndPassword("test@gmail.com", "testtest")
    }

  Login() {
    if(this.state.Provider!==null) {
    let pass1=this.state.password ;
    let pass2=this.state.Provider.password;

    if (this.state.userName != null
      & this.state.password != null) {

      if (pass1== pass2) {
        console.log("pass1--", pass1," pass2--", pass2,"Provider---", this.state.Provider);
        this.onLoginSuccess();
      } else {
        console.log("pass1--", pass1," pass2--", pass2);
        this.onLoginFailure.bind(this)("Wrong Password","Provider---", this.state.Provider);
      }
    } else {
      this.onLoginFailure.bind(this)("Please Fill Username and Password");
    }
  }
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
            <Text style={{ fontSize: 32, fontWeight: "700", color: "#800C69" }}>
              Provider Login
            </Text>

            <View style={styles.form}>

              <View>
                <IconEmail name={'email'} size={21} color={'#800C69'}
                  style={styles.inputIcon} />
                <TextInput
                  onChangeText={userName => this.setState({ userName })

                  }
                  value={this.state.userName}
                  style={styles.input}
                  returnKeyType="next"
                  placeholder={'username'}
                  placeholderTextColor={'#B1B1B1'}
                  keyboardType="default"
                  textContentType="username"
                />
              </View>

              <View>
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
           
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "red",
                  width: "80%"
                }}
              >
                {this.state.error}
              </Text>

              <TouchableOpacity activeOpacity={.5} style={styles.btnLogin}
                onPress={() => {
                  this.ProviderLogin()
                }}

              >
                <Text style={styles.textsubmit}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 35, flexDirection: 'row' }}>
              <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "black" }}>Login as User?</Text>
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
  // form: {
  //   height:"20%",
  //   width: "86%",
  //   marginTop: 5
  // },
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
  // input: {
  //   fontSize: 20,
  //   borderColor: "#707070",
  //   borderBottomWidth: 1,
  //   paddingBottom: 1.5,
  //   marginTop: 25.5,
  //   borderRadius: 45,
  //   fontWeight: 'bold',
  //   color: '#38700F',
  //   paddingLeft: 48,
  //   marginHorizontal: 25,
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  // },
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
  // inputIcon: {
  //   position: 'absolute',
  //   top: 21,
  //   left: 43,   
  //   paddingVertical: 10,

  // },
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
    width: 340,
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
  },
  textLogin: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
  }
});

export default ProviderLogin;

