import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 200, height: 100}}
        source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
      />
      <TextInput style={styles.mailInput} placeholder="jan@dzban.com"></TextInput>
      <TextInput style={styles.passwordInput} placeholder="password" secureTextEntry={true}></TextInput>
      <Button title="Log in" style={styles.frontButton}></Button>
      <Text style={styles.textMargin}>OR</Text>
      <Button title="Sign up" style={styles.frontButton}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMargin: {
    marginVertical: 5
  },
  frontButton: {
    width: 100
  },
  mailInput: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: '60%',
    borderColor: '#222222',
  },
  passwordInput: {
    borderWidth: 1,
    marginVertical: 13,
    padding: 10,
    width: '60%',
    borderColor: '#222222',
  }
});
