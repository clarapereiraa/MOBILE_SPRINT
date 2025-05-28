import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function SalasScreen({ navigation, route }) {
  const { user } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="home-outline" size={28} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
    marginLeft: 0,
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
});
