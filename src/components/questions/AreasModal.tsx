import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Modal,
  View,
} from 'react-native';
import ListItem from '../UI/ListItem';
import Button from '../UI/Button';
import { COLORS } from '../../utils/constants';

export interface AreaItem {
  id: string;
  name: string;
}

interface IProps {
  areas: AreaItem[];
  visible: boolean;
  selectedAreas: AreaItem[];
  setShowAreasModal: (show: boolean) => void;
  handleSelectArea: (name: string) => void;
  handleClearAreas: () => void;
}

const AreasModal = ({
  areas,
  visible,
  selectedAreas,
  setShowAreasModal,
  handleSelectArea,
  handleClearAreas,
}: IProps) => {
  const checkIfSelected = (item: AreaItem): boolean => {
    for (const area of selectedAreas) {
      if (area.name === item.name) {
        return true;
      }
    }
    return false;
  };

  const renderItem: ListRenderItem<AreaItem> = ({ item }) => {
    return (
      <ListItem
        text={item.name}
        onPress={() => {
          handleSelectArea(item.name);
        }}
        selected={checkIfSelected(item)}
      />
    );
  };

  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Escolha as áreas das questões:</Text>
        </View>

        <View style={styles.mainSection}>
          <FlatList
            data={areas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedAreas}
          />
        </View>

        <View style={styles.buttons}>
          <Button text='Limpar' onPress={handleClearAreas} />
          <Button text='Salvar' onPress={() => setShowAreasModal(false)} />
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
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: COLORS.white,
    fontSize: 20,
  },
  mainSection: {
    flex: 5,
    width: '75%',
  },
  listItem: {
    backgroundColor: '#00f',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default AreasModal;
