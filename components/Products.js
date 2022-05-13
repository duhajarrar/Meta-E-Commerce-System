import React, { Component } from "react";
import {
  SafeAreaView, Button, StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
  authDomain: "testregistration-cbec3.firebaseapp.com",
  projectId: "testregistration-cbec3",
  storageBucket: "testregistration-cbec3.appspot.com",
  messagingSenderId: "731109863491",
  appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
  measurementId: "G-3Y36SZEZV9"
}

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


class Products extends Component {
  state = { providerName: '' }


  update() {
    const comment = "test"
    // console.log(address);
    firebase.firestore().collection("FeedBack").where('userName', '==', "test")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ comment: comment });
          console.log(doc.id, " => ", doc.data());
        });
      })
  }
  addComment() {

    firebase.firestore().collection("FeedBack").where("comment", "==", "test").get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
      });


    db.collection("FeedBack").add({
      userName: "test",
      comment: "test",
      photoURL: "test",
      Provider: "tst",
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  onLoginFeedbackSuccess() {
    console.log("feedback successful --------------------");
    this.addComment();

    this.props.navigation.navigate('Feedbacks', {
      // items: this.props.products,
      ProviderName: this.props.products[0].provider,
      isLoading: false
    })
  }
  // this.props.navigation.setOptions({
  //   title: this.props.products[0].provider +" Feedback",
  // })

  render() {

    return (

      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.props.products}
          horizontal={false}
          numColumns={3}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {

            const item = post.item;
            console.log("--", this.props.name)
            // this.setState({providerName:this.props.products[0].provider})
            return (
              <View style={styles.card}>

                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}{" ₪"}</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{ uri: item.image }} />

                <View style={styles.cardFooter1}>
                  <View style={styles.socialBarContainer}>
                    <View >

                      <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        onPress={() => this.props.onPress(item) &
                          Alert.alert('Added to Cart successfully')
                        }>
                        <Text style={{ fontSize: 12, color: "#800C69", fontWeight: 'bold', }}>
                          <MaterialCommunityIcons name="cart-plus" size={16} color={'#2E922E'} />
                          {' '}Buy Now</Text>
                      </TouchableOpacity>



                    </View>
                    <View style={styles.socialBarSection}>

                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        />

        <View style={styles.cardFooter}>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => { this.props.navigation.navigate("Cart") }} >
            <Text style={{ fontSize: 16, color: "#800C69", }}>
              <AntDesignIcon name="shoppingcart" size={20} color={'#2E922E'} />
              {" "}  My Cart
            </Text>
          </TouchableOpacity>

          {/* 
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              this.onLoginFeedbackSuccess();
            }
            }
          >
            <Text style={{ fontSize: 16, color: "#800C69", }}>
              <MaterialIcons name="feedback" size={20} color={'#2E922E'} />
              {" "}  Feedback
            </Text>
          </TouchableOpacity> */}

        </View>


      </View>
    );
  }

}

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    // paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 5,
  },
  /******** card **************/
  card: {
    height: 190,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: '31%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: "33%"
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardFooter1: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingTop: 12.5,
    // paddingBottom: 25,
    // paddingHorizontal: 16,
    // borderBottomLeftRadius: 1,
    // borderBottomRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    //paddingBottom: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    height: "20%"
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
   // height: "20%"
  },
  cardImage: {
    //flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  /******** card components **************/
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    
  },
  price: {
    fontSize: 14,
    color: "#38700F",
    
    // marginTop: 5
  },
  buyNow: {
    color: "#800C69",
    fontWeight: 'bold',

  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    paddingLeft: "50%",
    textAlign: "center",


  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",

  }
});
