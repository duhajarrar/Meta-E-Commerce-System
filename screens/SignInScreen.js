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
import * as Google from 'expo-auth-session/providers/google';
// import * as GoogleSignIn from 'expo-google-sign-in';
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

class SignInScreen extends React.Component {

  state = {
    email: null, password: '', errorMessage: '', loading: false, displayName: '', photoURL: '',
    familyName: '', givenName: '', phoneNumber: '', address: ''
  };

  onLoginSuccess() {
    // this.props.navigation.navigate('App',{ProviderName:"customer"});
    this.props.navigation.navigate('App', {
      // userName: this.state.userName,
      ProviderName:"customer",
      userName:"customer",
      email: this.state.email
    });
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  addUser(user) {
    db.collection("userList").doc(user.id).set({
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      phoneNumber: '',
      address: ''
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }


  forgotPassword() {
    if (this.state.email === null)
      alert('Please, enter your email address. You will receive link to create a new password via email.')

    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(function (user) {
        alert('Rest Password link was sent to your email ')
      }).catch(function (e) {
        console.log(e)
      })
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
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)

      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log("NAMEEEEEEEEE", user.displayName);

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
        else if (error.code == "auth/user-not-found") {
          errorMessage = "Uesr Not Found ";
        }
        else if (error.code == "auth/wrong-password") {
          errorMessage = "Worng Password ";
        }
        else if (error.code == "auth/missing-email") {
          errorMessage = "Error : Please fill Email and Password ";
        }
        else if (error.code == "auth/internal-error") {
          errorMessage = "Error : Please fill Password ";
        }

        this.onLoginFailure.bind(this)(errorMessage);

      });

  }

  // async signInWithFacebook() {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: '337956678166688',
  //     });
  //     const { type, token, expirationDate, permissions, declinedPermissions } =
  //       await Facebook.logInWithReadPermissionsAsync({
  //         permissions: ['public_profile'],
  //       });
  //     if (type === 'success') {
  //       // Get the user's name using Facebook's Graph API
  //     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
  //    console.log('Logged in!', `Hi ${(await response.json()).name}!`);
  //       // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  //       const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //       const facebookProfileData = await firebase.auth().signInWithCredential(credential);
  //     this.onLoginSuccess.bind(this);
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //     console.log(message);
  //   }
  // }


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          console.log("old  User", googleUser)
          return true;
        }
      }
    }
    console.log("New User", googleUser)
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    console.log('Google Auth email', googleUser.user.email);

    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken);
        //console.log("''''''''''''''''''''''''''''''''",credential);  
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {

          console.log("user sign in", result);

          if (result.additionalUserInfo.isNewUser) {
            console.log("new USEEEEEEER?", result.additionalUserInfo.isNewUser);
            this.addUser(result.additionalUserInfo.profile);
          }
          firebase
            .database()
            .ref('/users' + result.user.uid)
            .set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.profile_picture,
              locale: result.additionalUserInfo.profile_picture.locale,
              first_name: result.additionalUserInfo.given_name,
              last_name: result.additionalUserInfo.first_name
            })
            .then(function (snapshot) {
            });

        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '731109863491-m7pnmrb7ml2ses9vu3t3nsfkg3spgm9h.apps.googleusercontent.com',
        webClientId: '731109863491-b5981s6u228m4f4t8l1lliceqstgahkq.apps.googleusercontent.com',
        iosClientId: '731109863491-77g059lagdgbkmpoph4497904en22u2o.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (response?.type === 'success') {
        const { id_token } = response.authentication;
        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        await firebase.auth().signInWithCredential(credential);
        this.onSignIn(response);
      } else if (response?.type === 'error') {
        console.error('Google Sign-In Error:', response.error);
      }
    } catch (e) {
      console.error('Error during Google Sign-In:', e);
    }
  };




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
              Login
            </Text>
            <View style={styles.form}>
              {/*<Icon name={'person'} size={28} color={'black'}
            style={styles.inputIcon}/>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              /> */}




              <View>
                <IconEmail name={'email'} size={21} color={'#800C69'}
                  style={styles.inputIcon} />
                <TextInput
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  style={styles.input}
                  returnKeyType="next"
                  placeholder={'Email'}
                  placeholderTextColor={'#B1B1B1'}
                  keyboardType="email-address"
                  textContentType="emailAddress"
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
            </View>
            {this.renderLoading()}
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

            <TouchableOpacity style={{ padding: 5, fontSize: 18, color: "#800C69", textAlign: 'left', fontWeight: 'bold' }}
              onPress={() => this.forgotPassword()}>

              <Text style={{ fontSize: 18, color: "#800C69", textAlign: 'left', fontWeight: 'bold' }} >Forgot Password?</Text>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={.5} style={styles.btnLogin}

              onPress={() => this.signInWithEmail()}>
              <Text style={styles.textsubmit}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => this.signInWithGoogleAsync()}>
              <View style={styles.googleButton}>
                <Icon name="logo-google" size={23} color={'#38700F'} />
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: '#38700F'
                  }}
                >
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "black" }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center", fontWeight: 'bold', color: '#800C69' }}> Register Now </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 35, flexDirection: 'row' }}>
              <Text style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "black" }}>Login as Provider</Text>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProviderLogin') }}>
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
  },
  textLogin: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
  }
});
export default SignInScreen;
