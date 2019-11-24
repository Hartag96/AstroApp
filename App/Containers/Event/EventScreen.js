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
                this.fetchEvent(value);

                this.setState({isLogged: true, auth_token: value});
            }
        });
    }

    static navigationOptions = ({ navigate, navigation }) => ({
      title: "AstroApp",
      //headerRight: <Button title="Logout" onPress={()=>{ navigation.navigate('Login'); }} />,
      headerRight: <Button style={{marginRight: 10}} title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
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
        eventId: '4',
        eventName: 'Planetary event',
        eventDate: '2019-11-16T17:45:00',
        difference: '',
        events: {
          '1': {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQblkqbCak4dKbLUH5BOkQS3PUiP6JAApQYnSJV3r0_pYHEpah6'
          },
          '2': {
            image: 'http://www.clker.com/cliparts/N/4/r/A/j/Q/full-moon-icon-hi.png'
          },
          '3': {
            image: 'https://raw.githubusercontent.com/turesheim/eclipse-icons/master/icons/source/Eclipse_Luna.png'
          },
          '4': {
            image: 'https://www.pinclipart.com/picdir/middle/114-1143639_solar-eclipse-comments-icon-png-download.png'
          },
          '5': {
            image: 'https://icon-library.net/images/new-moon-icon/new-moon-icon-21.jpg'
          },
          '6': {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLo7jkDytuFi1Vq13s4PuIp1rlqSLSlRrm1UbgIbR1aVxH2Tg'
          },
          '7': {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ610hzXUeI-4xFOA7kbPTjNyAyTPHM2yAKJgHTu60wm1VcoLsr'
          },
          '8': {
            image: 'https://cdn.imgbin.com/13/21/8/imgbin-computer-icons-comet-share-icon-others-4y7iSSmiimiczm2Wj7URpJ7my.jpg'
          },
          '9': {
            image: 'https://www.jing.fm/clipimg/full/53-539988_asteroid-2-icon-asteroid-icon.png'
          }
      }     
          
    }
    
    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login');
        });
    }


    fetchEvent = async (auth_token) => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/my_events/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth_token
              }
            });
  
            const astro = await astroApiCall.json();
            var firstEvent = astro[1];

            console.log('lol', JSON.stringify(firstEvent));
            
            this.setState({eventId: firstEvent.id, eventName: firstEvent.name, eventDate: firstEvent.date});

            console.log('hej', JSON.stringify(this.state));
        } catch (err) {
          console.log( err);
        }
    }

    calcDateDiff(){
        var date1 = new Date().getTime();
        var date2 = Date.parse(this.state.eventDate);

        // console.log(date1);
        // console.log(date2);

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
                            style={{width: 200, height: 200, marginTop: 20}}
                            source={{uri: this.state.events['1'].image}}
                        />
                        <Text style={{fontSize: 28, fontWeight: "bold", marginTop: 15}}>{this.state.eventName}</Text>
                        <Text style={{fontSize: 22, marginTop: 8}}>Time remaining:</Text>
                        <Text style={{marginTop: 10}}>{this.state.difference}</Text>
                        <Button title="IMG" style={{width: '100%', height: '50%'}} /*style={styles.frontButton}*/ onPress={() => this.props.navigation.navigate('Img')}/>
                    </View>
                    <View style={{width: '100%', height: '40%', flexDirection: 'column', alignContent: 'stretch', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 }}>
                        
                    </View>
                    <View style={{width: '100%', height: '7%'}}>
                        <Button title="Save" style={{width: '100%', height: '50%', marginTop: 15}} /*style={styles.frontButton}*/ onPress={this.savePreferences}/>
                    </View>
                </View>
            </View>
        )
    }
}
export default withNavigation(EventScreen);