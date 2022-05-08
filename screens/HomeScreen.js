import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import  Fontisto  from 'react-native-vector-icons/Fontisto'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen1 from '../screens/HomeScreen1'
import SettingScreen from '../screens/SettingScreen'
import pageOne from '../screens/pageOne';
import pageTwo from '../screens/pageTwo';
import pageThree from '../screens/pageThree';
import pageFour from '../screens/pageFour';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import CheckOut from '../screens/CheckOut'
import edit from '../screens/editProfile'
import Locations from '../screens/Locations.js';
import setLocation from '../screens/setLocation.js';
import orderHistory from '../screens/orderHistory';
import ProviderLogin from '../screens/ProviderLogin';
import ProviderHome from '../screens/ProviderHome';
import addProduct from '../screens/addProduct';
import editProducts from '../screens/editProducts'
import viewProducts from '../screens/viewProducts'
import editProd from '../screens/editProd'
import ProviderOrders from '../screens/ProviderOrders'
import editAddress from '../screens/editAddress'
import CardPayment from '../screens/CardPayment'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProviderFeedback from './ProviderFeedback'
import Feedbacks from '../screens/Feedbacks'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ReOrder from '../screens/ReOrder'
import addOffer from '../screens/addOffer'
import viewProviderOffers from './viewProviderOffers'
import editOffer from '../screens/editOffer'
import specialOffers from '../screens/specialOffers'


const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {

  return (

    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <AntDesignIcon name="logout" size={25} color={'#800C69'} style={{ padding: 5 }} />}
        style={{ marginTop: '65%' }}
        label="Logout" onPress={() => {
          firebase.auth().signOut();
        }

        } />

    </DrawerContentScrollView>
  );
}

class HomeScreen extends React.Component {

  state = { user: {} };
  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
      }
    })

  }
  render() {

    return (
      <NavigationContainer style={{ backgroundColor: "#800C69", color: "#800C69" }}>
        <Drawer.Navigator initialRouteName="HomeScreen1" drawerContent={props => <CustomDrawerContent {...props} />}>



          <Drawer.Screen name="Shops" component={HomeScreen1} style={{ color: "#800C69" }}
            options={{
              title: 'Shops',
              drawerIcon: ({ focused, size }) => (
                <EntypoIcon name="shop" size={25} color={'#800C69'} style={{ padding: 0 }} />
              ),
            }} />
          <Drawer.Screen name="Cart" component={Cart} style={{ color: "#800C69" }}
            options={{
              title: 'My Cart',
              drawerIcon: ({ focused, size }) => (
                <AntDesignIcon name="shoppingcart" size={25} color={'#800C69'} style={{ padding: 0 }} />
              ),
            }}
          />
          <Drawer.Screen name="Profile" component={Profile} style={{ color: "#800C69" }}
            options={{
              title: 'My Profile',
              drawerIcon: ({ focused, size }) => (
                <AntDesignIcon name="user" size={25} color={'#800C69'} style={{ padding: 0 }} />
              ),
            }}
          />
          <Drawer.Screen name="Locations" component={Locations} style={{ color: "#800C69" }}
            options={{
              title: 'My Addresses',
              drawerIcon: ({ focused, size }) => (
                <EntypoIcon name="location" size={25} color={'#800C69'} style={{ padding: 0 }} />
              ),
            }}
          />

          <Drawer.Screen name="orderHistory" component={orderHistory}
            options={{
              title: 'Orders History',
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="history" size={25} color={'#800C69'} style={{ padding: 2 }} />
                //   <Image style={styles.icon} source={require('../assets/clock.png')} />
              ),
            }} />
          <Drawer.Screen name="specialOffers" component={specialOffers} style={{ color: "#800C69" }}
            options={{
              title: 'Special Offers',
              drawerIcon: ({ focused, size }) => (
                <Fontisto name="shopping-sale" size={25} color={'#800C69'} style={{ padding: 2 }} />
              ),
            }}
          />


          <Drawer.Screen name="Setting" component={SettingScreen} style={{ color: "#800C69" }}
            options={{
              title: 'Setting',
              drawerIcon: ({ focused, size }) => (
                <Icon name="settings" size={25} color={'#800C69'} style={{ padding: 2 }} />
              ),
            }}
          />

          <Drawer.Screen name="ProviderFeedback" component={ProviderFeedback}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Feedbacks and Reviews',
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="feedback" size={20} color={'#800C69'} />
              ),
            }} />

          <Drawer.Screen name="pageOne" component={pageOne}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Al-Shini',
              drawerLabel: () => null
            }} />
          <Drawer.Screen name="pageTwo" component={pageTwo}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Bravo',
              drawerLabel: () => null
            }} />
          <Drawer.Screen name="pageThree" component={pageThree}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Brothers',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="pageFour" component={pageFour}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Gardens',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="CheckOut" component={CheckOut}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'CheckOut',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="edit" component={edit}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Edit My Profile',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="editAddress" component={editAddress}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Edit Address',
              drawerLabel: () => null
            }} />


          <Drawer.Screen name="CardPayment" component={CardPayment} style={{ color: "#800C69" }}
            options={{
              title: 'Credit Card Payment',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="setLocation" component={setLocation}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Set Location',
              drawerLabel: () => null
            }} />
          <Drawer.Screen name="ProviderLogin" component={ProviderLogin}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'ProviderLogin',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="ProviderHome" component={ProviderHome}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'ProviderHome',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="addProduct" component={addProduct}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'addProduct',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="editProducts" component={editProducts}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'editProducts',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="viewProducts" component={viewProducts}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'viewProducts',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="editProd" component={editProd}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'editProd',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="ProviderOrders" component={ProviderOrders}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'ProviderOrders',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="Feedbacks" component={Feedbacks}
            options={{
              drawerItemStyle: { height: 0 },
              title: ' ',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="ReOrder" component={ReOrder}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Products Details',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="addOffer" component={addOffer}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'add to Offers',
              drawerLabel: () => null
            }} />

          <Drawer.Screen name="viewProviderOffers" component={viewProviderOffers}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'Offers',
              drawerLabel: () => null
            }} />


          <Drawer.Screen name="editOffer" component={editOffer}
            options={{
              drawerItemStyle: { height: 0 },
              title: 'edit Offer',
              drawerLabel: () => null
            }} />






        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default HomeScreen;