import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert, CheckBox  } from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';

import styles from './EventStyle';

export default class EventScreen extends Component {
    constructor(props){
        super(props);
        var isLogged = AsyncStorage.getItem("auth_token")
        .then((value) => {
            if(value == null || value== undefined|| value== '' ){
                this.props.navigation.navigate('Login');
            }else{
                this.setState({isLogged: true, auth_token: value});
                this.fetchEvent();
            }
        });
    }

    state = {
        isLogged: false,
        eventId: '',
        eventName: '',
        eventDate: ''
    }

    fetchEvent = async () => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/events/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_token
              }
            });
  
            const astro = await astroApiCall.json();
            var firstEvent = astro[0];
            this.setState({eventId: firstEvent.id, eventName: firstEvent.name, eventDate: firstEvent.date});
        } catch (err) {
        }
    }

    render() {
        return (
            <View isVisible={this.state.isLogged} style={styles.container}>
               <Text>{this.state.eventName}</Text>
               <Text>{this.state.eventDate}</Text>
            </View>
        )
    }
}
