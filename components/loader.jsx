import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from "react-native";

const Loader = ({ isLoading }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      style={[styles.loaderContainer, {height: screenHeight,}]}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust opacity as needed
    zIndex: 10,
  },
});

export default Loader;


