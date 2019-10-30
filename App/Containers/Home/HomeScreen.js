import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 200, height: 100}}
                    source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
                />
                <Button title="Logout" style={styles.frontButton} onPress={() =>
                    this.props.navigation.navigate('Login')}/>
            </View>
        )
    }
}
