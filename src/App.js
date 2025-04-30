import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import MinhasReservasScreen from './screens/MinhasReservasScreen';
import SalasScreen from './screens/SalasScreen';
import BlocoAScreen from './screens/BlocoAScreen';
import BlocoBScreen from './screens/BlocoBScreen';
import BlocoCScreen from './screens/BlocoCScreen';
import BlocoDScreen from './screens/BlocoDScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Minhas Reservas" component={MinhasReservasScreen} />
        <Stack.Screen name="Salas" component={SalasScreen} />
        <Stack.Screen name="Bloco A" component={BlocoAScreen} />
        <Stack.Screen name="Bloco B" component={BlocoBScreen} />
        <Stack.Screen name="Bloco C" component={BlocoCScreen} />
        <Stack.Screen name="Bloco D" component={BlocoDScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
