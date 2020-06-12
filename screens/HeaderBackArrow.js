import { TapGestureHandler } from 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HeaderBackArrow = ({isOpenAnimation, gestureHandler }) => {
    const opacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1]
    })

    return (
        <TapGestureHandler { ...gestureHandler }>
            <Animated.View style={{ ...styles.BackArrow, opacity }}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} />
            </Animated.View>
        </TapGestureHandler>      
    );
}
export default HeaderBackArrow;

const styles = StyleSheet.create({
    BackArrow: {
        position: "absolute",
        height: 60,
        width: 60,
        top: 40,
        left: 20,
        zIndex: 100
    }
});