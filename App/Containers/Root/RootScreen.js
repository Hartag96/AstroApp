import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, Alert} from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import styles from './RootScressStyle';
import { withOrientation } from 'react-navigation';

export default class RootScreen extends Component {
  state = {
    isModalVisible2: false,
    modalText: 'Success :o',
    modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
    modalButtonText: 'Try again',
    mail: '',
    password: ''
  };

  constructor(props){
    super(props);
    AsyncStorage.setItem("preferences", null).then( () => {
    });
  }

  static navigationOptions = ({ navigate, navigation }) => ({
    title: "Log in"
  })

  toggleModal = (success) => {
    if(this.state.modalButtonText == 'Close'){
      this.setState({ isModalVisible2: !this.state.isModalVisible2 });
      this.props.navigation.navigate('Home');
    }
    if(success){
      this.setState({ 
        modalText: 'Logged in',
        modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
        modalButtonText: 'Close'
      });
    }else{
      this.setState({ 
        modalText: 'Invalid credentials',
        modalImage: 'https://png.pngtree.com/svg/20170818/fail_641019.png',
        modalButtonText: 'Try again'
      });
    }
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });
  };

  handlePress = async () => {
      try {
          const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/authenticate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": "test@test.pl",
              "password": "1qaz@WSX"
            })
          });

          const astro = await astroApiCall.json();
          if(!astro.error){
            this.toggleModal(true);
            await AsyncStorage.setItem("auth_token", astro.auth_token);
          }else{
            this.toggleModal(false);
          }
      } catch (err) {
        this.toggleModal(false);
      }
  }

  loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            style={{width: 200, height: 100}}
            source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
          />
          <TextInput style={styles.mailInput} placeholder="jan@dzban.com"/>
          <TextInput style={styles.passwordInput} placeholder="password" secureTextEntry={true}/>
          <Button title="Log in" style={styles.frontButton} onPress={this.handlePress.bind(this)} />
          <Text style={styles.textMargin}>Or</Text>
          <Button title="Sign up" style={styles.frontButton} onPress={() =>
              this.props.navigation.navigate('Register')
          }/>
        </View>
        <Modal isVisible={this.state.isModalVisible2}>
          <View style={styles.modal}>
            <Image
              style={{width: 100, height:100}}
              source={{uri: this.state.modalImage}}
            />
            
            <Text style={{paddingBottom: 15, paddingTop: 15}}>{this.state.modalText}</Text>
            <Button stype={{flex: 1}} title={this.state.modalButtonText} onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    )
  }
}
