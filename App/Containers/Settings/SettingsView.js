import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, SafeAreaView, ScrollView, TouchableOpacity  } from 'react-native';
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'
import { Button, SocialIcon } from 'react-native-elements';

import styles from './SettingsStyle';

 class SettingsView extends Component {
    constructor(props){
        super(props);
    }

    state = {
        isLogged: false,
        checkboxes: [{
            id: '3',
            title: 'Lunar Eclipse',
            checked: true,
            image: 'https://raw.githubusercontent.com/turesheim/eclipse-icons/master/icons/source/Eclipse_Luna.png',
            desc: 'A lunar eclipse occurs when the Moon passes directly behind Earth and into its shadow.'
          }, {
            id: '4',
            title: 'Solar Eclipse',
            checked: true,
            image: 'https://www.pinclipart.com/picdir/middle/114-1143639_solar-eclipse-comments-icon-png-download.png',
            desc: 'A solar eclipse occurs when a portion of the Earth is engulfed in a shadow cast by the Moon which fully or partially blocks sunlight.'
          },{
            id: '5',
            title: 'New Moon',
            checked: true,
            image: 'https://icon-library.net/images/new-moon-icon/new-moon-icon-21.jpg',
            desc: 'The new moon is the first lunar phase, when the Moon and Sun have the same ecliptic longitude.'
          }, {
            id: '1',
            title: 'Meteor Shower',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQblkqbCak4dKbLUH5BOkQS3PUiP6JAApQYnSJV3r0_pYHEpah6',
            desc: 'A meteor shower is a celestial event in which a number of meteors are observed to radiate, or originate, from one point in the night sky.'
          }, {
            id: '2',
            title: 'Full Moon',
            checked: true,
            image: 'http://www.clker.com/cliparts/N/4/r/A/j/Q/full-moon-icon-hi.png',
            desc: "The full moon is the lunar phase when the Moon appears fully illuminated from Earth's perspective."
          }, {
            id: '6',
            title: 'Planetary Event',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLo7jkDytuFi1Vq13s4PuIp1rlqSLSlRrm1UbgIbR1aVxH2Tg',
            desc: 'Find out why mysteriously quiet solar cycles have astronomers scratching their heads about the nature of our Sun.'
          }, {
            id: '7',
            title: 'Conjunction',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ610hzXUeI-4xFOA7kbPTjNyAyTPHM2yAKJgHTu60wm1VcoLsr',
            desc: 'A conjunction occurs when two astronomical objects or spacecraft have either the same right ascension or the same ecliptic longitude, usually as observed from Earth.'
          }, {
            id: '8',
            title: 'Comet',
            checked: true,
            image: 'https://cdn.imgbin.com/13/21/8/imgbin-computer-icons-comet-share-icon-others-4y7iSSmiimiczm2Wj7URpJ7my.jpg',
            desc: 'A comet is an icy, small Solar System body that, when passing close to the Sun, warms and begins to release gases, a process called outgassing.'
          }, {
            id: '9',
            title: 'Asteroid',
            checked: true,
            image: 'https://www.jing.fm/clipimg/full/53-539988_asteroid-2-icon-asteroid-icon.png',
            desc: 'Asteroids are minor planets, especially of the inner Solar System. Larger asteroids have also been called planetoids.'
          }],
          isModalVisible: false,
          modalText: 'Success :o',
          modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
          modalButtonText: 'Close'
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Settings",
        headerRight: <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
          navigation.navigate('Authorization');
        }); }} />,
      })

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
            this.props.navigation.navigate('Event', {});
        });

    }

    savePreferencesOnServer = async (str) => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/my_preferences/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_token
              },
              body: JSON.stringify({
                  ids: str.split(',')
              })
            });
            // this.showModal('success');
            const lol = await astroApiCall.json();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <SafeAreaView>
                        <ScrollView>
                         <Text style={styles.settingsTitle}>Select events to follow:</Text>
                            <View style={styles.eventBox}>
                            {
                                this.state.checkboxes.map((cb) => {
                                return (
                                        <TouchableOpacity  key={cb.id} style={[styles.eventBoxChild, {backgroundColor: cb.checked ? '#DEE0E5' : '#FFFFFF'}]} onPress={() => this.toggleCheckbox(cb.id)}>
                                            <View style={styles.eventElement}>
                                                <Image
                                                    style={{width: 50, height: 50}}
                                                    source={{uri: cb.image}}
                                                    onPress={() => this.toggleCheckbox(cb.id)}
                                                />
                                            </View>
                                            <View style={styles.eventElementExt}>
                                                <View style={styles.eventTitle}>
                                                    <Text style={styles.eventTitle}>{cb.title}</Text>
                                                </View>
                                                <View style={styles.eventDesc}>
                                                    <Text>{cb.desc}</Text>
                                                </View>
                                                <View style={styles.eventCheck}>
                                                    <CheckBox
                                                    title={cb.title}
                                                    value={cb.checked}
                                                    onChange={() => this.toggleCheckbox(cb.id)} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                     
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.navigation}>
                    <Button
                        raised
                        buttonStyle={{backgroundColor: '#222222', borderRadius: 0,paddingBottom: 20}}
                        textStyle={{textAlign: 'center'}}
                        title="Save preferences"
                        onPress={this.savePreferences.bind(this)}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
export default withNavigation(SettingsView);