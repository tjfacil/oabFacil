import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import QuestionModel from '../models/Question';
import { COLORS } from '../utils/constants';
import ListItem from './ListItem';

interface IProps {
  question: QuestionModel;
  nextQuestion: () => void;
}

const Question = ({ question, nextQuestion }: IProps) => {
  const [choice, setChoice] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    checkAnswer();
    setChoice('');
    setSubmitted(false);
  }, [question]);

  const checkAnswer = () => {
    for (const option of question.options) {
      if (option.correct === true) {
        setAnswer(option.letter);
        return;
      }
    }
  };

  const handleChoice = (letter: string) => {
    if (!submitted) {
      setChoice(letter);
    }
  };

  const getBackgroundColor = (optionLetter: string): string => {
    if (optionLetter !== choice && optionLetter !== answer) {
      return COLORS.grey;
    }
    const isCorrect = choice === answer;
    if (optionLetter === choice && isCorrect) {
      return COLORS.success;
    }
    if (optionLetter === choice && !isCorrect) {
      return COLORS.error;
    }
    if (optionLetter === answer && !isCorrect) {
      return COLORS.accent;
    }
    return COLORS.grey;
  };

  return (
    <View>
      <Text>Área: {question.areas.join(' ')}</Text>
      <Text>Prova: {question.filename.replace('.txt', '')}</Text>
      <Text>Questão: {question.number}</Text>
      <Text>{question.enum}:</Text>
      {question.options.map((option) => (
        <ListItem
          key={option.letter}
          text={`${option.letter}) ${option.text}`}
          onPress={() => handleChoice(option.letter)}
          selected={option.letter === choice}
          backgroundColor={
            submitted ? getBackgroundColor(option.letter) : undefined
          }
        />
      ))}

      <View>
        <Button title='Conferir' onPress={() => setSubmitted(true)} />
        <Button title='Próxima' onPress={() => nextQuestion()} />
      </View>
    </View>
  );
};

export default Question;
