import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar as SBar } from 'react-native';
import Areas from './src/routes/Areas';
import Questions from './src/routes/Questions';
import Practice from './src/routes/Practice';
import Stats from './src/routes/Stats';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: COLORS.primary },
          headerStyle: { backgroundColor: COLORS.grey },
        }}
      >
        <Tab.Screen name='Areas' component={Areas} options={{title: 'Áreas'}} />
        <Tab.Screen name='Questions' component={Questions} options={{title: 'Questões'}} />
        <Tab.Screen name='Practice' component={Practice} options={{title: 'Simulado'}} />
        <Tab.Screen name='Stats' component={Stats} options={{title: 'Estatísticas'}} />
      </Tab.Navigator>
    </NavigationContainer>
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
