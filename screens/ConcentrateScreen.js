import React, { Component } from 'react';
import Player from './music_player_components/Player';

export const TRACKS = [
  {
    title: 'Concentration Music 1',
    artist: 'Gravity Music',
    albumArtUrl: "https://i.imgur.com/bDutmFm.jpg",
    audioUrl: "https://www.mboxdrive.com/concentration_music_01.mp3",
  },
  {
    title: 'Concentration Music 2',
    artist: 'Zen Meditation Planet',
    albumArtUrl: "https://i.imgur.com/zx8UNDk.jpg",
    audioUrl: 'https://www.mboxdrive.com/concentration_music_2.mp3',
  },
  {
    title: 'Concentration Music 3',
    artist: 'ChilledCow',
    albumArtUrl: 'https://i.imgur.com/Vrysh1E.jpg',
    audioUrl: 'https://www.mboxdrive.com/concentration_music_3.mp3',
  },
];

export default class ConcentrateScreen extends Component {
  render() {
    return <Player tracks={TRACKS} />
  }
}