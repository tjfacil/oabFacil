import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StartPracticeModal from '../components/practice/StartPracticeModal';
import QuestionModel from '../models/Question';
import questionsData from '../../data/oab.json';
import questionsIndex from '../../data/index.json';
import Index from '../models/Index';
import { shuffle } from '../utils/lib';
import Question from '../components/questions/Question';

const Practice = () => {
  const [showStartModal, setShowStartModal] = useState<boolean>(true);
  const [allQuestions, setAllQuestions] = useState<QuestionModel[]>([]);
  const [questionsIndexes, setQuestionsIndexes] = useState<number[]>([]);
  const [liveIndex, setLiveIndex] = useState<number>(0);
  const [liveQuestion, setLiveQuestion] = useState<QuestionModel | undefined>(
    undefined
  );

  useEffect(() => {
    setShowStartModal(true);
    const questions = questionsData as QuestionModel[];
    setAllQuestions(questions);
  }, []);

  useEffect(() => {
    setShowStartModal(questionsIndexes.length === 0);
    handleNextQuestion();
  }, [questionsIndexes]);

  const handleStartPractice = () => {
    const index = questionsIndex as Index;
    const selectedQuestions = [];
    for (const areaQuestions of Object.values(index)) {
      shuffle(areaQuestions);
      const selected = areaQuestions.slice(0, 4);
      selectedQuestions.push(...selected);
    }
    setQuestionsIndexes(selectedQuestions);
  };

  const handleNextQuestion = () => {
    setLiveQuestion(allQuestions[liveIndex]);
    setLiveIndex(liveIndex + 1);
  };

  return (
    <View style={styles.container}>
      {liveQuestion && (
        <Question question={liveQuestion} nextQuestion={handleNextQuestion} />
      )}

      <StartPracticeModal
        visible={showStartModal}
        setShowModal={handleStartPractice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Practice;
