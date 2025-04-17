import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';


const CustomButton = ({title, handlePress, isLoading, containerStyles, textStyle}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    disabled={isLoading}
    style={[styles.container, containerStyles, isLoading ? styles.loading : {}]}
    activeOpacity={0.7}

    >
      <Text style={[styles.text, textStyle]}>{title}</Text>

      {isLoading && (<ActivityIndicator
      animating={isLoading}
      color="#fff"
      size="small"
      style={{marginLeft: 8}}

      />)}
    </TouchableOpacity>
  );
};

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#245154",
    borderRadius: 16,
    minHeight: 62,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ECEBED",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  loading: {
    opacity: 0.5,
  },
  
});