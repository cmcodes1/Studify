import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const AlbumArt = ({ url, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: url }}
      />
    </TouchableOpacity>
  </View>
);

export default AlbumArt;

const { width } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    marginTop: 20,
    borderRadius: 10,
    width: imageSize,
    height: imageSize,
  },
})
