import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, CheckBox, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation'

import styles from './AuthorizationStyle';

class AuthorizationView extends Component {
    constructor(props){
        super(props);


        var isLogged = AsyncStorage.getItem("auth_token").then((value) => {
            console.log(value);
            if(value === '' || value === null || value === undefined){
                AsyncStorage.setItem("preferences", null).then( () => {
                });
            }else{
                var preferences = AsyncStorage.getItem("preferences").then((value) => {
                    if( value === "" || value === null || value === undefined){
                        this.props.navigation.navigate('Event', {});
                    }else{
                        this.props.navigation.navigate('Settings', {});
                    }
                })
            }
        })
    }

    state = {
        wantToLogin: true,
        firstname: '',
        lastname: '',
        mail: '',
        password: '',
        confirmpassword: '',
        navigationText: 'Switch to registration.'
    }
    
    static navigationOptions = ({ navigate, navigation }) => ({
        header: null
      })

    toggleView(){
        this.setState({wantToLogin: !this.state.wantToLogin});
        if(!this.state.wantToLogin){
            this.setState({navigationText: 'Switch to registration.'})
        }else{
            this.setState({navigationText: 'Switch to login.'})
        }
    }

    login = async () => {
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
  
            
            const response = await astroApiCall.json();
            if(!response.error){
              await AsyncStorage.setItem("auth_token", response.auth_token);
              this.props.navigation.navigate('Event');   
            }else{
                console.log('lolek');
            }
        } catch (err) {
            console.log(JSON.stringify(err));
        }
    }

    signup = async () => {
        if(!this.state.firstname || !this.state.lastname || !this.state.password || !this.state.confirmpassword || !this.state.mail){
        } else if((this.state.password !== this.state.confirmpassword) || this.state.password.length < 6){
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

                const response = await astroApiCall.json();
                if(response.created) {
                    this.props.navigation.navigate('Event');   
                } else {
                }
            } catch (err) {
            }
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Image
                        style={{width: 200, height: 100}}
                        source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
                    />
                    <View style={[styles.bgGray, {display: this.state.wantToLogin ? 'flex' : 'none'}]}>
                        <Text>Enter your credentials:</Text>
                        <TextInput onChangeText={(value) => this.setState({firstname: value})} style={styles.mailInput} placeholder="Email"/>
                        <TextInput onChangeText={(value) => this.setState({password: value})} style={styles.passwordInput} placeholder="Password" secureTextEntry={true}/>
                        <Button
                            raised
                            buttonStyle={{backgroundColor: '#333333', borderRadius: 0}}
                            textStyle={{textAlign: 'center'}}
                            title="Log in"
                            onPress={this.login.bind(this)}
                        />
                    </View>
                    <View style={[styles.bgGray, {display: !this.state.wantToLogin ? 'flex' : 'none'}]}>
                        <Text>Create an account:</Text>
                        <TextInput onChangeText={(value) => this.setState({mail: value})} style={styles.mailInput} placeholder="Email"/>
                        <TextInput onChangeText={(value) => this.setState({password: value})} style={styles.passwordInput} placeholder="Password" secureTextEntry={true}/>
                        <TextInput onChangeText={(value) => this.setState({confirmpassword: value})} style={styles.passwordInput}  placeholder="Confirm password" secureTextEntry={true}/>
                        <Button
                            raised
                            buttonStyle={{backgroundColor: '#333333', borderRadius: 0}}
                            textStyle={{textAlign: 'center'}}
                            title="Sign up"
                            onPress={this.signup.bind(this)}
                        />
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.navigation}>
                    <Button
                        raised
                        buttonStyle={{backgroundColor: '#222222', borderRadius: 0}}
                        textStyle={{textAlign: 'center'}}
                        title={this.state.navigationText}
                        onPress={this.toggleView.bind(this)}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(AuthorizationView);