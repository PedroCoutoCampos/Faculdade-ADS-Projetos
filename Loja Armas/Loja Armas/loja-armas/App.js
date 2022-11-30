import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Context from './context';
import CadastroOpiniao from './pages/CadastroOpiniao';
import Home from './pages/Home';
import Login from './pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Armas" component={CadastroOpiniao} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
