import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, StyleSheet, TextInput, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [cutoffTime, setCutoffTime] = useState(15);     // Default 15s cutoff
  const [inputValue, setInputValue] = useState('15');   // For TextInput
  const [countdown, setCountdown] = useState(0);        // Countdown timer
  const timerRef = useRef<number | null>(null); // Reference to the timer

  // Handle updating cutoff time
  const handleUpdate = () => {
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setCutoffTime(newValue);
    }
  };

  // Start countdown (simulating incoming call)
  const startCountdown = () => {
    setCountdown(cutoffTime);
  };

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      {/* Show current cutoff time */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Call Cutoff Time: {cutoffTime} s</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Input + OK button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="OK" onPress={handleUpdate} />
      </View>

      {/* Countdown Display */}
      <View style={styles.timerContainer}>
        <ThemedText type="subtitle">
          {countdown > 0 ? `Call will hang up in ${countdown} s` : 'No active call'}
        </ThemedText>
        <Button title="Simulate Incoming Call" onPress={startCountdown} />
      </View>

      {/* Original content */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  timerContainer: {
    marginVertical: 20,
    alignItems: 'center',
    gap: 10,
  },
});
