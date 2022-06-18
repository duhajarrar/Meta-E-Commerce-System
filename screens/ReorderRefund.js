import firebase from "firebase/compat/app"
import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
var db = firebase.firestore();

const { width } = Dimensions.get("window");
// export default class ReorderRefund extends Component {


// function addRefundRequest() {
//   console.log("Xxxxxxxxxxxxxxxxxxxxx");
//   console.log(price);
//   console.log(quantity);
//   console.log(item.name);
//   firebase
//     .firestore()
//     .collection("RefundRequests")
//     .add({
//       refundReason: refundReason,
//       item: item
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
//   // console.log("name1 : ", name);
// }

function ReorderRefund(props) {


  const [requestStatus, setRequestStatus] = useState("");
  const [refundReason, setrefundReason] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState("");


  const addNewProduct = (item) => {

    console.log("userrrr: ", props.route.params.user);
    console.log("item-----------xx: ", item);
    firebase
      .firestore()
      .collection("RefundRequests")
      .add({
        id: db.collection('RefundRequests').doc().id,
        customerName: props.route.params.user.displayName,
        customerEmail: props.route.params.user.email,
        provider: item.provider,
        refundReason: refundReason,
        item: item,
        Approval: false,
        status: "waitForApprovall"

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  const getStatus = (item) => {
    let OrderInf;

    db.collection("RefundRequests")
      .where('customerName', '==', props.route.params.user.displayName)
      .where('customerEmail', '==', props.route.params.user.email)
      .where('customerEmail', '==', props.route.params.user.email)
      .where('item', '==', item)
      .get()
      .then((querySnapshot) => {
        OrderInf = querySnapshot.docs.map(doc => doc.data());
        console.log("RRRRRRrzz", OrderInf, OrderInf[0].status);
        setRequestStatus(OrderInf[0].status);
        console.log("RRRRRRr", requestStatus);


      })
      .catch(function (error) {

        console.log("RRRRRxxx", requestStatus);
        setRequestStatus("")
      });
  }

  const toggleModalVisibilityFalse = (item1) => {
    console.log("isModalVisible before  = ", isModalVisible);
    console.log("In add itemValue", itemValue)

    if (refundReason === "") {
      Alert.alert("Please complete information  refund reason not added ")
      console.log("Product not added, Please complete all information needed ", itemValue.name)
    } else {

      setModalVisible(false);
      addNewProduct(itemValue);
      // console.log("item-----------: ", itemValue);
      // console.log("refundssss ", refundReason);
      Alert.alert("waiting for provider review", itemValue.name);
      // console.log("isModalVisible after  = ", isModalVisible);
      // addNewProduct(itemValue);
    }
  };

  const toggleModalVisibilityFalse1 = () => {
    console.log("isModalVisible before  = ", isModalVisible);

    setModalVisible(false);

    console.log("isModalVisible after  = ", isModalVisible);
  };

  const toggleModalVisibilityTrue = () => {
    console.log("isModalVisible before  = ", isModalVisible);
    setModalVisible(true);
    console.log("isModalVisible after  = ", isModalVisible);
  };



  // console.log("REEEEEEEEEEEEEorder", this.props.route.params.item);
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* <FlatList
        data={props.route.params.item}
        renderItem={({ item }) => ( */}

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
        // onPress={() => { this.props.navigation.navigate("pageOne"); }}
        >
          <View style={styles.container}>
            <View style={styles.infoBoxWrapper}>

              <View
                style={[
                  styles.infoBox,
                  {
                    borderColor: "#800C69",
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Image
                  style={styles.image}
                  source={{ uri: props.route.params.item.image }}
                />
              </View>

              <View
                style={[
                  styles.infoBox,
                  {
                    color: "#800C69",
                    borderColor: "#800C69",
                    borderBottomWidth: 1,

                  },
                ]}
              >
                <Text
                  style={{
                    color: "#38700F",
                    fontSize: 14,
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  {`Provider: `}
                  {props.route.params.item.provider}
                  {`          Name: `}
                  {props.route.params.item.name}
                  {`                    Price: `}
                  {props.route.params.item.price}
                  {`                                  Quantity: `}
                  {props.route.params.item.quantity}
                </Text>




                <View style={styles.separator} />

                {(requestStatus == "") &&
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    // onPress={this.showDialog}
                    onPress={() => { setItemValue(props.route.params.item) & console.log("item set : ", itemValue, " item: ", props.route.params.item) & setModalVisible(true) }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#800C69",
                        fontWeight: "bold",
                      }}
                    >
                      <Image
                        style={styles.icon}
                        source={require("../assets/bank-account.png")}
                      />{" "}
                      Refund
                    </Text>
                  </TouchableOpacity>
                }

                <Modal animationType="slide"
                  transparent visible={isModalVisible}
                  presentationStyle="overFullScreen"
                  onDismiss={toggleModalVisibilityFalse1}>
                  <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}> Why Do You Want To Return The Product?</Text>
                      <Text style={{ paddingBottom: 10, fontSize: 14 }}>{itemValue.name}</Text>


                      <TextInput placeholder="Write refund reason....."
                        placeholderTextColor="#d4d6d9"
                        value={refundReason} style={styles.textInput}
                        onChangeText={(value) => setrefundReason(value)} />

                      <TouchableOpacity
                        style={styles.buttonContainers}
                        // & toggleModalVisibilityFalse(item)
                        onPress={() => {
                          console.log("before itemValue:", itemValue) &
                            toggleModalVisibilityFalse(itemValue)
                        }
                        }
                      >
                        <Text
                          style={{
                            color: "white",
                            padding: 5,
                            fontSize: 18,
                          }}
                        >
                          Confirm
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
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <Text style={{ fontSize: 14, color: "#800C69" }}>
                {/* <Image style={styles.icon} source={require('../assets/calendar.png')} /> */}{" "}
                {`        `}
              </Text>
            </View>
          </View>
        </TouchableOpacity>


        {getStatus(props.route.params.item) && (requestStatus == "")}
        {(requestStatus == "waitForApprovall") ? (
          <View style={[styles.container1, { alignItems: "center", padding: 15 }]}>
            <Image style={styles.image1} source={require('../assets/timer.png')} />
            <Text style={{ fontSize: 14, color: "#800C69", fontWeight: 'bold', paddingTop: 8 }}>Wait for Provider Approvall</Text>
          </View>
        ) : (
          (requestStatus == "Approved") ? (
            <View style={[styles.container1, { alignItems: "center", padding: 15 }]}>
              <Image style={styles.image1} source={require('../assets/approved.png')} />
              <Text style={{ fontSize: 14, color: "#800C69", fontWeight: 'bold', paddingTop: 8 }}>Approved</Text>
            </View>
          ) : (
            (requestStatus == "Rejected") ? (
              <View style={[styles.container1, { alignItems: "center", padding: 15 }]}>
                <Image style={styles.image1} source={require('../assets/rejected.png')} />
                <Text style={{ fontSize: 14, color: "#800C69", fontWeight: 'bold', paddingTop: 8 }}>Rejected</Text>
              </View>
            ) : (
              <View style={[styles.container2, { alignItems: "center", padding: 15 }]}>
                {/* <Image style={styles.image1} source={require('../assets/rejected.png')} />
                <Text style={{ fontSize: 14, color: "#800C69", fontWeight: 'bold', paddingTop: 8 }}>Rejected</Text> */}
              </View>

            )


          )

        )
        }
      </View>
      {/* )
        }
      /> */}
    </SafeAreaView >
  );
}

export default ReorderRefund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    //borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 200,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    //  margin: 2
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
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
    flexDirection: "column",
    alignItems: "center",
  },
  separator: {
    marginTop: 20,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    flexBasis: "47%",
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: "10%",
    backgroundColor: "#ECD4EA",
    //fontcolor: 'black'
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardImage: {
    flex: 1,
    height: 100,
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
    marginTop: 5,
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
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  buyNow: {
    fontSize: 16,
    color: "#800C69",
  },
  icon: {
    width: 30,
    height: 30,
  },
  /******** social bar ******************/
  socialBarContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: "column",
    flex: 1,
  },
  socialBarSection: {
    marginTop: 10,
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-between",
  },
  socialBarlabel: {
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  container: {
    width: 350,
    height: 200,
    // marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    alignSelf: "flex-start",
    width: "80%",
    height: "100%",
  },

  textContainer: {
    flex: 1,
    alignSelf: "flex-end",
    textAlign: "right",

    // alignItems: 'center',
    // justifyContent: 'center'
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#800C69",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  logo: {
    marginTop: 50,
    height: "20%",
    // height: 400,
    width: "100%",
    // flex: 1,
    resizeMode: "contain",
  },

  viewWrapper: {
    height: 350,
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
    height: 330,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    height: "25%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,

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
  image1: {
    width: 55,
    height: 55,
  },
  container1: {
    width: 350,
    height: 120,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

});
