import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

function fetchData(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default class TimeTableScreen extends Component {

  constructor() {
    super();
    this.state = {
      filePath: 'val',
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.componentDidMount();
    });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
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
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = response;
        this.setState({ filePath: source.uri, });
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
      <>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {
            this.state.filePath
              ? (
                <Image source={{ uri: this.state.filePath }} style={styles.image} />
              ) : (
                <Button
                  title="Choose Time Table Photo"
                  onPress={this.chooseFile.bind(this)}
                  color="#24a0ed"
                />
              )
          }
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
