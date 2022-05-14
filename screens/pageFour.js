import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Products from '../components/Products'
import firebase from "firebase/compat/app"
import { connect } from 'react-redux'
import { ListItem, SearchBar } from "react-native-elements";



// Item Component To render single items
function Item(props) {
  return (
    <View style={styles.item}>
      <Text>{props.item.id}: {props.item.name} ({props.item.Category})</Text>
    </View>
  );
}
function useLists() {

  const [fullList, setFullList] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection("Gardens")
      .onSnapshot(snapshot => {
        const fullList = [];
        snapshot.forEach((res) => {
          const { id, name, provider, price, image, quantity, category } = res.data();
          fullList.push({
            key: id + provider,
            id,
            name,
            provider,
            price,
            image,
            quantity: 0,
            category
          });
        });
        setFullList(fullList)
      })
  }, [])
  return fullList
}
// Main App
function pageFour(props) {


  // There are a lot of different ways to keep this info,
  // for the sake of this answer, I've put it in a useState hook

  const fullList = useLists()

  // Keep a statue of the current selected category
  const [category, setCategory] = useState('NONE')
  const [searchValue, setSearchValue] = useState("")
  const [list, setList] = useState([])

  // const [list, setList] = useState([])

  // the filtered list, cached with useMemo
  // the callback is call each time the category or the fullList changes
  const filteredList = useMemo(
    () => {
      if (category === 'NONE') { setList(fullList); return fullList }
      else {
        setList(fullList.filter(item => category === item.category));
        return fullList.filter(item => category === item.category)
      }
    },
    [category, fullList]
  )

  // the onClick Method is a method that returns a method, which
  // updates the state based on the predefined category
  const onClick = (category) => () => {
    setCategory(category)
  }


  const searchFunction = (text) => {
    if (text !== "") {
      const updatedData = list.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`;
        const text_data = text.toUpperCase();
        console.log(text_data);
        console.log(item_data);
        console.log(item_data === text_data);
        console.log(item_data.indexOf(text_data));
        return item_data.indexOf(text_data) > -1;
      });
      setSearchValue(text);
      console.log(text, "++++++++++++++++++++++");
      console.log(updatedData);
      setList(updatedData)
    } else {
      setSearchValue("");
      setList(filteredList)
    }
  };

  // render list using flat list, and the filter bar using standard buttons
  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{ backgroundColor: 'white' }}

        placeholder="ابحث عن منتج من هنا .."
        lightTheme
        round
        value={searchValue}
        onChangeText={(text) => searchFunction(text)}
        autoCorrect={false}
      />
      {/* <Text>Selected category: {category}</Text> */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ScrollView
          horizontal={true}
        >
          <TouchableOpacity style={category == "NONE" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick('NONE')} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>All</Text></TouchableOpacity>
          <TouchableOpacity style={category == "مواد تموينية" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("مواد تموينية")} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>مواد تموينية</Text></TouchableOpacity>
          <TouchableOpacity style={category == "لحوم طازجة" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("لحوم طازجة")} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>لحوم طازجة</Text></TouchableOpacity>
          <TouchableOpacity style={category == "خضار وفواكه" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("خضار وفواكه")} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>خضار وفواكه</Text></TouchableOpacity>
          <TouchableOpacity style={category == "ألبان وأجبان" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("ألبان وأجبان")} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>ألبان وأجبان</Text></TouchableOpacity>
          <TouchableOpacity style={category == "معلبات" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("معلبات")} ><Text style={{ color: "white", padding: 5, fontSize: 14 }}>معلبات</Text></TouchableOpacity>
          <TouchableOpacity style={category == "مشروبات وعصائر" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("مشروبات وعصائر")}><Text style={{ color: "white", padding: 5, fontSize: 14 }}>مشروبات وعصائر</Text></TouchableOpacity>
          <TouchableOpacity style={category == "مواد تنظيف" ? styles.buttonContainer1 : styles.buttonContainer} onPress={onClick("مواد تنظيف")}><Text style={{ color: "white", padding: 5, fontSize: 14 }}>مواد تنظيف</Text></TouchableOpacity>
        </ScrollView>

      </View>

      <Products products={list}
        onPress={props.addItemToCart}
        ButtonTitle="Buy Now"
        navigation={props.navigation}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }

  }
}
export default connect(null, mapDispatchToProps)(pageFour);


// some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'white',
  },
  list: {
    height: '100%',
    width: '100%'
  },
  filterBar: {
    flexDirection: 'row',
    // flex: 0.2,
    height: 40,
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: 'white',
  }
  , buttonContainer: {

    // marginBottom: 50,
    marginLeft: 5,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 5,
    marginTop: 5,
    width: 135,
    borderRadius: 30,
    backgroundColor: "#800C69",
    color: 'white'
  }, buttonContainer1: {

    // marginBottom: 50,
    marginLeft: 5,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 5,
    marginTop: 5,
    width: 135,
    borderRadius: 30,
    backgroundColor: '#2E922E',
    color: 'white'
  },
});
