import React from 'react';
import { StyleSheet, View } from 'react-native';
import WallpaperGenerator from './components/WallpaperGenerator';

export default function App() {
  return (
    <View style={styles.container}>
      <WallpaperGenerator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
