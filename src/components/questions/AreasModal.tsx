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
  handleClearAreas
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
        <Text style={styles.section}>Escolha as áreas das questões:</Text>
        <SafeAreaView style={styles.mainSection}>
          <FlatList
            data={areas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedAreas}
          />
        </SafeAreaView>

        <View style={styles.section}>
          <Button text='Salvar' onPress={() => setShowAreasModal(false)} />
          <Button text='Limpar' onPress={handleClearAreas} />
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
