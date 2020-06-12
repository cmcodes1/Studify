import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ForwardArrow = ({keyboardHeight}) => {
    const opacity = interpolate(keyboardHeight, {
        inputRange: [0, keyboardHeight],
        outputRange: [0, 1]
    })

    return (
        <Animated.View style={{ ...styles.forwardArrow, opacity, transform:[{ translateY: keyboardHeight}] }}>
            <FontAwesomeIcon icon={faArrowRight} size={24} color="white" />
        </Animated.View>
    );
}
export default ForwardArrow;

const styles = StyleSheet.create({
    forwardArrow: {
        position: "absolute",
        height: 60,
        width: 60,
        right: 10,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "#24a0ed",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    }
});