import React, { Component } from 'react';
import { StyleSheet, Alert, Permissions, Text, View, Button, TextInput, Image } from 'react-native';
import styles from './RegistrationStyle';

export default class RegistrationScreen extends Component {
    constructor() {
        super();
        this.state = {
            view: 0
        };
    }
    componentMountDid() {

    }

    state = {
        firstname: '',
        lastname: '',
        mail: '',
        password: '', // wymagane bezpieczne hasło
        confirmpassword: ''
    };

    handlePress = async () => {
        if(!this.state.firstname || !this.state.lastname || !this.state.password || !this.state.confirmpassword || !this.state.mail){
            alert("Empty value");
        } else if((this.state.password !== this.state.confirmpassword) || this.state.password.length < 6){
            alert("Passwords don't match");
        } else {
            try {
                const astroApiCall = await fetch('https://astro-api-dev.herokuapp.com/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "user": {
                            "email": this.state.mail,
                            "password": this.state.password,
                            "password_confirmation": this.state.confirmpassword,
                            "first_name": this.state.firstname,
                            "last_name": this.state.lastname
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
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 200, height: 100}}
                    source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
                />
                <TextInput style={styles.mailInput} onChangeText={(value) => this.setState({firstname: value})} placeholder="First name"/>
                <TextInput style={styles.mailInput} onChangeText={(value) => this.setState({lastname: value})} placeholder="Last name"/>
                <TextInput style={styles.mailInput} onChangeText={(value) => this.setState({mail: value})} placeholder="jan@dzban.com"/>
                <TextInput style={styles.passwordInput} onChangeText={(value) => this.setState({password: value})} placeholder="Password" secureTextEntry={true}/>
                <TextInput style={styles.passwordInput} onChangeText={(value) => this.setState({confirmpassword: value})} placeholder="Confirm password" secureTextEntry={true}/>
                <Button title="Sign up" style={styles.frontButton} onPress={this.handlePress.bind(this)} />
            </View>
        )
    }
}
