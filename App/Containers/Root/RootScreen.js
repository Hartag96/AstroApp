import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, Alert} from 'react-native';
import styles from './RootScressStyle';

export default class RootScreen extends Component {
    handlePress = async () => {
        try {
            const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/authenticate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": {
                        "email": "piotr@wp.pl", //this.state.mail,
                        "password": "Piotr.123" //this.state.password
                    }
                })
            });

            const astro = await astroApiCall.text();
            console.log(astro);
            Alert.alert(astro);
        } catch (err) {
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
        <TextInput style={styles.mailInput} placeholder="jan@dzban.com"/>
        <TextInput style={styles.passwordInput} placeholder="password" secureTextEntry={true}/>
        <Button title="Log in" style={styles.frontButton} onPress={this.handlePress.bind(this)}/>
        <Text style={styles.textMargin}>Or</Text>
        <Button title="Sign up" style={styles.frontButton} onPress={() =>
            this.props.navigation.navigate('Register')
        }/>
      </View>
    )
  }
}
