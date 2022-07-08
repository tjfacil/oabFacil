import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AreasModal, { AreaItem } from '../components/questions/AreasModal';
import QuestionModel from '../models/Question';
import Question from '../components/questions/Question';
import { getRandomIntInRange } from '../utils/lib';
import areasData from '../../data/areas.json';
import questionsData from '../../data/oab.json';
import { COLORS } from '../utils/constants';
import Button from '../components/UI/Button';

const Questions = () => {
  const [allAreas, setAllAreas] = useState<AreaItem[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<AreaItem[]>([]);
  const [showAreasModal, setShowAreasModal] = useState<boolean>(false);
  const [allQuestions, setAllQuestions] = useState<QuestionModel[]>([]);
  const [liveQuestion, setLiveQuestion] = useState<QuestionModel | undefined>(
    undefined
  );

  useEffect(() => {
    const areasList: AreaItem[] = [];
    (areasData as string[]).forEach((area) => {
      areasList.push({ id: area, name: area });
    });
    setAllAreas(areasList);
  }, []);

  useEffect(() => {
    let questions = questionsData as QuestionModel[];
    if (selectedAreas.length > 0) {
      questions = filterSelectedAreas(questions);
    }
    setAllQuestions(questions);
  }, [selectedAreas]);

  useEffect(() => {
    handleNextQuestion();
  }, [allQuestions]);

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

  const handleClearAreas = () => {
    setSelectedAreas([]);
  };

  const handleNextQuestion = () => {
    const index = getRandomIntInRange(allQuestions.length);
    const question = allQuestions[index];
    setLiveQuestion(question);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button text='Escolher áreas' onPress={() => setShowAreasModal(true)} />
      </View>

      <View style={styles.main}>
        {liveQuestion !== undefined && (
          <Question
            question={liveQuestion}
            practice={false}
            nextQuestion={handleNextQuestion}
          />
        )}
      </View>

      <AreasModal
        areas={allAreas}
        visible={showAreasModal}
        selectedAreas={selectedAreas}
        setShowAreasModal={setShowAreasModal}
        handleSelectArea={handleSelectArea}
        handleClearAreas={handleClearAreas}
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
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 7,
    width: '100%',
  },
});

export default Questions;
