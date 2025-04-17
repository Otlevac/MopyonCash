import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { useUser } from '../contexts/UserContext';

const ProfileHeader = () => {
  const { userData } = useUser();
  const { username, balance, selectedAvatar, avatars } = userData;

  // Trouver l'avatar correspondant
  const currentAvatar = selectedAvatar === 0 
    ? null 
    : avatars.find(a => a.id === selectedAvatar)?.avatar;

  return (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        {selectedAvatar === 0 ? (
          <View style={styles.defaultAvatarContainer}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
        ) : (
          <View style={styles.selectedAvatar}>
            <Image 
              source={currentAvatar} 
              style={styles.selectedImage}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
      <View style={styles.userInfo}>
        {/* Ajout d'un fallback si le username est vide */}
        <Text style={styles.username}>
          {username || "Itilizatè"}
        </Text>
        <Text style={styles.balance}>
          Sòld <FontAwesome5 
            name="coins" 
            size={14} 
            color="#FFD700" 
            style={styles.icon} 
          />
          {" "}: {" " + (balance || 0)} Gdes
        </Text>
      </View>
    </View>
  );
};

// Styles (gardez vos styles existants)
const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#245154',
    borderBottomColor: '#ECDA77',
    borderBottomWidth: 4,
  },
  avatarContainer: {
    marginRight: 15,
  },
  defaultAvatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#66B22E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balance: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    marginLeft: 5,
  },
});

export default ProfileHeader;



