import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Controls = ({ paused, onPressPlay, onPressPause, onBack, onForward, forwardDisabled }) => (
  <View style={styles.container}>
    <View style={{ width: 40 }} />
    <TouchableOpacity onPress={onBack}>
      <Image source={require('../music_player_images/ic_skip_previous_white_36pt.png')} />
    </TouchableOpacity>
    <View style={{ width: 20 }} />
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image source={require('../music_player_images/ic_pause_white_48pt.png')} />
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image source={require('../music_player_images/ic_play_arrow_white_48pt.png')} />
        </View>
      </TouchableOpacity>
    }
    <View style={{ width: 20 }} />
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && { opacity: 0.3 }]}
        source={require('../music_player_images/ic_skip_next_white_36pt.png')} />
    </TouchableOpacity>
    <View style={{ width: 40 }} />
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
