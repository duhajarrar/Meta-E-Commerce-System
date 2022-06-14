import React, { useState, useMemo, useEffect } from 'react';
import { Alert ,Text,Image, View, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Products from '../components/Products'
import firebase from "firebase/compat/app"
import { connect } from 'react-redux'
import { ListItem, SearchBar } from "react-native-elements";
import { AntDesign, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Modal, 
          TextInput, Dimensions } from "react-native";
import { addListener } from 'expo-updates';
  
const { width } = Dimensions.get("window");

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
      .collection("MetaData")
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
            category,
          });
        });


        setFullList(fullList)
      })
  }, [])
  return fullList
}

// Main App
function addProductFromMeta(props) {

  const fullList = useLists()

  // Keep a statue of the current selected category
  const [category, setCategory] = useState('NONE')
  const [searchValue, setSearchValue] = useState("")
  const [list, setList] = useState([])
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
  const addNewProduct = (item) =>{
    console.log("item: ",item);
    console.log("to >> ", props.route.params.ProviderName);
    // if (
    //   item.name !== null &&
    //   item.name.length > 0 &&
    //   item.price !== null &&
    //   item.price.length > 0
    // ) {
    const name = item.name;
    console.log(price);
    console.log(quantity);
    console.log(item.name);
    firebase
      .firestore()
      .collection(props.route.params.ProviderName)
      .add({
        price: price,
        category: item.category,
        name: item.name,
        provider: props.route.params.ProviderName,
        image: item.image,
        quantity: quantity,
        id: item.id,

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log("name1 : ", name);
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


  const [isModalVisible, setModalVisible] = useState(false);
  
  // This is to manage TextInput State
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemValue, setItemValue] = useState("");

  const [inputValue, setInputValue] = useState("");

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibilityFalse = (item1) => {
    console.log("isModalVisible before  = ",isModalVisible);
    console.log("In add itemValue",itemValue)
    // setModalVisible(false);

    // if(isModalVisible){
    //     setModalVisible(true);
    // }else{
        if(price === "" || quantity === ""){
          Alert.alert("Please complete product information  ","Product named: "+ itemValue.name + " not added ")
          console.log("Product not added, Please complete all information needed ",itemValue.name)
        }else{
        setModalVisible(false);
        addNewProduct(itemValue) ; 
        Alert.alert("Product added", itemValue.name)

    console.log("isModalVisible after  = ",isModalVisible);
        }
  };

  const toggleModalVisibilityFalse1 = () => {
    console.log("isModalVisible before  = ",isModalVisible);
   
        setModalVisible(false);

    console.log("isModalVisible after  = ",isModalVisible);
  };

  const toggleModalVisibilityTrue = () => {
    console.log("isModalVisible before  = ",isModalVisible);
    setModalVisible(true);
    console.log("isModalVisible after  = ",isModalVisible);
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
              {/* <Button title="Show Modal" onPress={toggleModalVisibility} /> */}

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

           <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={list}
          horizontal={false}
          numColumns={2}
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
           
            // console.log("--", props.name)
            // this.setState({providerName:this.props.products[0].provider})
            return (
              <View style={styles.card}>

                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    {/* <Text style={styles.price}>{item.price}{" ₪"}</Text> */}
                  </View>
                </View>

                <Image style={styles.cardImage} source={{ uri: item.image }} />

                <View style={styles.cardFooter1}>
                  <View style={styles.socialBarContainer}>
                    <View >

                      <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        onPress={()=> {setItemValue(item)  & console.log("item set : ",itemValue," item: ",item) & setModalVisible(true)}
                          //  addNewProduct(item) && Alert.alert("Product added", item.name)
                        }>
                        <Text style={{ fontSize: 10, color: "#800C69", fontWeight: 'bold', }}>
                          <MaterialCommunityIcons name="cart-plus" size={12} color={'#2E922E'} />
                          {' '}Add Product</Text>
                      </TouchableOpacity>
    
                <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibilityFalse1}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                      <Text style={{paddingBottom:10,fontSize:18,fontWeight:"bold"}}>Complete Product Info</Text>
                      <Text style={{paddingBottom:10,fontSize:14}}>{itemValue.name}</Text>
                        <TextInput placeholder="Enter Quantity " 
                                   value={quantity} style={styles.textInput} 
                                   onChangeText={(value) => setQuantity(value)} />
                        <TextInput placeholder="Enter Price " 
                                   value={price} style={styles.textInput} 
                                   onChangeText={(value) => setPrice(value)} />
  
                        {/** This button is responsible to close the modal */}
                        {/* && setItem(item) */}
                        {/* <Button title="Confirm add product" onPress={()=> toggleModalVisibilityFalse(item)} /> */}
                    
                        <TouchableOpacity
                  style={styles.buttonContainers}
                  // & toggleModalVisibilityFalse(item)
                  onPress={() => { console.log("before itemValue:",itemValue)&
                    toggleModalVisibilityFalse(itemValue)}
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 5,
                      fontSize: 18,
                    }}
                  >
                    Confirm add product
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainers1}
                  onPress={
                    toggleModalVisibilityFalse1
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                    </View>
                </View>
            </Modal>

                    </View>
                    <View style={styles.socialBarSection}>

                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        />
        
    </View>
  );
}
// export default connect(null, mapDispatchToProps)(addProductFromMeta);
export default addProductFromMeta;



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
    },
    buttonContainers: {
      // marginBottom: 50,
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
      marginTop: 15,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#800C69",
      color: "white",
    },
    buttonContainers1: {
      // marginBottom: 50,
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      // marginTop: 15,
      width: 250,
      borderRadius: 30,
      backgroundColor: "#800C69",
      color: "white",
    },
     buttonContainer: {
  
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
    },
    buttonContainer1: {
  
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
    },  /******** card **************/
    card: {
      height: 190,
      width: 150,
      marginLeft: 20,
      shadowColor: '#00000021',
      shadowOffset: {
        width: 1
      },
      display: 'flex', flexDirection: 'column',
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginVertical: 8,
      backgroundColor: "white",
      flexBasis: '42%',
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
      flex: 1,
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
  
    }, screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
  },
  viewWrapper: {
      height: 300,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) }, 
                  { translateY: -90 }],
      height: 300,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
  textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
      
  },
  });
  
