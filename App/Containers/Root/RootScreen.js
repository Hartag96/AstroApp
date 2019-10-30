import React, { Component } from 'react';
import { StyleSheet, Alert, Permissions, Text, View, Button, TextInput, Image } from 'react-native';
import styles from './RootScressStyle';

class RootScreen extends Component {
  constructor() {
    super();
    this.state = {
      view: 0
    };
  }
  componentMountDid() {

  }

  handlePress = async () => {
    try {
      const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user": {
            "email": "jadadan@dzban.plwe",
            "password": "1qdadaaz@WSX",
            "password_confirmation": "1qdadaaz@WSX",
            "first_name": "Ciekawe czy pojdzie xd",
            "last_name": "Dzban utworzony :D"
          }
        })
      });
      const astro = await astroApiCall.text();
      console.log(astro);
      Alert.alert(astro);
    } catch(err) {
      console.error(err);
      Alert.alert("Lolek");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 100}}
          source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
        />
        <TextInput style={styles.mailInput} placeholder="jan@dzban.com"></TextInput>
        <TextInput style={styles.passwordInput} placeholder="password" secureTextEntry={true}></TextInput>
        <Button title="Log in" style={styles.frontButton} onPress={this.handlePress.bind(this)}></Button>
        <Text style={styles.textMargin}>OR</Text>
        <Button title="Sign up" style={styles.frontButton}></Button>
      </View>
    )
  }
}

export default RootScreen
