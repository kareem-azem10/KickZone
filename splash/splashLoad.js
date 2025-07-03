import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

const backgroundImage = require('./photos2app/background.jpg');
const animation = require('./splash/animation.json');

const splashLoad = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.welcomeText}>Welcome to KickZone</Text>
            <LottieView
              ref={animationRef}
              source={animation}
              autoPlay
              loop={false}
              onAnimationFinish={() => navigation.navigate('HomeScreen')}
              style={styles.animation}
            />
          </View>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
}

export default splashLoad;

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
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});
