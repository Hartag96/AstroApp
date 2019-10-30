import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import RootScreen from './App/Containers/Root/RootScreen';
import AppNavigator from "./AppNavigator";

export default class App extends React.Component {
    render() {
        return (
            <AppNavigator/>
        );
    }
}
