import { View, Text, StyleSheet, TouchableOpacity, Modal,} from 'react-native';



// Composant pour le modal de politique de confidentialité
const PrivacyModal = ({ visible, onClose, rules }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Politik Konfidansyalite</Text>
        {rules.map((rule, index) => (
          <Text key={index} style={styles.ruleText}>{rule}</Text>
        ))}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.textStyle}>Fèmen</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default PrivacyModal;

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
  ruleText: {
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },

});