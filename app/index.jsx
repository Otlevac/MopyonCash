import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/customButton";

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FFFFFF', '#66B22E']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image 
                source={images.logo}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>

            <View style={styles.textContent}>
              <Text style={styles.title}>Byenvini nan MòpyonCash!</Text>
              
              <Text style={styles.subtitle}>
                Kote wap ka pran plezi ou epi fè kòb met sou li.
              </Text>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Kòmanse"
                  containerStyles={styles.button}
                  handlePress={() => router.push("/sign-in")}
                  textStyles={styles.buttonText}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      
      <StatusBar backgroundColor="#245154" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: width * 0.7,
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#245154',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#245154',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#245154',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
