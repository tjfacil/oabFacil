import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Areas from './src/routes/Areas';
import Questions from './src/routes/Questions';
import Practice from './src/routes/Practice';
import Stats from './src/routes/Stats';
import { COLORS } from './src/utils/constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const QuestionsStack = createNativeStackNavigator();

const QuestionsStackScreen = () => {
  return (
    <QuestionsStack.Navigator>
      <QuestionsStack.Screen name='Questions' component={Questions} />
      <QuestionsStack.Screen name='Areas' component={Areas} />
    </QuestionsStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: COLORS.primary },
          headerStyle: { backgroundColor: COLORS.grey },
        }}
      >
        <Tab.Screen
          name='Questions'
          component={QuestionsStackScreen}
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
  );
};

export default App;
