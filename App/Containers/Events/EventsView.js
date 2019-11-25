import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, SafeAreaView, ScrollView, TouchableOpacity  } from 'react-native';
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'
import { Button, SocialIcon } from 'react-native-elements';

import styles from './EventsStyle';

 class EventsView extends Component {
    constructor(props){
        super(props);
    }

    state = {
        isLogged: false,
        events: [
            {
                id: '233131',
                eventType: '3',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '231361',
                eventType: '1',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '231371',
                eventType: '2',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '923131',
                eventType: '5',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '123131',
                eventType: '3',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '231310',
                eventType: '4',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '2313199',
                eventType: '3',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '2313154',
                eventType: '3',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            },
            {
                id: '23131532',
                eventType: '3',
                eventName: 'Lunar Eclipse',
                eventDesc: 'Lorem xd'
            }
        ],
        eventTypes: {
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
        },
          isModalVisible: false,
          modalText: 'Success :o',
          modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
          modalButtonText: 'Close'
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Incoming events",
        //headerRight: <Button title="Logout" onPress={()=>{ navigation.navigate('Login'); }} />,
        headerRight: <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
          navigation.navigate('Login');
        }); }} />,
      })

    // hideModal = () => {
    //     this.setState({isModalVisible: false});
    //     this.props.navigation.navigate('Event');
    // }

    // showModal = (type) => {
    //     var text = 'Preferences saved';
    //     var image = 'https://png.pngtree.com/svg/20170724/success_405070.png';
    //     var btnText = 'Close';

    //     this.setState({ 
    //         isModalVisible: true, 
    //         modalText: text, 
    //         modalImage: image,
    //         modalButtonText: btnText 
    //     });
    // };

    showModal(){

    }

    
    showEvent = (id) => {
        this.props.navigation.navigate('Event', {id: id});
    }

    addEvent(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.eventBox}>
                            {
                                this.state.events.map((cb) => {
                                return (
                                    <TouchableOpacity  key={cb.id} style={[styles.eventBoxChild, {backgroundColor: '#DEE0E5'}]} onPress={() => this.showEvent(cb.id)}>
                                        <View style={styles.eventElement}>
                                            <Image
                                                style={{width: 50, height: 50}}
                                                source={{uri: this.state.eventTypes[cb.eventType].image}}
                                                // onPress={() => this.toggleCheckbox(cb.id)}
                                            />
                                        </View>
                                        <View style={styles.eventElementExt}>
                                            <View style={styles.eventTitle}>
                                                <Text style={styles.eventTitle}>{cb.eventName}</Text>
                                            </View>
                                            <View style={styles.eventDesc}>
                                                <Text>Lorem ipsum dolor sit omlet.</Text>
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
                <View style={styles.addEventButton}>
                    <Button
                        raised
                        icon={{name: 'add-circle', size: 32, color: '#FFFFFF'}}
                        buttonStyle={{backgroundColor: '#333333', borderRadius: 50}}
                        onPress={this.addEvent.bind(this)}
                    />
                </View>
            </View>
        )
    }
}
export default withNavigation(EventsView);