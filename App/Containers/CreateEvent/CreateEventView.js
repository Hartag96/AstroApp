import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, SafeAreaView, ScrollView, TouchableOpacity  } from 'react-native';
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'
import { Button, SocialIcon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

import styles from './CreateEventStyle';

 class CreateEventView extends Component {
    constructor(props){
        super(props);
    }

    state = {
        eventName: '',
        eventDate: '',
        eventDesc: '',
        isLogged: false,
        date:"2019-11-28",
        checkboxes: [{
            id: '3',
            title: 'Lunar Eclipse',
            checked: true,
            image: 'https://raw.githubusercontent.com/turesheim/eclipse-icons/master/icons/source/Eclipse_Luna.png'
          }, {
            id: '4',
            title: 'Solar Eclipse',
            checked: true,
            image: 'https://www.pinclipart.com/picdir/middle/114-1143639_solar-eclipse-comments-icon-png-download.png'
          },{
            id: '5',
            title: 'New Moon',
            checked: true,
            image: 'https://icon-library.net/images/new-moon-icon/new-moon-icon-21.jpg'
          }, {
            id: '1',
            title: 'Meteor Shower',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQblkqbCak4dKbLUH5BOkQS3PUiP6JAApQYnSJV3r0_pYHEpah6'
          }, {
            id: '2',
            title: 'Full Moon',
            checked: true,
            image: 'http://www.clker.com/cliparts/N/4/r/A/j/Q/full-moon-icon-hi.png'
          }, {
            id: '6',
            title: 'Planetary Event',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLo7jkDytuFi1Vq13s4PuIp1rlqSLSlRrm1UbgIbR1aVxH2Tg'
          }, {
            id: '7',
            title: 'Conjunction',
            checked: true,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ610hzXUeI-4xFOA7kbPTjNyAyTPHM2yAKJgHTu60wm1VcoLsr'
          }, {
            id: '8',
            title: 'Comet',
            checked: true,
            image: 'https://cdn.imgbin.com/13/21/8/imgbin-computer-icons-comet-share-icon-others-4y7iSSmiimiczm2Wj7URpJ7my.jpg'
          }, {
            id: '9',
            title: 'Asteroid',
            checked: true,
            image: 'https://www.jing.fm/clipimg/full/53-539988_asteroid-2-icon-asteroid-icon.png'
          }, {
            id: '10',
            title: 'User event',
            checked: true,
            image: 'https://forums.unraid.net/applications/core/interface/imageproxy/imageproxy.php?img=http://i.imgur.com/TxGPjwu.png&key=f0c451f46385d84efe339aac6453af811fbaee80916423c49ca14824b5bd7411'
          }],
          isModalVisible: false,
          modalText: 'Event created :o',
          modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
          modalButtonText: 'Close'
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Create event",
        //headerRight: <Button title="Logout" onPress={()=>{ navigation.navigate('Login'); }} />,
        headerRight: <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
          navigation.navigate('Authorization');
        }); }} />,
      })

    hideModal = () => {
        this.setState({isModalVisible: false});
        this.props.navigation.navigate('Events', {});
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

    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login', {});
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
        console.log('ideki', ideki);

        await AsyncStorage.setItem("preferences", ideki).then( () => {
            this.savePreferencesOnServer(ideki);
        });
    }

    goToEvents(){
        this.props.navigation.navigate('Events', {});
    }

    addEvent = async () => {
        try {
            console.log(this.state.date);
            const auth_token = await AsyncStorage.getItem('auth_token');
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/events/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth_token
              },
              body: JSON.stringify({
                  "name" : this.state.eventName,
                  "date" : this.state.date
              })
            });
            // this.showModal('success');
            const lol = await astroApiCall.json();
            console.log('dda', JSON.stringify(lol));
        } catch (err) {
            console.log('Err POST my_preferences', err);
        }

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
            console.log('Err POST my_preferences', err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={[styles.bgGray]}>
                                <Text style={styles.mainText}>Enter event infos:</Text>
                                <TextInput onChangeText={(value) => this.setState({eventName: value})} style={styles.mailInput} placeholder="Enter event name..."/>
                                <TextInput 
                                    multiline={true}
                                    numberOfLines={4} 
                                    onChangeText={(value) => this.setState({eventDesc: value})} 
                                    style={styles.mailInput} placeholder="Enter event description..." 
                                />
                                <DatePicker
                                    style={{width: '100%'}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Select date"
                                    format="DD-MM-YYYY"
                                    minDate="28-11-2019"
                                    maxDate="28-11-2099"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        marginBottom: 10,
                                        marginTop: 10
                                    }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                                <Button
                                    raised
                                    buttonStyle={{backgroundColor: '#333333', borderRadius: 0, marginTop: 5}}
                                    textStyle={{textAlign: 'center'}}
                                    title="Create event..."
                                    onPress={this.addEvent.bind(this)}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.navigation}>
                        <Button
                            raised
                            buttonStyle={{backgroundColor: '#222222', borderRadius: 0,paddingBottom: 10}}
                            textStyle={{textAlign: 'center'}}
                            title="Back to events..."
                            onPress={this.goToEvents.bind(this)}
                            />
                    </View>
                </View>
            </View>
        )
    }
}
export default withNavigation(CreateEventView);