import React from 'react';
import Animated from 'react-native-reanimated';
import { Text, StyleSheet, Image } from 'react-native';

export default function Logo ({scale}) {
    return (
        <Animated.View style={{ ...styles.logo, transform: [{scale: scale}] }}>
            <Image source={require("./StudifyLogo.png")} style={{ ...styles.image }}/>
            <Text style={{ fontWeight: "400", fontSize: 20}}> studify </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    logo: {
        backgroundColor: "white",
        height: 120,
        width: 120,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    image: {
        height: 80, width: 80, resizeMode: "contain", marginLeft: 10
    },
});