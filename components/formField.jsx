import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

import { icons } from '../constants';
import { useState } from 'react';

const FormField = ({title, handlechangeText, value, otherStyles, placeHolder, keyboardType, ...props}) => {
  const [showPasseword, setshowPasseword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        value={value}
        onChangeText={handlechangeText}
        style={styles.input}
        placeholderTextColor="#7B7B8B"
        secureTextEntry={title === 'Paswòd' && !showPasseword} 
        placeholder={placeHolder}
           
        />
        {title === 'Paswòd' && <TouchableOpacity onPress={() => setshowPasseword(!showPasseword)}>
          <Image source={showPasseword ? icons.eye : icons.eyeHide} style={styles.icon}/>
        </TouchableOpacity>}
       
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: "#245154",
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#ECEBED",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#245154",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});