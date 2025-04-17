import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Share, 
  ScrollView, 
  Modal, 
  Text, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useRouter } from 'expo-router';

import ProfileHeader from "../../components/profileHeader";
import MenuItem from '../../components/menuItem';
import AvatarModal from '../../components/avatarModal';
import ShareModal from '../../components/shareModal';
import PrivacyModal from '../../components/privacyModal';

import { useUser  } from '../../contexts/UserContext';

// Composant Modal générique
const CustomModal = ({ visible, onClose, title, children }) => (
  <Modal
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#476560" />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProfileScreen = () => {
  const router = useRouter();
  const { userData } = useUser ();
  const { username, balance, avatars } = userData;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const menuItems = [
    { 
      id: 1, 
      title: 'Aparans', 
      icon: 'person-outline',
      onPress: () => setModalVisible(true)
    },
    { 
      id: 2, 
      title: 'Kont', 
      icon: 'lock-closed-outline', 
      onPress: () => setAccountModalVisible(true)
    },
    { 
      id: 3, 
      title: 'Envite yon zanmi', 
      icon: 'people-outline', 
      onPress: () => setShareModalVisible(true)
    },
    { 
      id: 4, 
      title: 'Politik Konfidansyalite', 
      icon: 'shield-outline', 
      onPress: () => setPrivacyModalVisible(true)
    },
  ];

  const privacyRules = [
    "1. Nou pa pataje enfòmasyon pèsonèl ou ak lòt moun.",
    "2. Nou pwoteje done w yo selon estanda sekirite ki pi wo yo.",
    "3. Ou gen kontwòl total sou kont ou.",
    "4. Ou ka siprime kont ou nenpòt ki lè.",
    "5. Nou pa vann enfòmasyon pèsonèl ou bay okenn twazyèm pati."
  ];

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Telechaje aplikasyon nou an! Link: [Mete lyen aplikasyon w lan la]',
        title: 'Pataje aplikasyon an'
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangePassword = () => {
    console.log('Changing password:', oldPassword, newPassword);
    setChangePasswordModalVisible(false);
    setOldPassword('');
    setNewPassword('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirection vers l'écran de connexion après la déconnexion
      router.replace('/sign-in');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account with password:', deletePassword);
    setDeleteAccountModalVisible(false);
    setDeletePassword('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <ProfileHeader/>
          {/* <ProfileHeader 
            username={username} 
            balance={balance}            
            avatars={avatars}
            selectedAvatar={userData.selectedAvatar}  
          /> */}

          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.id}
                icon={item.icon}
                title={item.title}
                onPress={item.onPress}
              />
            ))}
          </View>

          {/* Existing Modals */}
          <AvatarModal 
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            avatars={avatars}
            selectedAvatar={selectedAvatar}
            onSelectAvatar={setSelectedAvatar}
          />

          <ShareModal 
            visible={shareModalVisible}
            onClose={() => setShareModalVisible(false)}
            onShare={onShare}
          />

          <PrivacyModal 
            visible={privacyModalVisible}
            onClose={() => setPrivacyModalVisible(false)}
            rules={privacyRules}
          />

          {/* New Modals */}
          <CustomModal 
            visible={accountModalVisible} 
            onClose={() => setAccountModalVisible(false)} 
            title="Kont"
          >
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  setAccountModalVisible(false);
                  setChangePasswordModalVisible(true);
                }}
              >
                <Text style={styles.modalButtonText}>Chanje Paswod</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  setAccountModalVisible(false);
                  setLogoutModalVisible(true);
                }}
              >
                <Text style={styles.modalButtonText}>Dekonekte</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  setAccountModalVisible(false);
                  setDeleteAccountModalVisible(true);
                }}
              >
                <Text style={styles.modalButtonText}>Efase kont mwen an</Text>
              </TouchableOpacity>
            </View>
          </CustomModal>

          <CustomModal 
            visible={changePasswordModalVisible} 
            onClose={() => setChangePasswordModalVisible(false)} 
            title="Chanje paswod"
          >
            <TextInput
              style={styles.modalInput}
              placeholder="ansyen paswod"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="nouvo paswod"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={() => setChangePasswordModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Anile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={handleChangePassword}
              >
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </CustomModal>

          <CustomModal 
            visible={logoutModalVisible} 
            onClose={() => setLogoutModalVisible(false)} 
            title="Dekonekte"
          >
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Anile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </CustomModal>

          <CustomModal 
            visible={deleteAccountModalVisible} 
            onClose={() => setDeleteAccountModalVisible(false)} 
            title="Efase kont mwen an"
          >
            <Text style={styles.modalDescription}>
              Kont ou an ap efase avek tout done ou yo. Si ou si ke ou vle fe sa, antre paswod ou a pou kont ou an ka efase.
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="paswod"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={() => setDeleteAccountModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Anile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonHalf}
                onPress={handleDeleteAccount}
              >
                                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </CustomModal>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#ECEBED',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#476560',
    marginBottom: 20,
  },
  modalDescription: {
    color: '#476560',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtonContainer: {
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#66B22E',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButtonHalf: {
    backgroundColor: '#66B22E',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#476560',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProfileScreen;




