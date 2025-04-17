import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import RulesModal from './rulesModal';
import { useUser } from '../contexts/UserContext';

const HomeHeader = () => {
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  
  // Utilisez directement useUser() pour récupérer les données
  const { userData } = useUser();
  const { username, balance, selectedAvatar, avatars } = userData;

  // Gestion de l'avatar
  const currentAvatar = selectedAvatar === 0 
    ? null  // ou utilisez une icône par défaut
    : avatars.find(a => a.id === selectedAvatar)?.avatar;

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.userSection}>
            <View style={styles.profileImageContainer}>
              {selectedAvatar === 0 ? (
                <View style={styles.defaultAvatarContainer}>
                  <Ionicons name="person" size={40} color="#fff" />
                </View>
              ) : (
                <Image 
                  source={currentAvatar} 
                  style={styles.profilePicture}
                />
              )}
            </View>
            <View style={styles.userInfo}>
              {/* Utilisez directement username du contexte */}
              <Text style={styles.userName}>
                {username || "Itilizatè"} {/* Fallback si username est vide */}
              </Text>
              <Text style={styles.userBalance}>
                Sòld <FontAwesome5 name="coins" size={14} color="#FFD700" style={styles.icon} /> 
                {" "}: {balance} Gdes
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.rulesButton}
            onPress={() => setRulesModalVisible(true)}
          > 
            <MaterialIcons name="rule" size={24} color="#ECDA77" />
          </TouchableOpacity>
        </View>
      </View>

      <RulesModal 
        visible={rulesModalVisible}
        onClose={() => setRulesModalVisible(false)}
      />
    </>
  );
};

export default HomeHeader;



const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    zIndex: 999,
  },
  header: {
    backgroundColor: '#245154',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    height: 80,
    borderBottomColor: '#ECDA77',
    borderBottomWidth: 4,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: -12,
    top: -5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 9,
    borderColor: '#245154',
    position: 'absolute',
    top: 0,
  },
  defaultAvatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#66B22E', // Couleur de fond pour l'avatar par défaut
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 9,
    borderColor: '#245154',
    position: 'absolute',
    top: 0,
  },
  userInfo: {
    marginLeft: 100,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userBalance: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  rulesButton: {
    padding: 10,
  },
});







