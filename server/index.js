import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KkE0nKp6AqW7tekVsUktEjRVxORKt0abudPefXwCYRpYHsEJo6yD7abWCWRqb2KS7Vg3VCEsIM9BtO4D28xtWp600UDl17oRV";
const SECRET_KEY = "sk_test_51KkE0nKp6AqW7tek2TInsIVEIbdW79HWuvLcRJpSMXRcSNcENpIb0p0pWENVUMn7Boi4ezGJhpsTPcbWPfdCygkn00KuMDieP4";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.0.105:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "ILS",
      payment_method_types: ["card"], //by default
    });
      
    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});