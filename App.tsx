import { StatusBar } from 'expo-status-bar';
import Main from './src/screens/main/page';
import Separacao from './src/screens/separacao/page';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { rootStackParamList } from './src/types/rootStackParamList';

export default function App() {
  const Stack = createNativeStackNavigator<rootStackParamList>();

  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Separacao" component={Separacao} initialParams={{codCli: '', dtEntrada: ''}} />
      </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
