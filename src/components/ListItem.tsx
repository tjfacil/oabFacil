import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

interface IProps {
  text: string;
  onPress: (arg: string) => void;
  selected: boolean;
  backgroundColor?: string;
}

const ListItem = ({ text, onPress, selected, backgroundColor }: IProps) => {
  if (!backgroundColor) {
    backgroundColor = selected ? COLORS.accent : COLORS.grey;
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={() => onPress(text)}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default ListItem;
