import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Questions from './src/screens/Questions';
import Practice from './src/screens/Practice';
import { COLORS } from './src/utils/constants';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.grey },
            headerTintColor: COLORS.white,
            tabBarStyle: { backgroundColor: COLORS.grey },
          }}
        >
          <Tab.Screen
            name='Questions'
            component={Questions}
            options={{
              title: 'Questões',
              tabBarIcon: ({ size, focused, color }) => {
                return <Ionicons name='book' size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name='Practice'
            component={Practice}
            options={{
              title: 'Simulado',
              tabBarIcon: ({ size, focused, color }) => {
                return <Ionicons name='clipboard' size={size} color={color} />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
