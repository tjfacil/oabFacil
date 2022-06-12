import { StyleSheet, Text, View } from 'react-native';

const Bar = () => {
  return (
    <View style={styles.container}>
      <Text>Bem vindo ao OAB Fácil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});


export default Bar;
