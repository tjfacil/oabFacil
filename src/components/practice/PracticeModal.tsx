import React from 'react';
import { Modal, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../utils/constants';
import Button from '../UI/Button';

interface IProps {
  visible: boolean;
  score?: number;
  setShowModal: () => void;
}

const PracticeModal = ({ visible, score, setShowModal }: IProps) => {
  const getStartTexts = (): JSX.Element => {
    return (
      <>
        <Text style={styles.text}>
          O simulado é composto por 80 questões, distribuídas como em um exame
          unificado da OAB.
        </Text>
        <Text style={styles.text}>O resultado é apresentado ao final.</Text>
      </>
    );
  };

  const getEndTexts = (): JSX.Element => {
    if (score === undefined) {
      return <></>;
    }

    const approved = score > 40;
    return (
      <>
        <Text style={[styles.text, styles.title]}>
          {approved ? 'PARABÉNS' : 'Tente outra vez.'}
        </Text>
        <Text style={styles.text}>Sua pontuação</Text>
        <Text style={styles.text}>{score} questões de 80.</Text>
      </>
    );
  };

  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, styles.title]}>Exame simulado</Text>
        <View style={styles.section}>
          {score ? getEndTexts() : getStartTexts()}
        </View>
        <View style={styles.bottom}>
          <Button text='Iniciar' onPress={setShowModal} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 32,
  },
  text: {
    color: COLORS.white,
    textAlign: 'justify',
    marginBottom: 16,
  },
  bottom: {
    flex: 2,
  },
});

export default PracticeModal;
