import React, { Component } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

export default class TimeTableScreen extends Component {
  state = {
    filePath: 'val',
  };

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;

        this.setState({
          filePath: source.uri,
        });

        AsyncStorage.setItem('Image_id_1', this.state.filePath);
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('Image_id_1').then((value) => {
      this.setState({ filePath: value });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.filePath ? (
          <Image source={{ uri: this.state.filePath }} style={styles.image} />
        ) : (
            <Button
              title="Choose Time Table Photo"
              onPress={this.chooseFile.bind(this)}
              color="#24a0ed"
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
