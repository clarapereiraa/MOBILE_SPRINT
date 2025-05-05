import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SalasScreen({navigation, route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o bloco</Text>

        {/* Botão "Bloco A" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Bloco A', {user})}>
        <Text style={styles.buttonText}>A</Text>
      </TouchableOpacity>

      {/* Botão "Bloco B" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Bloco B', {user})}>
        <Text style={styles.buttonText}>B</Text>
      </TouchableOpacity>

      {/* Botão "Bloco C" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Bloco C', {user})}>
        <Text style={styles.buttonText}>C</Text>
      </TouchableOpacity>

      {/* Botão "Bloco D" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Bloco D', {user})}>
        <Text style={styles.buttonText}>D</Text>
      </TouchableOpacity>

    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: 0,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D32F2F", // Cor vermelha
    padding: 45,
    borderRadius: 10,
    marginVertical: 20,
    width: 250,
    height: 150, 
    maxWidth: 300,
    justifyContent: "center", // Centralizando os itens no botão
  },
});
