import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Questions from './src/screens/Questions';
import Practice from './src/screens/Practice';
import Stats from './src/screens/Stats';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: COLORS.primary },
            headerStyle: { backgroundColor: COLORS.grey },
          }}
        >
          <Tab.Screen
            name='Questions'
            component={Questions}
            options={{ title: 'Questões' }}
          />
          <Tab.Screen
            name='Practice'
            component={Practice}
            options={{ title: 'Simulado' }}
          />
          <Tab.Screen
            name='Stats'
            component={Stats}
            options={{ title: 'Estatísticas' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
