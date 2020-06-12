import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, PixelRatio, TouchableOpacity, Image, FlatList, Keyboard, Platform, Alert} from 'react-native';

export default function ProfileScreen( {navigation} ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Profile appears here</Text>
          {/* Profile Image code goes here*/}
      </View>
    );
}

const isAndroid = Platform.OS == "android";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1'
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    width: "90%"
  },
  listItem: {
    paddingTop: 30,
    paddingBottom: 2,
    fontSize: 20
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    width: 50,
    height: 20
  },
  textInput: {
    fontSize: 25,
    height: 50,
    width: "90%",
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    justifyContent: 'flex-end'
  }
});