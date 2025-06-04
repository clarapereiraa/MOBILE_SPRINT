import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SalasScreen({ navigation, route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      {/* Botão Perfil */}
      <TouchableOpacity
        style={styles.perfilIcon}
        onPress={() => navigation.navigate("Perfil", { user })}
      >
        <Icon name="user-circle" size={32} color="#000" />
      </TouchableOpacity>

      {/* Botão Home */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="home" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Escolha o bloco</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bloco A', { user })}>
        <Text style={styles.buttonText}>A</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bloco B', { user })}>
        <Text style={styles.buttonText}>B</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bloco C', { user })}>
        <Text style={styles.buttonText}>C</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bloco D', { user })}>
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
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    padding: 45,
    borderRadius: 10,
    marginVertical: 20,
    width: 250,
    height: 150,
    maxWidth: 300,
    justifyContent: "center",
  },
  homeIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  perfilIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
