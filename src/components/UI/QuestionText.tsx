import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

interface IProps {
  text: string;
  justify?: 'justify' | 'center';
}

const QuestionText: React.FC<IProps> = ({ text, justify }) => {
  return (
    <Text style={[styles.questionText, justify ? { textAlign: justify } : {}]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  questionText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default QuestionText;
