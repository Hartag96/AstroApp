import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert } from 'react-native';
import RootScreen from './App/Containers/Root/RootScreen';
import AppNavigator from "./AppNavigator";
import Authorization from "./App/Containers/Authorization/AuthorizationView";

export default class App extends React.Component {
    state = {
        isAuthorized: false
    }
    
    componentDidMount(){
        // AsyncStorage.getItem("auth_token")
        //     .then((value) => {
        //         if(value == null || value == undefined|| value == '' ){
        //             this.setState({isAuthorized: false});
        //         }else{
        //             this.setState({isAuthorized: true});
        //         }
        //     });
    }

    render() {
        return (
                <AppNavigator/>
        );
    }
}
