import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, Alert} from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import styles from './ImgScreenStyle';
import { withOrientation } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class RootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      image: null,
      base: null,
      isModalVisible: false,
      modalText: 'Success :o',
      modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
      modalButtonText: 'Close'
    }
  }

  static navigationOptions = ({ navigate, navigation }) => ({
    title: "Share Photo",
    headerRight: <Button style={{marginRight: 10}} title="Logout" onPress={ async ()=>{ await AsyncStorage.setItem("auth_token", '').then(() => {
      navigation.navigate('Login');
    }); }} />,
  })

  hideModal = () => {
    this.setState({isModalVisible: false});
}

showModal = (type) => {
    var text = '';
    var image = 'https://png.pngtree.com/svg/20170818/fail_641019.png';
    var btnText = 'Try again';

    if(type == 'success'){
        text = 'We have url to image :D!';
        image = 'https://png.pngtree.com/svg/20170724/success_405070.png';
        btnText = 'Close';
    }else if(type == 'error'){
        text = 'Error'
    }else{
        text = 'Something went wrong'
    }

    this.setState({ 
        isModalVisible: true, 
        modalText: text, 
        modalImage: image,
        modalButtonText: btnText 
    });
};


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // CAMERA_ROLL ->	READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE
    this.setState({ hasCameraPermission: status === "granted" });
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
    //  console.log("Test 13", astro);
      if(astro.success) {
          this.showModal('success');
          console.log("Testowy test", astro.data.link);
      } else {
          this.showModal('error');
      }
  } catch (err) {
      this.showModal('error');
      console.log("Err");
  }
  }

  render() {
    const { image, hasCameraPermission, base64 } = this.state;
    if (hasCameraPermission === null) {
     return <View />
    }
    else if (hasCameraPermission === false) {
     return <Text style={styles.center}>Access to camera has been denied.</Text>;
    }
    else {
     return (
      <View style={{ flex: 1 }}>
        <View style={styles.activeImageContainer}>
        {image ? ( <Image source={{ uri: image }} style={{ flex: 1 }} /> ) : (
         <View />
        )}
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button onPress={this._getPhotoLibrary.bind(this)} title="Share Photo!"/>
        </View>
        <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
                <Image
                style={{width: 100, height:100}}
                source={{uri: this.state.modalImage}}
                />
                <Text style={{paddingBottom: 15, paddingTop: 15}}>{this.state.modalText}</Text>
                <Button stype={{flex: 1}} title={this.state.modalButtonText} onPress={this.hideModal} />
            </View>
        </Modal>
      </View>
     );
    }
   }
}
