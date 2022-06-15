import { Button, Text, View } from 'react-native';
import { Props } from '../navigation/types';

const Questions = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Questões de Provas Anteriores</Text>
      <Button
        title='Escolher áreas'
        onPress={() => navigation.navigate('Areas')}
      />
    </View>
  );
};

export default Questions;
