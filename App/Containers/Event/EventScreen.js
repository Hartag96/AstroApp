import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, SafeAreaView, ScrollView  } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'

import styles from './EventStyle';

 class EventScreen extends Component {
    constructor(props){
        super(props);

        // AsyncStorage.setItem("preferences", "");

        var isLogged = AsyncStorage.getItem("auth_token").then((value) => {
          if(value == '' || value == null || value == undefined){
              AsyncStorage.setItem("preferences", null).then( () => {
              });
              this.props.navigation.navigate('Authorization');
          }else{
            var preferences = AsyncStorage.getItem("preferences").then((pref) => {
              if(pref === "" || pref === null || pref === undefined){
                this.props.navigation.navigate('Settings');
              }else{
                this.setState({preferences: pref});
              }
            })
          }
      })
    }


    static navigationOptions = ({ navigate, navigation }) => ({
      title: "Event",
      headerRight: <View>
            <Button title="All events" onPress={async () => {navigation.navigate('Events')}} />
              <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
              navigation.navigate('Authorization');
            }); }} />
      </View>
    })

    state = {
        isLogged: true,
        isLoad: false, // TODO Można wyświetlać ekran ładowania póki nie skończy się componentDidMount. Obecnie jest średnio
        eventId: '4', // id
        eventName: 'Planetary event', // name
        eventDate: '2019-11-29T17:45:00', // date
        eventType: '', // type
        eventTypeID: 1, // preference_id
        difference: '',
        newComment: '',
        newCommentVisible: false,
        comments: [
          {
            id: 1, // id
            user_email: 'Dawikk', // user_email
            avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png',
            content: 'Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet.' // content
          },
          {
            id: 2,
            user_email: 'Dawikk',
            avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png',
            content: 'Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet.'
          }
        ],
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

            this.setState({eventId: firstEvent.id, eventName: firstEvent.name, eventDate: firstEvent.date});
            console.log('okej GET my_events');
        } catch (err) {
          console.log('Err GET my_events', err);
        }
    }

    calcDateDiff(){
        var date1 = new Date().getTime();
        var date2 = Date.parse(this.state.eventDate);

        // console.log(date1);
        // console.log(date2);
        
        var msec = date2 - date1;
        var seconds = ((msec % 60000) / 1000).toFixed(0);

        var mins = Math.floor(msec / 60000);
        var hrs = Math.floor(mins / 60);
        var days = Math.floor(hrs / 24);
        var yrs = Math.floor(days / 365);
        mins = mins % 60;
        hrs = hrs % 24;

        var secondsS = seconds < 10 ? '0' + seconds : seconds;
        var minsS = mins < 10 ? '0' + mins : mins;
        var hrsS = hrs < 10 ? '0' + hrs : hrs;
        var daysS = days < 10 ? '0' + days : days;

        this.setState({difference: daysS + " Day(s) " + hrsS + ":" + minsS + ":" + secondsS});
    }

    showModal(){
      this.setState({newCommentVisible: true});
    }

    hideModal(){
      this.setState({newCommentVisible: false});
    }

    addComment(){
      this.setState({comments: this.state.comments.concat({id: this.state.comments.length + 1, user_email: 'System', avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png', content: this.state.newComment})})
      this.setState({newCommentVisible: false});
      this.setState({newComment: ''});
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== undefined && prevProps.navigation.state.params !== undefined){ // Dodałem warunek, jest ok
          if(prevProps != null && 
            prevProps.navigation.state.params.id != this.props.navigation.state.params.id) // (po świeżym logowaniu) TypeError: undefined is not an object (evaluating 'prevProps.navigation.state.params.id')
          console.log('params1:', this.props.navigation.state.params);
        }else{
          console.log('params2:', this.props.navigation.state.params);
        }
    }

    async componentDidMount() {
      console.log('params3:', this.props.navigation.state.params);
        this._interval = setInterval(() => {
            this.calcDateDiff();
        }, 1000);

        try {
            const auth_token = await AsyncStorage.getItem('auth_token');
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/current_event/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth_token
              }
            });

            const astro = await astroApiCall.json();
            var firstEvent = astro.events[0];
            this.setState({eventId: firstEvent.id, eventName: firstEvent.name, eventDate: firstEvent.date, eventType: firstEvent.type, eventTypeID: firstEvent.preference_id});
          //  console.log('GET name:', firstEvent); // astro.events['0'].name // firstEvent.comments[1]
          this.setState({comments: firstEvent.comments});
        } catch (err) {
          console.log('Err GET my_events', err);
        }
      }

      componentWillUnmount() {
        clearInterval(this._interval);
      }

    render() {
        return (
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentSection}>
              <View style={styles.eventBox}>
                <View style={styles.eventElement}>
                  <Image
                    style={{width: 80, height: 80}}
                    source={{uri: this.state.events[this.state.eventTypeID].image}}
                  />
                </View>
                <View style={styles.eventElementExt}>
                  <Text style={styles.eventTitle}>{this.state.eventName}</Text>
                  <Text style={styles.eventDesc}>Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet.</Text>
                </View>
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.remainingBold}>Time remaining to the event:</Text>
                <Text style={styles.difference}>{this.state.difference}</Text>
              </View>
              <View style={styles.commentsBox}>
              {
                  this.state.comments.map((comment) => {
                  return (
                    <View key={comment.id} style={styles.commentBox}>
                      <View style={styles.commentAvatar}>
                        <Image
                          style={{width: 40, height: 40}}
                          source={{uri: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png'}}
                        />
                      </View>
                      <View style={styles.commentContent}>
                        <Text style={styles.commentAuthor}>
                          Author: {comment.user_email}
                        </Text>
                        <Text style={styles.commentContent}>
                          {comment.content}
                        </Text>
                      </View>
                    </View>
                      )
                  })
              }
              {/* <View>
                <Text>Add comment:</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => this.setState({newComment})}
                  value={this.state.text} 
                  style={styles.textarea} />
              </View> */}
              </View> 
            </ScrollView>
            <View style={styles.addCommentButton}>
              <Button
                raised
                icon={{name: 'add-circle', size: 32, color: '#FFFFFF'}}
                buttonStyle={{backgroundColor: '#333333', borderRadius: 50}}
                onPress={this.showModal.bind(this)}
              />
            </View>
            <Modal isVisible={this.state.newCommentVisible}>
              <View style={styles.modal}>
                <Text style={{paddingBottom: 15, paddingTop: 15, fontSize: 18, fontWeight: 'bold'}}>Add comment:</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => this.setState({newComment: text})}
                  value={this.state.text} 
                  placeholder="Enter your comment..."

                  style={styles.textarea} />
                <View style={styles.modalButtons}>
                  <Button
                    raised
                    buttonStyle={[styles.modalButton, {backgroundColor: '#333333', borderRadius: 0}]}
                    title={`Add comment`}
                    onPress={this.addComment.bind(this)}
                  />
                  <Button
                    raised
                    buttonStyle={[styles.modalButton, {backgroundColor: '#333333', borderRadius: 0}]}
                    title={`Close`}
                    onPress={this.hideModal.bind(this)}
                  />
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        )
    }
}
export default withNavigation(EventScreen);