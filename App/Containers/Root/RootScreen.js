import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import styles from './RootScressStyle';

class RootScreen extends Component {
  componentMountDid() {

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
        <Button title="Log in" style={styles.frontButton}></Button>
        <Text style={styles.textMargin}>Or</Text>
        <Button title="Sign up" style={styles.frontButton}></Button>
      </View>
    )
  }
}

export default RootScreen
