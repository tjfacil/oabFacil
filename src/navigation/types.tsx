import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type QuestionsStackParamList = {
  Questions: undefined;
  Areas: undefined;
};

export type Props = NativeStackScreenProps<QuestionsStackParamList, 'Questions'>;