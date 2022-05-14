
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

export default class ProviderHome extends Component {


  get Image() {
    switch (this.props.route.params.ProviderName) {
      case "Bravo":
        return require('../images/bravo.png');
      case "Brothers":
        return require('../images/brothers.jpg');
      case "Al-Shini":
        return require('../images/alshini.jpg');
      case "Gardens":
        return require('../images/alshini.jpg');
    }
  }

  goToView() {
    this.props.navigation.navigate('viewProducts', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }

  goToEdit() {
    this.props.navigation.navigate('editProducts', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }

  goToaAdd() {
    this.props.navigation.navigate('addProduct', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }

  importDataFromCSV() {
    // console.log("HHHHHHHHHHHHHere");
    this.props.navigation.navigate('ImportProducts', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }
  goToOrders() {
    this.props.navigation.navigate('ProviderOrders', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }

  goToFeedback() {
    this.props.navigation.navigate('ProviderFeedback', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });
  }

  goToViewOffers() {
    this.props.navigation.navigate('viewProviderOffers', {
      userName: this.props.route.params.userName,
      ProviderName: this.props.route.params.ProviderName
    });

  }



  render() {
    console.log(this.props.route.params);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <Image style={styles.avatar}
            source={this.Image}
          />

          <View
            style={styles.body}
          >
            <View
              style={styles.bodyContent}
            >
              <Text style={styles.name}>
                <Entypo name='shop' size={28} />
                {" "}
                {this.props.route.params.ProviderName}
              </Text>
{/* 
              <TouchableOpacity style={[styles.buttonContainer, { marginTop: 50 }]}
                onPress={() => this.importDataFromCSV()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 10,
                  fontSize: 18
                }}>Import Products</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.buttonContainer]}
                onPress={() => this.goToaAdd()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 10,
                  fontSize: 18
                }}>Add Product</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.buttonContainer}
                onPress={() =>
                  this.goToEdit()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>Edit Product</Text>
              </TouchableOpacity>



              <TouchableOpacity style={styles.buttonContainer}
                onPress={() =>
                  this.goToView()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>Add to Offers</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.buttonContainer}
                onPress={() =>
                  this.goToViewOffers()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>Edit Offers</Text>
              </TouchableOpacity>




              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.goToOrders()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>View Orders</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.goToFeedback()
                }
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>View Feedbacks</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => { this.props.navigation.navigate("ProviderLogin") }}
              >
                <Text style={{
                  color: "white",
                  padding: 5,
                  fontSize: 18
                }}>Log Out</Text>
              </TouchableOpacity> */}

            </View>
          </View>
        </ScrollView>
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
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 5,
    // borderColor: "#38700F",
    borderColor: "grey",
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
    fontSize: 28,
    color: "#38700F",
    fontWeight: "500",
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 190,

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
    marginTop: 10,
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
