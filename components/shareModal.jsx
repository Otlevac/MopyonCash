import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';


// Composant pour le modal de partage
const ShareModal = ({ visible, onClose, onShare }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Pataje aplikasyon an ak zanmi w yo!</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            onShare();
            onClose();
          }}
        >
          <Text style={styles.textStyle}>Pataje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.textStyle}>Fèmen</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ShareModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: '#245154',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#66B22E',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});