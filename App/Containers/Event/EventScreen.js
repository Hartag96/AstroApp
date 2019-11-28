import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, SafeAreaView, ScrollView  } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-view';

import styles from './EventStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <Button title="Reload" onPress={ async ()=>{ 
        var link = 'https://astro-api-dev.herokuapp.com/current_event/';
        if(navigation.state.params !== undefined && navigation.state.params.length > 0){
          link = "https://astro-api-dev.herokuapp.com/events/" + navigation.state.params.id;
          
          try {
            const auth_token = await AsyncStorage.getItem('auth_token');
            const urlAPI = link;
            const astroApiCall = await fetch(urlAPI, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth_token
              }
            });

            const astro = await astroApiCall.json();
            this.setState({eventId: astro.event.id, eventName: astro.event.name, eventDate: astro.event.date,
              eventType: astro.event.type, eventTypeID: astro.event.preference_id});
            this.setState({comments: astro.event.comments});
          } catch (err) {
            console.log('Err GET events:id', err);
          }
          
        }else{
          try {
            const auth_token = await AsyncStorage.getItem('auth_token');
            const astroApiCall = await fetch(link, {
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
            console.log('Err GET current_event', err);
          }
        }
        }} />
        
              <Button title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
              navigation.navigate('Authorization');
            }); }} />
      </View>
    })

    state = {
        isLogged: true,
        isLoad: false, // TODO Można wyświetlać ekran ładowania póki nie skończy się componentDidMount. Obecnie jest średnio
        hasCameraPermission: null, // do pickera
        image: null, // uri zdjęcia (picker)
        base: null, // base64 zdjęcia (picker)
        imgurURL: ' ', // zwrotka z API
        eventId: '4', // id
        eventName: 'Planetary event', // name
        eventDate: '2019-11-29T17:45:00', // date
        eventType: '', // type
        eventTypeID: 1, // preference_id
        difference: '',
        newComment: '',
        newCommentVisible: false,
        isImageViewVisible: false,
        images: [
          {
              source: {
                  uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
              },
              title: 'Comment'
          },
      ],
        comments: [
          {
            id: 998, // id
            user_email: 'Dawikk', // user_email
            avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png',
            content: 'Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet.', // content
            Url: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png'
          },
          {
            id: 999,
            user_email: 'Dawikk',
            avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png',
            content: 'Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet. Lorem ipsum dolor sit omlet.',
            Url: 'https://www.national-geographic.pl/media/cache/default_view/uploads/media/default/0012/70/nie-uwierzysz-jak-powstalo-najslynniejsze-zdjecie-einsteina-przeczytaj-historie.jpeg'
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
          },
          '10': {
            image: 'https://forums.unraid.net/applications/core/interface/imageproxy/imageproxy.php?img=http://i.imgur.com/TxGPjwu.png&key=f0c451f46385d84efe339aac6453af811fbaee80916423c49ca14824b5bd7411'
          }
      }
    }

    logout = async () => {
        await AsyncStorage.setItem("auth_token", '').then(() => {
            this.props.navigation.navigate('Login');
        });
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

        if(msec < 0){
          var secondsS = Math.abs(seconds) < 10 ? '0' + Math.abs(seconds) : Math.abs(seconds);
          var minsS = Math.abs(mins) < 10 ? '0' + Math.abs(mins) : Math.abs(mins);
          var hrsS = Math.abs(hrs) < 10 ? '0' + Math.abs(hrs) : Math.abs(hrs);
          var daysS = Math.abs(days) < 10 ? '0' + Math.abs(days) : Math.abs(days);
          this.setState({difference: "-" + daysS + " Day(s) " + hrsS + ":" + minsS + ":" + secondsS});
        }else{
          this.setState({difference: daysS + " Day(s) " + hrsS + ":" + minsS + ":" + secondsS});
        }

    }

    showModal(){
      this.setState({newCommentVisible: true});
    }

    hideModal(){
      this.setState({newCommentVisible: false, newComment: '', imgurURL: ''});
    }

    addComment = async () => {
      if(!this.state.newComment){

      } else {
        this.setState({comments: this.state.comments.concat({id: this.state.comments.length + 2, user_email: 'System', avatar: 'https://www.pngarts.com/files/3/Avatar-PNG-Image.png', content: this.state.newComment, Url: this.state.imgurURL})})
        // TODO automatyczne pobieranie nowego komentarza z api? Da ię wzbuzić DidUpdate czy trzeba tu dodać nowe zapytanie?
        const auth_token = await AsyncStorage.getItem('auth_token');
        try {
          const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token
            },
            body: JSON.stringify({
                event_id: this.state.eventId,
                content: this.state.newComment,
                url: this.state.imgurURL
            })
          });
          const lol = await astroApiCall.json();
      } catch (err) {
          console.log('Err POST comments:', err);
      }
        
        this.setState({newCommentVisible: false});
        this.setState({newComment: '', imgurURL: ' '});
      }
    }

    navigateToEvents = async () => {
      this.props.navigation.navigate('Events');
    }

    _getPhotoLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
       // aspect: [4, 3]
       base64: true,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri, base: result.base64 });
      }

      const formData = new FormData();
      formData.append("type", 'base64')
      formData.append("image", result.base64)

      try {
        const astroApiCall = await fetch('https://api.imgur.com/3/upload/', {
            method: 'POST',
            headers: {
              "Content-Type": 'multipart/form-data',
              "Authorization": "Client-ID f05a30dbc8032e3",
            },
            body: formData
        });

        const astro = await astroApiCall.json();
        if(astro.success) {
            this.setState({imgurURL: astro.data.link});
        } else {
            console.log("Error POST IMGUR");
        }
      } catch (err) {
          console.log("Err POST IMGUR", err);
      }
    }

    async componentDidUpdate(prevProps) {
        if(prevProps !== undefined && prevProps.navigation.state.params !== undefined){ // Dodałem warunek, jest ok
          if(prevProps != null && 
            prevProps.navigation.state.params.id != this.props.navigation.state.params.id) { // (po świeżym logowaniu) TypeError: undefined is not an object (evaluating 'prevProps.navigation.state.params.id')
            console.log('params1:', this.props.navigation.state.params);

            try {
              const auth_token = await AsyncStorage.getItem('auth_token');
              const urlAPI = "https://astro-api-dev.herokuapp.com/events/" + this.props.navigation.state.params.id;
              const astroApiCall = await fetch(urlAPI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth_token
                }
              });

              const astro = await astroApiCall.json();
              this.setState({eventId: astro.event.id, eventName: astro.event.name, eventDate: astro.event.date,
                eventType: astro.event.type, eventTypeID: astro.event.preference_id});
              this.setState({comments: astro.event.comments});
            } catch (err) {
              console.log('Err GET events:id', err);
            }
          }
        }
    }

    async componentDidMount() {
      console.log('params3:', this.props.navigation.state.params);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // CAMERA_ROLL ->	READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE
      this.setState({ hasCameraPermission: status === "granted" });
      
        this._interval = setInterval(() => {
            this.calcDateDiff();
        }, 1000);

        var link = 'https://astro-api-dev.herokuapp.com/current_event/';
        if(this.props.navigation.state.params !== undefined && this.props.navigation.state.params.length > 0){
          link = "https://astro-api-dev.herokuapp.com/events/" + this.props.navigation.state.params.id;
          
          try {
            const auth_token = await AsyncStorage.getItem('auth_token');
            const urlAPI = link;
            const astroApiCall = await fetch(urlAPI, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': auth_token
              }
            });

            const astro = await astroApiCall.json();
            this.setState({eventId: astro.event.id, eventName: astro.event.name, eventDate: astro.event.date,
              eventType: astro.event.type, eventTypeID: astro.event.preference_id});
            this.setState({comments: astro.event.comments});
          } catch (err) {
            console.log('Err GET events:id', err);
          }
          
        }else{
          try {
            const auth_token = await AsyncStorage.getItem('auth_token');
            const astroApiCall = await fetch(link, {
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
            console.log('Err GET current_event', err);
          }
        }

       
      }

      showImage = (author, url) => {
        this.setState({isImageViewVisible: true, images: [{
            source: {
              uri: url,
            },
            title: author
          }]
        });
      }

      closeImage = () => {
        this.setState({isImageViewVisible: false});
      }

      componentWillUnmount() {
        clearInterval(this._interval);
      }
/* ---------------------- */
    render() {
      const { image, hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />
       }
       else if (hasCameraPermission === false) {
        return <Text style={styles.accessDenied}>Access to camera has been denied.</Text>;
       }
       else {
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
                  <Text style={styles.eventTitle}>{ this.state.eventName == '' || this.state.eventName == null ? 'User event' : this.state.eventName}</Text>
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
                      <View style={styles.commentWrap}>
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
                      <View style={styles.commentImage}>
                        {
                          comment.url != null && comment.url != '' ?
                            (

                              <TouchableOpacity style={styles.commentAvatar} onPress={() => this.showImage(comment.user_email, comment.url)} >
                                <Image
                                  style={{width: 80, height: 60}}
                                  source={{uri: comment.url}}
                                />
                              </TouchableOpacity>
                            )
                            :
                            (<View />)
                        }
                      </View>
                    </View>
                  )})
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
                  value={this.state.newComment} 
                  placeholder="Enter your comment..."

                  style={styles.textarea} />
                
                <View style={{minWidth: '70%', minHeight: '40%', maxHeight: '45%', maxWidth: '90%', marginTop: 10}}>
                  <Image source={{ uri: image }} style={{width: '100%', height: '100%'}} ></Image>
                </View>
                
                <View style={styles.modalButtons}>
                  <Button
                    raised
                    buttonStyle={[styles.modalButton, {backgroundColor: '#333333', borderRadius: 0}]}
                    title={`Set image`}
                    onPress={this._getPhotoLibrary.bind(this)}
                  />
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
            <ImageView
              images={this.state.images}
              imageIndex={0}
              isVisible={this.state.isImageViewVisible}
              onClose={this.closeImage.bind(this)}
            />
            <View style={styles.bottomSection}>
                    <View style={styles.navigation}>
                    <Button
                        raised
                        buttonStyle={{backgroundColor: '#222222', borderRadius: 0, paddingBottom: 20}}
                        textStyle={{textAlign: 'center'}}
                        title="All events"
                        onPress={this.navigateToEvents.bind(this)}
                        />
                    </View>
                </View>
          </SafeAreaView>
        )
    }
  }
}
export default withNavigation(EventScreen);