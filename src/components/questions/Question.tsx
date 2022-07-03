import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionModel from '../../models/Question';
import { COLORS } from '../../utils/constants';
import QuestionText from '../UI/QuestionText';
import ListItem from '../UI/ListItem';
import Button from '../UI/Button';

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

  const questionHeader = (): JSX.Element => {
    return (
      <View style={styles.questionHeader}>
        <View style={styles.questionHeaderData}>
          <QuestionText
            text={`Prova: ${question.filename.replace('.txt', '')}`}
          />
          <QuestionText text={`Questão: ${question.number}`} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {questionHeader()}
        <ScrollView style={styles.questionText}>
          <QuestionText text={`${question.enum}:`} />
        </ScrollView>
      </View>

      <View style={styles.optionsContainer}>
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
      </View>

      <View style={styles.buttonsContainer}>
        <Button text='Próxima' onPress={() => nextQuestion()} />
        <Button text='Conferir' onPress={() => setSubmitted(true)} />
      </View>
    </View>
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
  questionContainer: {
    flex: 2,
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionHeaderData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionText: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
  },
  optionsContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Question;
