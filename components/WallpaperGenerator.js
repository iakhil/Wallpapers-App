import React, { useState } from 'react';
import { View, Image, Button, ActivityIndicator, StyleSheet, Text, TextInput, Alert, ImageBackground, Dimensions } from 'react-native';
import { generateWallpaper } from '../utils/api';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const { width, height } = Dimensions.get('window');  // Get the device screen dimensions

const WallpaperGenerator = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to generate a wallpaper!');
      return;
    }
    
    setLoading(true);
    
    // Dynamically set the image size based on the screen dimensions
    const screenSize = `${Math.round(width)}x${Math.round(height)}`;  // e.g., "1080x1920"
    
    const url = await generateWallpaper(prompt, screenSize);  // Pass screen size to API request
    setImageUrl(url);
    setLoading(false);
  };

  const handleSaveWallpaper = async () => {
    if (!imageUrl) {
      Alert.alert('No wallpaper', 'Generate a wallpaper before saving.');
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + 'wallpaper.png';
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Success', 'Wallpaper saved to your gallery!');
      } else {
        Alert.alert('Error', 'Permission to access media library is required to save wallpapers.');
      }

    } catch (error) {
      console.error('Error saving wallpaper:', error);
      Alert.alert('Error', 'Failed to save the wallpaper.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.gif')} // 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header Title */}
        <Text style={styles.header}>Generate Wallpapers on the go!</Text>
        
        {/* TextInput for entering the wallpaper prompt */}
        <TextInput
          style={styles.input}
          placeholder="Enter wallpaper description..."
          value={prompt}
          onChangeText={setPrompt}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <Button title="Generate Wallpaper" onPress={handleGenerate} />
            
            {imageUrl && (
              <View style={styles.buttonSpacing}>
                <Button
                  title="Save Wallpaper"
                  onPress={handleSaveWallpaper}
                  color="green"
                />
              </View>
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Helvetica',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonSpacing: {
    marginTop: 20,
  },
});

export default WallpaperGenerator;
