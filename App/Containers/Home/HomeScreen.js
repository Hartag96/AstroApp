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
                this.setState({isLogged: true, auth_token: value});
            }
        });
    }

    state = {
        isLogged: false,
        checkboxes: [{
            id: '3',
            title: 'Lunar Eclipse',
            checked: false,
            image: 'https://raw.githubusercontent.com/turesheim/eclipse-icons/master/icons/source/Eclipse_Luna.png'
          }, {
            id: '4',
            title: 'Solar Eclipse',
            checked: false,
            image: 'https://www.pinclipart.com/picdir/middle/114-1143639_solar-eclipse-comments-icon-png-download.png'
          },{
            id: '5',
            title: 'New Moon',
            checked: false,
            image: 'https://icon-library.net/images/new-moon-icon/new-moon-icon-21.jpg'
          }, {
            id: '1',
            title: 'Meteor Shower',
            checked: false,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQblkqbCak4dKbLUH5BOkQS3PUiP6JAApQYnSJV3r0_pYHEpah6'
          }, {
            id: '2',
            title: 'Full Moon',
            checked: false,
            image: 'http://www.clker.com/cliparts/N/4/r/A/j/Q/full-moon-icon-hi.png'
          }, {
            id: '6',
            title: 'Planetary Event',
            checked: false,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLo7jkDytuFi1Vq13s4PuIp1rlqSLSlRrm1UbgIbR1aVxH2Tg'
          }, {
            id: '7',
            title: 'Conjunction',
            checked: false,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ610hzXUeI-4xFOA7kbPTjNyAyTPHM2yAKJgHTu60wm1VcoLsr'
          }, {
            id: '8',
            title: 'Comet',
            checked: false,
            image: 'https://cdn.imgbin.com/13/21/8/imgbin-computer-icons-comet-share-icon-others-4y7iSSmiimiczm2Wj7URpJ7my.jpg'
          }, {
            id: '9',
            title: 'Asteroid',
            checked: false,
            image: 'https://www.jing.fm/clipimg/full/53-539988_asteroid-2-icon-asteroid-icon.png'
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

        var ideki = prefString.substring(0, prefString.length - 1);

        await AsyncStorage.setItem("preferences", ideki).then( () => {
            this.savePreferencesOnServer(ideki);
        });
    }

    savePreferencesOnServer = async (str) => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/set_my_preferences/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_token
              },
              body: JSON.stringify({
                  ids: str.split(',')
              })
            });
            this.showModal('success');
            console.log(str);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View isVisible={this.state.isLogged} style="flex: 1;" /*style={styles.container}*/>
                <View style="flex: 1; flexDirection: 'column'; justifyContent: 'space-between'"/*style={styles.center}*/>
                    <Text style={{width: '100%', height: '10%', fontSize: 20, padding: 8}}>Select events to follow:</Text>
                    <View style={{width: '100%', height: '83%', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                        {
                            this.state.checkboxes.map((cb) => {
                                return (
                                    <View key={cb.id} style={{flex: 1, height: 90, marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                        <View>
                                            <Image
                                                style={{width: 50, height: 50, margin: 25}}
                                                source={{uri: cb.image}}
                                                onPress={() => this.toggleCheckbox(cb.id)}
                                            />
                                        </View>
                                        <View style={{flex: 1, flexDirection:'row'}}>
                                            <CheckBox
                                            title={cb.title}
                                            value={cb.checked}
                                            onChange={() => this.toggleCheckbox(cb.id)} />
                                            <Text style={{marginTop: 5}}> {cb.title}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{width: '100%', height: '7%'}}>
                        <Button title="Save" style={{width: '100%', height: '50%'}} /*style={styles.frontButton}*/ onPress={this.savePreferences}/>
                    </View>
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
