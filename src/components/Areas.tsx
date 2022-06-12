import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Button,
} from 'react-native';

import oabData from '../../data/oab.json';
import Questao from '../models/Questao';
import ListItem from './ListItem';

interface AreaItem {
  id: string;
  nome: string;
}

const Areas = () => {
  const [areas, setAreas] = useState<AreaItem[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    const todasAreas: string[] = [];
    (oabData as Questao[]).forEach((questao) => {
      todasAreas.push(...questao.areas);
    });
    const listaAreas: AreaItem[] = [];
    [...new Set(todasAreas)].forEach((area, index) => {
      listaAreas.push({ id: index.toString(), nome: area });
    });
    setAreas(listaAreas);
  }, []);

  const renderItem: ListRenderItem<AreaItem> = ({ item }) => {
    return (
      <ListItem
        nome={item.nome}
        onPress={handleSelectArea}
        selected={selectedAreas.includes(item.nome)}
      />
    );
  };

  const handleSelectArea = (nome: string) => {
    console.log(nome);
    let selected = [...selectedAreas];
    if (selectedAreas.includes(nome)) {
      selected = selected.filter((selectedName) => selectedName !== nome);
    } else {
      selected.push(nome);
    }
    setSelectedAreas(selected);
  };

  return (
    <View style={styles.container}>
      <Text>Escolha as áreas das questões:</Text>
      <SafeAreaView>
        <FlatList
          data={areas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedAreas}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  listItem: {
    backgroundColor: '#00f',
  },
});

export default Areas;
