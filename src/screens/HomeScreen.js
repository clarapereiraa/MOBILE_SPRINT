import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("CadastroEvento")}
      >
        <Text style={styles.buttonText}>Cadastro de Evento</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("CadastroOrganizador")}
      >
        <Text style={styles.buttonText}>Cadastro de Organizador</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("CadastroIngresso")}
      >
        <Text style={styles.buttonText}>Cadastro de Ingresso</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#492CFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});