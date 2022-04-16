import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { Dimensions } from "react-native";
import { TextInput, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Platform, Button, Alert } from 'react-native';

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
var db = firebase.firestore();

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 31.3522;
const LONGITUDE = 35.2332;
const LATITUDE_DELTA = 4;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDjKKs_oh-Yhlilngt6EmiRnn8CbRECmBA";

export default class setLocation extends Component {
  state = { user: {}, city: {}, country: {}, street: {}, moreDescription: {} };
  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user != null) {
        this.setState({ user: user });
      }
    })

  }


  getAddress() {
    return this.state.city + ',' + this.state.country + ':' + this.state.street + ',' + this.state.moreDescription;//format: Palestine,Ramallah,Irsal street:buliding No. 10;
  }

  addAddress() {
    if (this.state.user.email != null) {
      db.collection("usersAddresses").add({
        email: this.state.user.email,
        // address: this.getAddress(),
        city: this.state.city,
        country: this.state.country,
        moreDescription: this.state.moreDescription,
        street: this.state.street
      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  }


  // constructor(props) {
  //   super(props);

  //   // AirBnB's Office, and Apple Park
  //   this.state = {
  //     coordinates: [
  //       {
  //         latitude: 37.3317876,
  //         longitude: -122.0054812
  //       },
  //       {
  //         latitude: 37.771707,
  //         longitude: -122.4053769
  //       }
  //     ]
  //   };

  //   this.mapView = null;
  // }

  // onMapPress = e => {
  //   this.setState({
  //     coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
  //   });
  // };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          placeholder="Country"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          textContentType="country"
          value={this.state.country}
          onChangeText={country => this.setState({ country })}
          style={styles.input}
        />
        <TextInput
          placeholder="City"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          textContentType="city"
          value={this.state.city}
          onChangeText={city => this.setState({ city })}
          style={styles.input}
        />


        <TextInput
          placeholder="Street"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          textContentType="street"
          value={this.state.street}
          onChangeText={street => this.setState({ street })}
          style={styles.input}
        />

        <TextInput
          placeholder="More Description"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          textContentType="moreDescription"
          value={this.state.moreDescription}
          onChangeText={moreDescription => this.setState({ moreDescription })}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.addAddress() & this.props.navigation.navigate("Locations")
            & Alert.alert('Address added')
          }>
          <Text style={{
            color: "white",
            padding: 5,
            fontSize: 18
          }}>Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // style={styles.buttonContainer}
          // onPress={() => this.addAddress() & this.props.navigation.navigate("Locations")
          //   & Alert.alert('Address added')
          // }
          >
          <Text style={{
            color: "white",
            padding: 5,
            fontSize: 18
          }}>Use Current Location</Text>
        </TouchableOpacity>

        {/* <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
        style={StyleSheet.absoluteFill}
        ref={c => (this.mapView = c)}
        onPress={this.onMapPress}>
        {this.state.coordinates.map((coordinate, index) => (
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        ))}
        {this.state.coordinates.length >= 2 && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={
              this.state.coordinates.length > 2
                ? this.state.coordinates.slice(1, -1) : this.state.coordinates.slice(1, 1)
            }
            destination={
              this.state.coordinates[this.state.coordinates.length - 1]
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination
                }"`
              );
            }}
            onReady={result => {
              console.log("Distance: ${result.distance} km");
              console.log("Duration: ${result.duration} min.");

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20
                }
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView> */}
      </View>

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

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    //borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 200,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 2
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
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
    flexDirection: 'column',
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
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: "10%",
    backgroundColor: '#ECD4EA',
    //fontcolor: 'black'
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    marginTop: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#ECD4EA',
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
    marginTop: 5
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
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: "center",

  }, input: {
    fontSize: 18,
    borderColor: "#707070",
    borderWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
    borderRadius: 15,
    // fontWeight: 'bold',
    color: 'black',
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
    flexDirection: 'column',
    flex: 1
  },
  socialBarSection: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',

  },
  socialBarlabel: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  container: {
    width: 350,
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },

  image: {
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%'
  },

  textContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right'

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  camera: {
    alignSelf: 'center',
    margin: 8,

  }, cameraWrapper: {
    position: 'absolute',
    top: 150,
    left: 225,
    backgroundColor: '#800C69',
    width: 40,
    height: 40,
    borderRadius: 100
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#800C69",
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  logo: {
    marginTop: 50,
    height: "20%",
    // height: 400,
    width: "100%",
    // flex: 1,
    resizeMode: 'contain'
  },
});
