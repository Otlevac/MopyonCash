import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image,Text, View } from 'react-native';
import { Tabs } from 'expo-router';

import { icons } from "../../constants";

const TabIcon = ({icon, name, color, focused}) => {
  return(
    <View style={styles.imageContainer}>
      <Image source={icon} 
      resizeMode="contain" 
      tintColor={color}
      style={styles.image}
      />
      <Text
      style={[
        styles.textXs,
        focused ? styles.fontPsemibold : styles.fontPregular,
        {color:color}
      ]}
      
      >{name}</Text>
    </View>
  );

};

const TabLayout = () => {
  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarActiveTintColor: "#ECDA77",
          tabBarInactiveTintColor: "#ECEBED",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#245154",
            borderTopWidth: 1,
            // borderTopColor: "#232533",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 84, 

          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Akèy",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Akèy"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="recharge"
          options={{
            title: "Rechaj",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.rechaj}
                color={color}
                name="Rechaj"
                focused={focused}
              />
            ),
          }}
        />

  
        <Tabs.Screen
          name="profil"
          options={{
            title: "Pwofil",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Pwofil"
                focused={focused}
              />
            ),
          }}
        />
        

      </Tabs> 
      <StatusBar backgroundColor="#161622" style="light"/>
    </>
      
  );
}

export default TabLayout


const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    
  },
  fontPsemibold: {
    fontFamily: "Poppins-SemiBold",
  },
  fontPregular: {
    fontFamily: "Poppins-Regular",
  },
  textXs: {
    fontSize: 16, 
  },
  
})