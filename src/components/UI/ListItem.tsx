import { View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
import QuestionText from './QuestionText';

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
    <Pressable style={styles.press} onPress={() => onPress(text)}>
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.scroll, { backgroundColor }]}>
            <QuestionText text={text} />
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    marginBottom: 8,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
  press: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flex: 1,
    width: '100%',
    borderColor: COLORS.error,
  },
});

export default ListItem;
