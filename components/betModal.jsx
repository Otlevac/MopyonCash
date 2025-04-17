import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';



const betAmounts = [
  { id: 1, amount: 50 }, { id: 2, amount: 100 }, { id: 3, amount: 150 },
  { id: 4, amount: 200 }, { id: 5, amount: 250 }, { id: 6, amount: 300 },
  { id: 7, amount: 350 }, { id: 8, amount: 400 }, { id: 9, amount: 450 },
  { id: 10, amount: 500 }, { id: 11, amount: 550 }, { id: 12, amount: 600 },
  { id: 13, amount: 650 }, { id: 14, amount: 700 }, { id: 15, amount: 750 },
  { id: 16, amount: 800 }, { id: 17, amount: 850 }, { id: 18, amount: 900 },
  { id: 19, amount: 950 }, { id: 20, amount: 1000 },
];

const BetModal = ({ visible, onClose, onSelectBet }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>PARYAJ</Text>
          
          <View style={styles.betContainer}>
            {betAmounts.map((bet) => (
              <BetButton 
                key={bet.id} 
                amount={bet.amount} 
                onPress={() => onSelectBet(bet.amount)} 
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Anile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </Modal>
);

const BetButton = ({ amount, onPress }) => (
  <TouchableOpacity style={styles.betButton} onPress={onPress}>
    <Text style={styles.betText}>{amount} Gdes</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#245154',
  },
  betContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  betButton: {
    width: '45%',
    backgroundColor: '#245154',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  betText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
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

export default BetModal;




