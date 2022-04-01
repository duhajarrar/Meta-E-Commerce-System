import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Products from '../components/Products'
import { connect } from 'react-redux'
import firebase from "firebase/compat/app"

class pageTwo extends React.Component {

  constructor() {
    super();
    this.docs = firebase.firestore().collection('Bravo');
    this.state = {
      isLoading: true,
      productDB: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getProductDBData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getProductDBData = (querySnapshot) => {
    const productDB = [];
    querySnapshot.forEach((res) => {
      const { id, name, provider,price, image, quantity } = res.data();
      productDB.push({
        key:id+provider,
        id,
        name,
        provider,
        price,
        image,
        quantity
      });
    });
    this.setState({
      productDB,
      isLoading: false
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Products products={this.state.productDB}
          onPress={this.props.addItemToCart}
          ButtonTitle="Buy Now" 
          navigation={this.props.navigation}/>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })

  }
}

export default connect(null, mapDispatchToProps)(pageTwo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
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
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
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
  buyNow: {
    color: "#800C69",
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
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
