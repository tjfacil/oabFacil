import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface IProps {
  nome: string;
  onPress: (nome: string) => void;
  selected: boolean;
}

const ListItem = (props: IProps) => {
  const backgroundColor = props.selected ? '#55f' : '#999';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={() => props.onPress(props.nome)}
    >
      <Text>{props.nome}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  selected: {
    backgroundColor: '#55f',
  },
});

export default ListItem;
