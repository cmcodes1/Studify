import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

function fetchData(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class Profile extends Component {

  state = {
    present: 0,
    total: 0,
    dpPath: 'path',
    username: "username",
    bio: "bio",
    refreshing: false,
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true}, () => {
      this.componentDidMount();
    });
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  saveUsername = () => {
    AsyncStorage.setItem("USERNAME", this.state.username);
  };

  saveBio = () => {
    AsyncStorage.setItem("BIO", this.state.bio);
  };

  chooseFile = () => {
    var options = {
      title: 'Select Profile Photo',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
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

        this.setState({
          dpPath: source.uri,
        });

        AsyncStorage.setItem('Image_id_2', this.state.dpPath);
      }
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('Image_id_2').then((value) => {
      this.setState({dpPath: value});
    });
    AsyncStorage.getItem("USERNAME").then((value) => {
      if(value) {
        this.setState({username: (value || this.state.username).toString() });
      }
    });
    AsyncStorage.getItem("BIO").then((value) => {
      if(value) {
        this.setState({bio: (value || this.state.bio).toString() });
      }
    });
    AsyncStorage.getItem("PRESENT").then((value) => {
      if(value) {
        this.setState({ present: JSON.parse(value || this.state.present) });
      }
    });
    AsyncStorage.getItem("TOTAL").then((value) => {
      if(value) {
        this.setState({ total: JSON.parse(value || this.state.total) });
      }
    });
    
  }

  render() {
    var overall_attendance = ((this.state.present / this.state.total) * 100).toFixed(2);
    
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}></View>
          <>
            {
              (this.state.dpPath)
              ?
                <Image
                  source={{ uri: this.state.dpPath }}
                  style={ styles.avatar }
                />
              :
              <Image style={styles.avatar} source={require("./avatar.png")} />
            }
          </>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.username}</Text>
              <Text style={styles.bio}>{this.state.bio}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this.chooseFile.bind(this)}>
                  <Text style={{color: "grey", padding: 5}}>Update Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <TextInput
                    style={{padding: 5}}
                    alignItems="center"
                    placeholder="Update Username"
                    returnKeyLabel = {"next"}
                    onChangeText={(text) => this.setState({username:text})}
                    onSubmitEditing={this.saveUsername}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <TextInput
                    style={{padding: 5}}
                    alignItems="center"
                    placeholder="Update Bio"
                    returnKeyLabel = {"next"}
                    onChangeText={(text) => this.setState({bio:text})}
                    onSubmitEditing={this.saveBio}      
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.listItemCont}>Overall attendance :  { (overall_attendance>=0) ? overall_attendance : 0} %</Text>
              <>
                {
                  (overall_attendance > 60)
                  ?
                  <Text style={[styles.listItemCont, {color: "limegreen"}]}>Well done! Keep it up! 👍</Text>
                  :
                  <Text style={[styles.listItemCont, {color: "red"}]}>Don't miss the next class! 🙄</Text>
                }
              </>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#24a0ed",
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 80
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  bio:{
    fontSize:16,
    color: "#24a0ed",
    marginTop:10
  },
  buttonContainer: {
    marginTop:20,
    marginBottom:10,
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: "#fff",
  },
  listItemCont: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop:50,
    width: 315,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    padding: 15,
    fontSize: 20,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontWeight: "bold",
    color: "#24a0ed",
  }
});