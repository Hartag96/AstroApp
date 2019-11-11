import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert, CheckBox  } from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';

import styles from './HomeStyle';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        var isLogged = AsyncStorage.getItem("auth_token")
        .then((value) => {
            if(value == null || value == undefined|| value == '' ){
                this.props.navigation.navigate('Login');
            }else{
                this.setState({isLogged: true});
            }
        });
    }

    state = {
        isLogged: false,
        checkboxes: [{
            id: 'eclipse',
            title: 'Eclipse',
            checked: false,
          }, {
            id: 'moon',
            title: 'Moon',
            checked: false,
          }, {
            id: 'meteor-shower',
            title: 'Meteor Shower',
            checked: false,
          }],
          isModalVisible: false,
          modalText: 'Success :o',
          modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
          modalButtonText: 'Close'
    }

    hideModal = () => {
        this.setState({isModalVisible: false});
        this.props.navigation.navigate('Event');
    }

    showModal = (type) => {
        var text = 'Preferences saved';
        var image = 'https://png.pngtree.com/svg/20170724/success_405070.png';
        var btnText = 'Close';

        this.setState({ 
            isModalVisible: true, 
            modalText: text, 
            modalImage: image,
            modalButtonText: btnText 
        });
    };

    toggleCheckbox(id) { 
        let changedCheckbox = this.state.checkboxes.find((cb) => cb.id === id); 
        changedCheckbox.checked = !changedCheckbox.checked; 
        let chkboxes = this.state.checkboxes; 
        
        for (let i = 0; i < chkboxes.length; i++) { 
            if (chkboxes[i].id === id) { chkboxes.splice(i, 1, changedCheckbox); }; 
        }; 

        this.setState({ checkboxes: chkboxes, }); 
    }

    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login');
        });
    }

    savePreferences = async () => {
        var prefString = '';
        var preferences = this.state.checkboxes;

        for(var item of preferences){
            if(item.checked == true){
                prefString += item.id + ',';
            }
        }

        await AsyncStorage.setItem("preferences", prefString.substring(0, prefString.length - 1)).then( () => {
            this.showModal('success');
        });
    }

    render() {
        return (
            <View isVisible={this.state.isLogged} style={styles.container}>
                <View style={styles.center}>
                    {
                        this.state.checkboxes.map((cb) => {
                            return (
                                <View key={cb.id} style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                    key={cb.id}
                                    title={cb.title}
                                    value={cb.checked}
                                    onChange={() => this.toggleCheckbox(cb.id)} />
                                    <Text style={{marginTop: 5}}> {cb.title}</Text>
                                </View>
                            )
                        })
                    }

                    <Button title="Logout" style={styles.frontButton} onPress={this.logout}/>
                    <Button title="Save" style={styles.frontButton} onPress={this.savePreferences}/>
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modal}>
                        <Image
                        style={{width: 100, height:100}}
                        source={{uri: this.state.modalImage}}
                        />
                        
                        <Text style={{paddingBottom: 15, paddingTop: 15}}>{this.state.modalText}</Text>
                        <Button stype={{flex: 1}} title={this.state.modalButtonText} onPress={this.hideModal} />
                    </View>
                </Modal>
            </View>
        )
    }
}
