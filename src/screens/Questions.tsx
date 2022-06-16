import { useEffect, useState } from 'react';
import { StyleSheet, Button, FlatList, Text, View } from 'react-native';
import Areas, { AreaItem } from './Areas';

import questionsData from '../../data/oabpt.json';
import QuestionModel from '../models/Question';
import Question from '../components/Question';

const Questions = () => {
  const [selectedAreas, setSelectedAreas] = useState<AreaItem[]>([]);
  const [showAreasModal, setShowAreasModal] = useState<boolean>(false);
  const [liveQuestion, setLiveQuestion] = useState<QuestionModel | undefined>(
    undefined
  );

  useEffect(() => {
    const questions = questionsData as QuestionModel[];
    const question = questions[Math.floor(Math.random() * questions.length)];
    setLiveQuestion(question);
  }, []);

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
        {liveQuestion !== undefined && <Question question={liveQuestion} />}
      </View>

      <Areas
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
