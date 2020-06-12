import { TextInput, TapGestureHandler, State } from 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Keyboard } from 'react-native';
import Animated, { useCode, cond, eq, set, interpolate, SpringUtils, call, Easing } from 'react-native-reanimated';
import { withTimingTransition, onGestureEvent, withSpringTransition, delay } from 'react-native-redash';
import { SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT } from './Constants';
import Logo from './Logo';
import OverlayBg from './OverlayBg';
import HeaderBackArrow from './HeaderBackArrow';
import AnimatedPlaceholder from './AnimatedPlaceholder';
import ForwardArrow from './ForwardArrow';

export default function Login() {
  
    const scale = useRef(new Animated.Value(0));
    const scaleAnimation = withTimingTransition(scale.current);
    const textInputRef = useRef(null);

    const keyboardHeight = new Animated.Value(0);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);

        return function cleanUp() {
            Keyboard.removeListener("keyboardDidShow");
            Keyboard.removeListener("keyboardDidHide");
        };
    });
   
    const innerLoginY = interpolate(scaleAnimation, {
        inputRange: [0, 1],
        outputRange: [LOGIN_VIEW_HEIGHT, 0]
    });

    const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
    const gestureHandler = onGestureEvent({ state: gestureState.current });

    const backArrowGestureState = useRef(new Animated.Value(State.UNDETERMINED));
    const backArrowGestureHandler = onGestureEvent({ state: backArrowGestureState.current });

    const isOpen = useRef(new Animated.Value(0));
    const isOpenAnimation = withSpringTransition(isOpen.current, {
        ...SpringUtils.makeDefaultConfig(),
        overshootClamping: true,
        damping: new Animated.Value(20),
    });

    const outerLoginY = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT/2]
    });

    const headingOpacity = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const focusTextInput = () => {
        textInputRef.current.focus();
    };

    const blurTextInput = () => {
        textInputRef.current.blur();
    };

    const keyboardDidShow = e => {
        let toValue = - e.endCoordinates.height;
        Animated.timing(keyboardHeight, {
            toValue,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const keyboardDidHide = e => {
        Animated.timing(keyboardHeight, {
            toValue: 0,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    useCode(
        () =>
            cond(eq(gestureState.current, State.END), [
                cond(eq(isOpen.current, 0), [set(isOpen.current, 1)]),
                cond(eq(isOpen.current, 1), delay(call([], focusTextInput), 750)),
            ]),
        [gestureState.current],
    );
    useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

    useCode(
        () => cond(eq(backArrowGestureState.current, State.END), [
            set(gestureState.current, State.UNDETERMINED),
            call([], blurTextInput),
            delay(set(isOpen.current, 0), 250),
        ]),
        [backArrowGestureState.current],
    );
    
    return (
        <View style={styles.container}>
            <View style={{ ...styles.logoContainer}}>
              <Logo scale={scaleAnimation} />
            </View>
            <HeaderBackArrow isOpenAnimation={isOpenAnimation} gestureHandler={{ ...backArrowGestureHandler }} />
            <Animated.View style={{ backgroundColor: "white", ...StyleSheet.absoluteFill, transform: [{ translateY: outerLoginY }] }}>
                <OverlayBg isOpenAnimation={isOpenAnimation} />
                <ForwardArrow keyboardHeight={keyboardHeight} />
                <Animated.View>
                    <Animated.View
                        style={{
                            height: LOGIN_VIEW_HEIGHT,
                            backgroundColor: "white",
                            transform: [{ translateY: innerLoginY }],
                        }}
                    >
                        <Animated.View style={{ ...styles.heading, opacity: headingOpacity }}>
                            <Text style={{ fontSize: 16 }}>everything that a student needs</Text>
                        </Animated.View>
                        <TapGestureHandler {...gestureHandler}>
                            <Animated.View style={{ ...styles.textInputContainer }}>
                                <AnimatedPlaceholder isOpenAnimation={isOpenAnimation} />
                                <Image source={require("./India.png")} style={{ ...styles.image }} />
                                <Text style={{ ...styles.prefix }}>+91</Text>
                                <Animated.View pointerEvents="none">
                                    <TextInput
                                        ref={textInputRef}
                                        keyboardType="number-pad"
                                        style={{ ...styles.textInput }}
                                        placeholder="Enter your mobile number"
                                    />
                                </Animated.View>
                            </Animated.View>
                        </TapGestureHandler>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24a0ed",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 20
  },
  image: {
    height: 24, width: 24, resizeMode: "contain",  marginTop: 12, marginLeft: 20
  },
  prefix: {
    fontSize: 20, paddingHorizontal: 10, marginTop: 10
  },
  textInput: {
    fontSize: 18,
  },
  textInputContainer: {
    flexDirection: 'row', marginTop: 10
  }
});
