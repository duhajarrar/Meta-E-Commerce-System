import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createAppContainer } from "react-navigation";

import pageOne from '../screens/pageOne';
import pageTwo from '../screens/pageTwo';
import pageThree from '../screens/pageThree';
import pageFour from '../screens/pageFour';
import LoadingScreen from '../screens/LoadingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen.js';
import HomeScreen1 from '../screens/HomeScreen1.js';
import Cart from '../screens/Cart.js'
import CheckOut from '../screens/CheckOut.js'
import edit from '../screens/editProfile'
import orderHistory from '../screens/orderHistory'
import ProviderLogin from '../screens/ProviderLogin'
import ProviderHome from '../screens/ProviderHome'
import addProduct from '../screens/addProduct'
import ImportProducts from '../screens/ImportProducts'
import ProviderMenu from '../screens/ProviderMenu';
import editProducts from '../screens/editProducts'
import viewProducts from '../screens/viewProducts'
import editProd from '../screens/editProd'
import ProviderOrders from '../screens/ProviderOrders'
import Locations from '../screens/Locations'
import setLocation from '../screens/setLocation'
import editAddress from '../screens/editAddress'
import CardPayment from '../screens/CardPayment'
import ProviderFeedback from '../screens/ProviderFeedback'
import Feedbacks from '../screens/Feedbacks';
import ReOrder from '../screens/ReOrder'
import addOffer from '../screens/addOffer'
import viewProviderOffers from '../screens/viewProviderOffers'
import editOffer from '../screens/editOffer'
import specialOffers from '../screens/specialOffers'
import viewSoldOut from '../screens/viewSoldOut'
import PaymentMethod from '../screens/PaymentMethod'
import providerPendingOrders from '../screens/providerPendingOrders'
import userPendingOrders from '../screens/userPendingOrders'
import deliverd from '../screens/deliverd'

const Navigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpScreen },
    SignIn: { screen: SignInScreen },
    pageOne: { screen: pageOne },
    pageTwo: { screen: pageTwo },
    HomeScreen: { screen: HomeScreen },
    HomeScreen1: { screen: HomeScreen1 },
    pageThree: { screen: pageThree },
    pageFour: { screen: pageFour },
    CheckOut: { screen: CheckOut },
    Cart: { screen: Cart },
    edit: { screen: edit },
    ProviderLogin: { screen: ProviderLogin },
    ProviderHome: { screen: ProviderHome },
    addProduct: { screen: addProduct },
    ImportProducts: { screen: ImportProducts },
    ProviderMenu: { screen: ProviderMenu },
    editProducts: { screen: editProducts },
    viewProducts: { screen: viewProducts },
    editProd: { screen: editProd },
    ProviderOrders: { screen: ProviderOrders },
    orderHistory: { screen: orderHistory },
    Locations: { screen: Locations },
    setLocation: { screen: setLocation },
    editAddress: { screen: editAddress },
    CardPayment: { screen: CardPayment },
    ProviderFeedback: { screen: ProviderFeedback },
    Feedbacks: { screen: Feedbacks },
    ReOrder: { screen: ReOrder },
    addOffer: { screen: addOffer },
    viewProviderOffers: { screen: viewProviderOffers },
    editOffer: { screen: editOffer },
    specialOffers: { screen: specialOffers },
    viewSoldOut: { screen: viewSoldOut },
    PaymentMethod: { screen: PaymentMethod },
    providerPendingOrders: { screen: providerPendingOrders },
    userPendingOrders: { screen: userPendingOrders },
    deliverd: { screen: deliverd },
  },
  { initialRouteName: 'Loading' }
);

class AuthNavigator extends React.Component {
  render() {
    return (
      <Navigator style={{ color: "#800C69" }} />
    );
  }
}
export default createAppContainer(

  createSwitchNavigator(
    {
      Auth: Navigator,
      App: HomeScreen,
      // AppProvider: ProviderMenu
    },
    {
      initialRouteName: 'Auth'
    }
  )
);