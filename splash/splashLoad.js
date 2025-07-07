import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { strings } from '../strings'


const backgroundImage = require('../photos2app/background.jpg');
const animation = require('./animation.json');

export const splashLoad = () => {
  const { Tiltels } = strings.arabic

  const navigation = useNavigation();
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  const handleAnimationFinish = () => {
    // Add a small delay before navigation to ensure smooth transition
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>{Tiltels.title}</Text>
          <LottieView
            ref={animationRef}
            source={animation}
            autoPlay
            loop={false}
            onAnimationFinish={handleAnimationFinish}
            style={styles.animation}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 100,
  },
  animation: {
    width: 300,
    height: 300,
  },
});
