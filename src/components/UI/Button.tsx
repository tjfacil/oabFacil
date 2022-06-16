import {
  Pressable,
  StyleSheet,
  StyleProp,
  Text,
  ViewProps,
} from 'react-native';

interface IProps {
  text: string;
  onPress: () => void;
  styles?: StyleProp<ViewProps>;
}

const Button = ({ text, onPress, styles }: IProps) => {
  return (
    <Pressable style={styles || buttonStyles.button} onPress={() => onPress()}>
      <Text>{text}</Text>
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 16,
    marginBottom: 8
  },
});

export default Button;
