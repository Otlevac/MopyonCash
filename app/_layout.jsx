import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

import { UserProvider } from "../contexts/UserContext";

// Écran de chargement personnalisé
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Chargement des polices...</Text>
  </View>
);

// Styles pour l'écran de chargement
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

// Configuration des polices séparée
const fontConfig = {
  "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
  "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Utilisation de la configuration de police séparée
  const [fontsLoaded, error] = useFonts(fontConfig);

  // Gestion des erreurs et du chargement des polices
  useEffect(() => {
    const handleFontLoading = async () => {
      if (error) {
        console.error("Erreur de chargement des polices:", error);
        
        // Exemple de gestion d'erreur plus avancée
        try {
          // Vous pouvez ajouter une logique de repli ou d'alerte ici
          await SplashScreen.hideAsync();
        } catch (hideError) {
          console.error("Impossible de masquer l'écran de démarrage", hideError);
        }
        return;
      }

      if (fontsLoaded) {
        try {
          await SplashScreen.hideAsync();
        } catch (hideError) {
          console.error("Impossible de masquer l'écran de démarrage", hideError);
        }
      }
    };

    handleFontLoading();
  }, [fontsLoaded, error]);

  // Gestion de l'état de chargement
  if (!fontsLoaded && !error) {
    return <LoadingScreen />;
  }

  // Gestion des erreurs de chargement
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Erreur de chargement des polices</Text>
      </View>
    );
  }

  // Rendu principal de l'application
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Accueil'
          }}
        />
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            title: 'Authentification'
          }}
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            title: 'Tableau de bord'
          }}
        />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;


