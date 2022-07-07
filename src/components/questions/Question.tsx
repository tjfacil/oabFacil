import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionModel from '../../models/Question';
import { COLORS } from '../../utils/constants';
import QuestionText from '../UI/QuestionText';
import Button from '../UI/Button';
import Option from '../../models/Option';

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
    if (submitted) {
      const isCorrect = choice === answer;
      if (optionLetter === choice) {
        return isCorrect ? COLORS.success : COLORS.error;
      }
      if (optionLetter === answer && !isCorrect) {
        return COLORS.accent;
      }
      return COLORS.grey;
    } else {
      return optionLetter === choice ? COLORS.accent : COLORS.grey;
    }
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

  const questionOption = (option: Option): JSX.Element => {
    const letter = option.letter;
    const text = `${option.letter}) ${option.text}`;
    const backgroundColor = getBackgroundColor(letter);

    return (
      <View style={styles.optionContainer} key={letter}>
        <ScrollView
          onTouchEnd={() => handleChoice(letter)}
          style={[styles.scroll, { backgroundColor }]}
        >
          <View style={styles.optionText}>
            <QuestionText text={text} />
          </View>
        </ScrollView>
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
        {question.options.map((option) => questionOption(option))}
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
    paddingHorizontal: 8,
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
    marginBottom: 16,
  },
  optionsContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
  },
  optionContainer: {
    flex: 1,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  scroll: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    padding: 8,
  },
  optionText: {
    paddingBottom: 16,
    marginBottom: 16,
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
