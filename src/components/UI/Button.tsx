import {
  Pressable,
  StyleSheet,
  StyleProp,
  Text,
  ViewProps,
} from 'react-native';
import { COLORS } from '../../utils/constants';

interface IProps {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: IProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed
          ? { backgroundColor: COLORS.accent }
          : { backgroundColor: COLORS.grey },
        buttonStyles.button,
      ]}
      onPress={onPress}
    >
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 60,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    opacity: 0.5,
  },
});

export default Button;
