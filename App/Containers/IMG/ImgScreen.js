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
    }
  }
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
      </View>
     );
    }
   }
}
