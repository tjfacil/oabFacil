import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar as SBar } from 'react-native';
import Areas from './src/components/Areas';
import Bar from './src/components/Bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Bar />
      <Areas />
      <Bar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SBar.currentHeight || 0,
  },
});
