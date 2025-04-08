import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
// import { CreditCardInput } from "react-native-credit-card-input";
//ADD localhost address of your server
const API_URL = "http://172.19.208.1:3000";

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [amount, setAmount] = useState("0");
  const finalAmount = props.TotalAmount;
  console.log("finalAmount in StripeApp Screen==",finalAmount);
  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {amount:finalAmount}),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (cardDetails?.cvc==''||cardDetails?.expiry==''||cardDetails?.number==''||cardDetails?.type=='') {
      Alert.alert("Please Enter Complete Card Details");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    //Alert.alert("Payment Failed");
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    
    } catch (e) {
      //Alert.alert("Payment Failed");
      console.log(e);
      
    }
    //3.Confirm the payment with the card details
  };

  return (
   
    
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}


     { /*<CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {console.log('card Details===>',cardDetails)&
          setCardDetails(cardDetails);
        }}
      />*/}

     {/* { <CreditCardInput style={styles.cardContainer}
        onChange={
          cardDetails => {console.log('card Details===>',cardDetails)&
          setCardDetails(cardDetails);
         }}
        placeholders={{
          number: "4242 4242 4242 4242",expiry: "MM/YY", cvc: "CVC"
         }}
        /> */
        <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
          expiration: "MM/YY",
          cvc: "CVC",
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          fontSize: 16,
          placeholderColor: '#A9A9A9',
        }}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          console.log('card Details ===>', cardDetails);
          setCardDetails(cardDetails);
        }}
      />
        
        }
      
     <View style={styles.container}>

     <Button onPress={handlePayPress} title="Pay" disabled={loading}/>
     </View>
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    marginTop :70,
   // padding: 16,
   // marginBottom: 16,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    marginTop :50,
  },
});