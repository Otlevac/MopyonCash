import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native';



//RulesModal component
const RulesModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>RÈG JWÈT LA</Text>
        
        <View style={styles.rulesContainer}>
          <RuleItem 
            number="1" 
            text="Jwè a sipoze alinye 5 pyon pou genyen."
          />
          <RuleItem 
            number="2" 
            text="Chak jwè dispoze de 45 segond pou chak kou."
          />
          <RuleItem 
            number="3" 
            text="Si 45 segond nan ekoule epi jwè a pa gentan jwe, lap pèdi pati a."
          />
          <RuleItem 
            number="4" 
            text="Venkè an ap ranpote miz total la mwens 10% frè."
          />
        </View>

        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>FERMER</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );


  const RuleItem = ({ number, text }) => (
    <View style={styles.ruleItem}>
      <View style={styles.ruleNumber}>
        <Text style={styles.ruleNumberText}>{number}</Text>
      </View>
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );

export default RulesModal;



const styles = StyleSheet.create({

  rulesButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#245154',
    marginBottom: 20,
  },
  rulesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ruleNumber: {
    backgroundColor: '#245154',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ruleNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ruleText: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#66B22E',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
