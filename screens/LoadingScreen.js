import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('App',{ ProviderName:"customer", userName:"customer" });
            } else {
                this.props.navigation.navigate('SignUp');
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default LoadingScreen;