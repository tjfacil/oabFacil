import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
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
    <View style={[styles.container, { backgroundColor }]}>
      <Pressable style={styles.press} onPress={() => onPress(text)}>
        <QuestionText text={text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
  press: {
    flex: 1,
    width: '100%',
    padding: 16,

  },
});

export default ListItem;
