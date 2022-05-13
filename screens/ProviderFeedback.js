import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import StarRating from 'react-native-star-rating';
import { StyleSheet, SafeAreaView, Text, Image, View, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import { color } from 'react-native-reanimated';

import { useRoute } from '@react-navigation/native';
var db = firebase.firestore();

export default class ProviderFeedback extends Component {



  state = {
    ProviderName: ''
    , rating: null
    , Rate: null
    , Count: null

  }
  state = {
    feedback: null
    , FeedBacks: []
    , user: {}
  }


  state = {
    email: null, password: '', errorMessage: '', isLoading: false, displayName: '', photoURL: '',
    familyName: '', givenName: '', phoneNumber: '', address: ''
  };
  state = {
    userinfo: {},
    user: {},
  };



  constructor(props) {
    super(props);
    this.docs = firebase.firestore().collection('FeedBack')
    //.where('Provider', '==', this.props.route.params.ProviderName)
    this.state = {
      // isLoading: true,
      FeedBackDB: null
      , refresh: false
    };

    this.getRate();

  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getDBData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  getDBData = () => {
    let OrderInf;
    console.log("Provider", this.props.route.params.ProviderName)
    db.collection('FeedBack')
      .where('Provider', '==', this.props.route.params.ProviderName)
      .get()
      .then((querySnapshot) => {
        OrderInf = querySnapshot.docs.map(doc => doc.data());
        console.log("orders", OrderInf)
        //console.log("Provider", this.props.route.params.ProviderName)
        this.setState({ FeedBackDB: OrderInf });
        //console.log("user-orders", this.state.FeedBackDB)
      })
    this.setState({
      //   FeedBackDB,
      isLoading: false
    });
  }




  getRate() {
    let Rating;
    let rate;
    let count;
    db.collection("ProvidersRank")
      .where('ProviderName', '==', this.props.route.params.ProviderName)
      .get()
      .then((querySnapshot) => {
        Rating = querySnapshot.docs.map(doc => doc.data());
        //   console.log(Rating[0].StarCountAvg);
        rate = Rating[0].StarCountAvg;
        count = Rating[0].Count;
        this.setState({ Count: count });
        this.setState({ Rate: rate });
        console.log('xxx', this.state.Rate, this.state.Count)
      })
  }



  render() {
    console.log("TESSSST", this.props.route.params.ProviderName)
    return (

      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.cardHeader}>
          <Text style={styles.buyNow}>
            {this.props.route.params.ProviderName}
            {" "}Feedback
          </Text>
        </View>



        <View style={{
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', paddingTop: 30,
        }}>

          <StarRating
            disabled={true}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            maxStars={5}
            rating={this.state.Rate}
            fullStarColor="#38700F"
            halfStarColor="#38700F"
            emptyStarColor="#38700F"
            halfStarEnabled
            starPadding={10}
            starSize={55}
          />
          <Text style={styles.count}>
            {this.state.Count} Votes
          </Text>
        </View>

        <View style={styles.separator} />

        <FlatList
          style={styles.root}
          data={this.state.FeedBackDB}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) =>
            <View style={styles.container1}>
              <TouchableOpacity onPress={() => { }}>
                <Image style={styles.image}
                  source={{
                    uri: item.photoURL
                  }} />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{item.userName}</Text>
                  <Text style={styles.time}>
                    {item.time}
                  </Text>
                </View>
                <Text rkType='primary3 mediumLine' style={{ paddingTop: 10 }}>{item.comment}</Text>
              </View>
            </View>
          }
        />


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
  input: {
    fontSize: 18,
    borderColor: "#800C69",
    borderWidth: 2,
    paddingBottom: 1.5,
    marginTop: 25.5,
    borderRadius: 15,
    // fontWeight: 'bold',
    color: 'black',
    paddingLeft: 48,
    marginHorizontal: 25,
    width: 320,
    height: 80,
  },
  buttonContainer: {
    marginTop: 15,
    // marginLeft: 140,
    left: "80%",
    //right: "50%",
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 70,
    borderRadius: 20,
    backgroundColor: "#800C69",
    color: 'white'
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container1: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 2,
    backgroundColor: "#800C69"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 5,
    marginRight: 10,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: "grey",

  },
  time: {
    fontSize: 10,
    color: "#808080",
  },
  count: {
    fontSize: 14,
    color: "#808080",
    paddingLeft: '70%',
    paddingBottom: 20
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardFooter: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#ECD4EA',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
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
  buyNow: {
    fontSize: 18,
    color: "#800C69",
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
},
});
