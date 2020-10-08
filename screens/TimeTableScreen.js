import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import PhotoView from 'react-native-photo-view-ex';

function fetchData(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default class TimeTableScreen extends Component {

  constructor() {
    super();
    this.state = { filePath: 'val' };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => { this.componentDidMount(); });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      quality: 1.0,
      storageOptions: { skipBackup: true, path: 'images' },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) { console.log('User cancelled photo picker'); }
      else if (response.error) { console.log('ImagePicker Error: ', response.error); }
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
    var day = new Date().getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var timezone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
    var parts = timezone.split(' '); var tz = ""; parts.forEach(function (element) { tz += element.substring(0, 1); });
    return (
      <>
        {
          this.state.filePath
            ? (
              <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                <View style={styles.timeContainer}>
                  <TouchableOpacity onPress={this._onRefresh.bind(this)}>
                    <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15 }}>Refresh</Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.day}>{dayNames[day]}</Text>
                    <Text style={styles.time}>{hour}{" : "}{minute}{" "}{timezone}</Text>
                  </View>
                  <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                    <Text style={{ fontSize: 15, color: "#fff", paddingRight: 15 }}>Update</Text>
                  </TouchableOpacity>
                </View>
                <PhotoView style={styles.image} source={{ uri: this.state.filePath }} minimumZoomScale={1} maximumZoomScale={2} />
              </ScrollView>
            ) : (
              <View style={styles.container} >
                <Button
                  title="Choose Time Table Photo"
                  onPress={this.chooseFile.bind(this)}
                  color="#24a0ed"
                />
              </View>
            )
        }
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
  timeContainer: {
    backgroundColor: "#24a0ed",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  day: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  time: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});