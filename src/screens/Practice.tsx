import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartPracticeModal from '../components/practice/PracticeModal';
import QuestionModel from '../models/Question';
import questionsData from '../../data/oab.json';
import questionsIndex from '../../data/index.json';
import Index from '../models/Index';
import { buildPracticeSet } from '../utils/lib';
import Question from '../components/questions/Question';
import { COLORS } from '../utils/constants';

const Practice = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [score, setScore] = useState<number | undefined>(undefined);
  const [allQuestions, setAllQuestions] = useState<QuestionModel[]>([]);
  const [questionsIndexes, setQuestionsIndexes] = useState<number[]>([]);
  const [liveIndex, setLiveIndex] = useState<number>(0);
  const [liveQuestion, setLiveQuestion] = useState<QuestionModel | undefined>(
    undefined
  );

  useEffect(() => {
    setShowModal(true);
    setAllQuestions(questionsData as QuestionModel[]);
  }, []);

  useEffect(() => {
    setShowModal(questionsIndexes.length === 0);
  }, [questionsIndexes]);

  useEffect(() => {
    const questionIndex = questionsIndexes[liveIndex];
    setLiveQuestion(allQuestions[questionIndex]);
  }, [liveIndex, questionsIndexes]);

  const handleStartPractice = () => {
    const indexes = buildPracticeSet(questionsIndex as Index);
    setQuestionsIndexes(indexes);
    setScore(0);
    setLiveIndex(0);
  };

  const handleNextQuestion = () => {
    if (liveIndex < 79) {
      setLiveIndex(liveIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  const handleScore = (correct: boolean) => {
    if (correct) {
      const _score = score || 0;
      setScore(_score + 1);
    }
  };

  return (
    <View style={styles.container}>
      {liveQuestion && (
        <Question
          question={liveQuestion}
          practice={true}
          nextQuestion={handleNextQuestion}
          setScore={handleScore}
          questionNumber={liveIndex + 1}
        />
      )}

      <StartPracticeModal
        visible={showModal}
        setShowModal={handleStartPractice}
        score={score}
      />
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
});

export default Practice;
