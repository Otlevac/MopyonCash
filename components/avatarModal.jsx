
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



import { useUser } from '../contexts/UserContext';

const AvatarModal = ({ visible, onClose, avatars, selectedAvatar }) => {
  const { updateAvatar } = useUser(); // Utilisez le hook useUser pour obtenir updateAvatar

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Avata</Text>
        </View>
        
        <FlatList
          data={avatars}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.avatarOption,
                selectedAvatar === item.id && styles.selectedAvatarOption
              ]}
              onPress={() => {
                updateAvatar(item.id); // Utilisez updateAvatar du contexte
                onClose();
              }}
            >
              <View style={styles.avatarImageContainer}>
                {item.avatar === 'default' ? (
                  <Ionicons name="person" size={40} color="#245154" />
                ) : (
                  <Image source={item.avatar} style={styles.avatarImage} />
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.avatarGrid}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default AvatarModal;



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    backgroundColor: '#245154',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    padding: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  avatarGrid: {
    padding: 10,
  },
  avatarOption: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 10,
  },
  selectedAvatarOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  avatarImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  avatarImage: {
    width: '80%',
    height: '80%',
    borderRadius: 40,
  },

});