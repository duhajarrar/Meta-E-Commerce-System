import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
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
import setLocation from '../screens/setLocation.js';
import orderHistory from '../screens/orderHistory';
import ProviderLogin from '../screens/ProviderLogin';
import ProviderHome from '../screens/ProviderHome';
import addProduct from '../screens/addProduct';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    return (

        <DrawerContentScrollView {...props}>

            <DrawerItemList {...props} />
            {/* <DrawerItem
                icon={() => <AntDesignIcon name="logout" size={23} color={'#800C69'} style={{ padding: 5 }} />}
                style={{ marginTop: '60%' }}
                label="Logout" onPress={() => {
                    firebase.auth().signOut();
                    // props.navigation.navigate('ProviderLogin');

                }
                } /> */}

        </DrawerContentScrollView>
    );
}

class ProviderMenu extends React.Component {

    state = { user: {} };
    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({ user: user });
            }
        })

    }
    render() {
        console.log("testttttttt",this.props.navigation.state.params.ProviderName)
        return (
            <NavigationContainer style={{ backgroundColor: "#800C69", color: "#800C69" }}>
                <Drawer.Navigator initialRouteName="ProviderHome" 
               drawerContent={props => <CustomDrawerContent {...props} />}
                >



                    <Drawer.Screen name="Shops" component={HomeScreen1} style={{ color: "#800C69" }}
                        options={{
                            title: 'Shops',
                            drawerLabel: () => null,
                        }} />

                    <Drawer.Screen name="Cart" component={Cart} style={{ color: "#800C69" }}
                        options={{
                            title: 'My Cart',
                            drawerLabel: () => null,
                        }}
                    />
                    <Drawer.Screen name="Profile" component={Profile} style={{ color: "#800C69" }}
                        options={{
                            title: 'My Profile',
                            drawerLabel: () => null,
                        }}
                    />
                    <Drawer.Screen name="setLocation" component={setLocation} style={{ color: "#800C69" }}
                        options={{
                            title: 'My Locations',
                            drawerLabel: () => null,
                        }}
                    />
                    <Drawer.Screen name="Setting" component={SettingScreen} style={{ color: "#800C69" }}
                        options={{
                            title: 'Setting',
                            drawerLabel: () => null,
                        }}
                    />


                    <Drawer.Screen name="pageOne" component={pageOne}
                        options={{
                            title: 'Al-Shini',
                            drawerLabel: () => null
                        }} />
                    <Drawer.Screen name="pageTwo" component={pageTwo}
                        options={{
                            title: 'Bravo',
                            drawerLabel: () => null
                        }} />
                    <Drawer.Screen name="pageThree" component={pageThree}
                        options={{
                            title: 'Brothers',
                            drawerLabel: () => null
                        }} />

                    <Drawer.Screen name="pageFour" component={pageFour}
                        options={{
                            title: 'Gardens',
                            drawerLabel: () => null
                        }} />

                    <Drawer.Screen name="CheckOut" component={CheckOut}
                        options={{
                            title: 'CheckOut',
                            drawerLabel: () => null
                        }} />

                    <Drawer.Screen name="edit" component={edit}
                        options={{
                            title: 'Edit My Profile',
                            drawerLabel: () => null
                        }} />

                    <Drawer.Screen name="orderHistory" component={orderHistory}
                        options={{
                            title: 'Order History',
                            drawerLabel: () => null
                        }} />


                    <Drawer.Screen name="ProviderHome" component={ProviderHome}
                        options={{
                            title: 'ProviderHome',
                           // drawerLabel: () => null
                        }} />

                    <Drawer.Screen name="addProduct" component={addProduct}
                        options={{
                            title: 'addProduct',
                           // drawerLabel: () => null
                        }} />

                    {/* <Drawer.Screen name="ProviderLogin" component={ProviderLogin}
                        options={{
                            title: 'ProviderLogin',
                            drawerLabel: () => null
                        }} /> */}


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
export default ProviderMenu;