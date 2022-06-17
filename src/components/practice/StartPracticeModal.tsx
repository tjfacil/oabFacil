import { Modal, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  setShowModal: () => void;
}

const StartPracticeModal = ({ visible, setShowModal }: IProps) => {
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <Text>Exame simulado</Text>
          <Text>
            O simulado é composto por 80 questões, distribuídas como um exame
            unificado da OAB.
          </Text>
          <Text>O tempo máximo para conclusão do simulado é de 5 horas.</Text>
          <Text>
            Ao fim do simulado, o resultado é apresentado no geral e detalhado
            por áreas.
          </Text>
          <Text>
            Toque em iniciar para começar. Seu tempo começará a contar.
          </Text>
        </View>
        <View style={styles.bottom}>
          <Button text='Iniciar' onPress={() => setShowModal()} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 2,
  },
});

export default StartPracticeModal;
