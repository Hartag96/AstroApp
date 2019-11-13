import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert, CheckBox  } from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'

import styles from './EventStyle';

 class EventScreen extends Component {
    constructor(props){
        super(props);
        var isLogged = AsyncStorage.getItem("auth_token")
        .then((value) => {
            if(value == null || value == undefined|| value == '' ){
                this.props.navigation.navigate('Login');
            }else{
                this.setState({isLogged: true, auth_token: value});
                this.fetchEvent();
            }
        });
    }

    static navigationOptions = ({ navigate, navigation }) => ({
      title: "AstroApp",
      //headerRight: <Button title="Logout" onPress={()=>{ navigation.navigate('Login'); }} />,
      headerRight: <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
        navigation.navigate('Login');
      }); }} />,
    })

    logoutTest = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            navigation.navigate('Login');
        });
    }

    state = {
        isLogged: false,
        eventId: '5',
        eventName: 'Lolek',
        eventDate: '2019-11-16T17:45:00',
        difference: '',
        events: [{
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
          }]
    }
    
    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login');
        });
    }


    fetchEvent = async () => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/my_preferences/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.auth_token
              }
            });
  
            const astro = await astroApiCall.json();
            var firstEvent = astro[0];
            
            // this.setState({eventId: firstEvent.id, eventName: firstEvent.name, eventDate: firstEvent.date});
        } catch (err) {
        }
    }

    calcDateDiff(){
        var date1 = new Date().getTime();
        var date2 = Date.parse(this.state.eventDate);

        console.log(date1);
        console.log(date2);

        var msec = date2 - date1;
        var mins = Math.floor(msec / 60000);
        var hrs = Math.floor(mins / 60);
        var days = Math.floor(hrs / 24);
        var yrs = Math.floor(days / 365);
        mins = mins % 60;
        hrs = hrs % 24;

        this.setState({difference: days + " days, " + hrs + " hours, " + mins + " minutes"});
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            this.calcDateDiff();
        }, 1000);
      }
      
      componentWillUnmount() {
        clearInterval(this._interval);
      }

    render() {
        return (
            <View isVisible={this.state.isLogged} style="flex: 1;" /*style={styles.container}*/>
                <View style="flex: 1; flexDirection: 'column'; justifyContent: 'space-between'"/*style={styles.center}*/>
                    <View style={{width: '100%', height: '53%', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image
                            style={{width: 200, height: 200, marginTop: 5}}
                            source={{uri: this.state.events[this.state.eventId].image}}
                        />
                        <Text style={{fontSize: 28, fontWeight: "bold"}}>{this.state.events[this.state.eventId].title}</Text>
                        <Text style={{fontSize: 22}}>Time remaining:</Text>
                        <Text>{this.state.difference}</Text>
                    </View>
                    <View style={{width: '100%', height: '40%', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'space-around', alignItems: 'center' }}>
                        
                    </View>
                    <View style={{width: '100%', height: '7%'}}>
                        <Button title="Save" style={{width: '100%', height: '50%'}} /*style={styles.frontButton}*/ onPress={this.savePreferences}/>
                    </View>
                </View>
            </View>
        )
    }
}
export default withNavigation(EventScreen);