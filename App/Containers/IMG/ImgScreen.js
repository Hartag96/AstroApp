import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, Image, Alert} from 'react-native';
import Modal from "react-native-modal";
import {AsyncStorage} from 'react-native';
import styles from './ImgScreenStyle';
import { withOrientation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = {
  title: 'Choose image to share',
  chooseFromLibraryButtonTitle: 'Choose image from library',
  takePhotoButtonTitle: 'Take photo with camera',
}

export default class RootScreen extends Component {
  state = {
    isModalVisible2: false,
    modalText: 'Success :o',
    modalImage: 'https://png.pngtree.com/svg/20170724/success_405070.png',
    modalButtonText: 'Try again'
  };

  myfun=()=>{
    alert('clicked');
  }
  static navigationOptions = ({ navigate, navigation }) => ({
    title: "IMG"
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            style={{width: 200, height: 100}}
            source={{uri: 'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1415705305/gbokfpaf2lup8qyz2bva.png'}}
          />

        <TouchableOpacity style={{backgroundColor:'green',margin:10,padding:10}} onPress={this.myfun}>
          <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>

        </View>
      </View>
    )
  }
}
