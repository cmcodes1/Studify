import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT } from './Constants';
import { interpolateColor } from 'react-native-redash';

const OverlayBg = ({isOpenAnimation}) => {

    const translateY = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT],
    })

    const backgroundColor = interpolateColor(isOpenAnimation, {
        inputRange: [0, 0.1, 1],
        outputRange: ["#24a0ed", "#ffffff", "#ffffff"],
    })

    return (
        <Animated.View
            style={{
                height: LOGIN_VIEW_HEIGHT,
                backgroundColor,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transform: [{ translateY }],
            }}
        >
        </Animated.View>
    );
}
export default OverlayBg;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});