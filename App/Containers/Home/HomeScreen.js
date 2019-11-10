import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert, CheckBox  } from 'react-native';
import {AsyncStorage} from 'react-native';

import styles from './HomeStyle';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        var isLogged = AsyncStorage.getItem("auth_token")
        .then((value) => {
            if(value == null || value== undefined|| value== '' ){
                this.props.navigation.navigate('Login');
            }else{
                this.setState({isLogged: true});
            }
        });
    }

    state = {
        isLogged: false,
        checkboxes: [{
            id: 1,
            title: 'Eclipse',
            checked: false,
          }, {
            id: 2,
            title: 'Moon',
            checked: false,
          }],
    }

    toggleCheckbox(id) {
        const changedCheckbox = this.state.checkboxes.find((cb) => cb.id === id);
        
        changedCheckbox.checked = !changedChecbox.checked;

        if(changedCheckbox.checked){
            Alert.alert('zapisano');
        }
        
        const checkboxes = Object.assign({}, this.state.checkboxes, changedCheckbox);
        
        this.setState({ checkboxes });
    }

    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login');
        });

    }

    render() {
        return (
            <View isVisible={this.state.isLogged} style={styles.container}>
                {
                    this.state.checkboxes.map((cb) => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                key={cb.id}
                                title={cb.title}
                                checked={cb.checked}
                                onPress={() => this.toggleCheckbox(cb.id)} />
                                <Text style={{marginTop: 5}}> {cb.title}</Text>
                            </View>
                        )
                    })
                }
                <Button title="Logout" style={styles.frontButton} onPress={this.logout}/>
            </View>
        )
    }
}
