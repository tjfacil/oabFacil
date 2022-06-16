import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import ListItem from './ListItem';
import areasData from '../../data/areas.json';

export interface AreaItem {
  id: string;
  name: string;
}

interface IProps {
  visible: boolean;
  selectedAreas: AreaItem[];
  handleSelectArea: (name: string) => void;
  setShowAreasModal: (show: boolean) => void;
}

const AreasModal = ({
  visible,
  selectedAreas,
  handleSelectArea,
  setShowAreasModal,
}: IProps) => {
  const [areas, setAreas] = useState<AreaItem[]>([]);

  useEffect(() => {
    const areasList: AreaItem[] = [];
    (areasData as string[]).forEach((area) => {
      areasList.push({ id: area, name: area });
    });
    setAreas(areasList);
  }, []);

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
        <Text style={styles.section}>Escolha as áreas das questões:</Text>
        <SafeAreaView style={styles.mainSection}>
          <FlatList
            data={areas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedAreas}
          />
        </SafeAreaView>
        <Pressable
          style={styles.section}
          onPress={() => {
            setShowAreasModal(false);
          }}
        >
          <Text>Salvar</Text>
        </Pressable>
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
  listItem: {
    backgroundColor: '#00f',
  },
  mainSection: {
    flex: 4,
    width: '75%',
  },
  section: {
    flex: 1,
    marginTop: 50,
  },
});

export default AreasModal;
