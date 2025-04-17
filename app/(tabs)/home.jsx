// import React, { useState } from 'react';
// import { StyleSheet, View, Image, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';

// import { images } from "../../constants";
// import HomeHeader from "../../components/homeHeader";
// import CustomButton from '../../components/customButton';
// import BetModal from '../../components/betModal';

// import {useUser} from "../../contexts/UserContext"

// const HomeScreen = () => {
//   const { userData, updateBalance } = useUser();
//   const {username, balance, selectedAvatar} = userData;
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleBetSelection = (amount) => {
//     console.log(`Montant sélectionné: ${amount} Gdes`);
//     setModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
     
//       <HomeHeader 
//       username={username} 
//       balance={balance} 
//       avatar={selectedAvatar}
//       />
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.container}>
//           <HomeImage />
//           <CustomButton 
//             title="AFWONTE YON ADVÈSÈ"
//             // textStyle={{}}
//             containerStyles={styles.button}
//             handlePress={() => setModalVisible(true)}
//           />
//         </View>
//       </ScrollView>

//       <BetModal 
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onSelectBet={handleBetSelection}
//       />

//       <StatusBar style='light' backgroundColor="#245154" />
//     </SafeAreaView>
//   );
// };

// const HomeImage = () => (
//   <Image 
//     source={images.mopyonHome} 
//     resizeMode='contain' 
//     style={styles.image} 
//   />
// );

import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { images } from "../../constants";
import HomeHeader from "../../components/homeHeader";
import CustomButton from '../../components/customButton';
import BetModal from '../../components/betModal';

import { useUser } from "../../contexts/UserContext"

const HomeScreen = () => {
  const { updateBalance } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  const handleBetSelection = (amount) => {
    console.log(`Montant sélectionné: ${amount} Gdes`);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Plus besoin de passer les props manuellement */}
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <HomeImage />
          <CustomButton 
            title="AFWONTE YON ADVÈSÈ"
            containerStyles={styles.button}
            handlePress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <BetModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectBet={handleBetSelection}
      />

      <StatusBar style='light' backgroundColor="#245154" />
    </SafeAreaView>
  );
};

const HomeImage = () => (
  <Image 
    source={images.mopyonHome} 
    resizeMode='contain' 
    style={styles.image} 
  />
);

export default HomeScreen;




const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ECEBED", 
    height: "100%"
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    maxWidth: 380,
    width: '90%',
    height: 498,
    
  },
  button: {
    width: '80%',
    marginTop: 20,
    borderBottomColor: '#ECDA77',
    borderBottomWidth: 4,
    minHeight: 70,
  },
});



