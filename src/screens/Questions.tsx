import { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import AreasModal, { AreaItem } from '../components/AreasModal';
import QuestionModel from '../models/Question';
import Question from '../components/Question';
import { getRandomIntInRange } from '../utils/lib';
import questionsData from '../../data/oab.json';

const Questions = () => {
  const [selectedAreas, setSelectedAreas] = useState<AreaItem[]>([]);
  const [showAreasModal, setShowAreasModal] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionModel[]>([]);
  const [liveQuestion, setLiveQuestion] = useState<QuestionModel | undefined>(
    undefined
  );

  useEffect(() => {
    let questions = questionsData as QuestionModel[];
    if (selectedAreas.length > 0) {
      questions = filterSelectedAreas(questions);
    }
    setAllQuestions(questions);
  }, [selectedAreas]);

  useEffect(() => {
    handleNextQuestion();
  }, [allQuestions])

  const filterSelectedAreas = (questions: QuestionModel[]): QuestionModel[] => {
    return questions.filter((question) => {
      for (const selectedArea of selectedAreas) {
        for (const questionArea of question.areas) {
          if (selectedArea.name === questionArea) {
            return true;
          }
        }
      }
      return false;
    });
  };

  const handleSelectArea = (name: string) => {
    let selected = [...selectedAreas];
    let shouldAdd = true;
    selected.forEach((area) => {
      if (area.name === name) {
        shouldAdd = false;
      }
    });
    if (shouldAdd) {
      selected.push({ id: name, name: name });
    } else {
      selected = selected.filter((selectedArea) => selectedArea.name !== name);
    }
    setSelectedAreas(selected);
  };

  const handleNextQuestion = () => {
    const index = getRandomIntInRange(allQuestions.length);
    const question = allQuestions[index];
    setLiveQuestion(question);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.section}>
          {selectedAreas.map((area) => area.name).join(' - ')}
        </Text>
        <Button
          title='Escolher áreas'
          onPress={() => setShowAreasModal(true)}
        />
      </View>
      <View style={styles.main}>
        {liveQuestion !== undefined && (
          <Question question={liveQuestion} nextQuestion={handleNextQuestion} />
        )}
      </View>
      <AreasModal
        visible={showAreasModal}
        selectedAreas={selectedAreas}
        handleSelectArea={handleSelectArea}
        setShowAreasModal={setShowAreasModal}
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
  section: {
    flex: 1,
    width: '100%',
  },
  main: {
    flex: 6,
  },
});

export default Questions;
