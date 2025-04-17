import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import MenuItem from '../../components/menuItem';
import { useUser } from '../../contexts/UserContext';

const RechargeScreen = () => {
  const { userData } = useUser();
  const { balance } = userData;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#245154" style="light" />
      
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kont Mwen</Text>
      </View>

      {/* Solde */}
      <View style={styles.balanceContainer}>
        <View style={styles.soldContainer}>
          <Text style={styles.balanceText}>Sòld</Text>
          <FontAwesome5 name="coins" size={20} color="#FFD700" style={styles.icon} />
        </View>
        <Text style={styles.balanceAmount}>{balance} Gdes</Text>
      </View>

      {/* Boutons Dépôt et Retrait */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <FontAwesome5 name="plus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Depo</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <FontAwesome5 name="minus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Retrè</Text>
          </View>
      </TouchableOpacity>
      </View>
      <View style={{padding: 20}}>
      <MenuItem 
        title="Tranzaksyon mwen yo" 
        icon="list"
      />

      </View>
      
    </SafeAreaView>
  );
};

export default RechargeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEBED',
    
  },
  header: {
    backgroundColor: '#245154',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomColor: '#ECDA77',
    borderBottomWidth: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  soldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 20,
    color: '#245154',
    marginRight: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  balanceAmount: {
    fontSize: 25,
    color: '#245154',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#66B22E',
    borderRadius: 10,
    width: '45%',
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});




