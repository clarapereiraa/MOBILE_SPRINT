import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import api from "../axios/axios";

export default function CadastroScreen() {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    password: "",
    name: "",
    data_nascimento: "",
  });

  async function handleCadastro() {
    await api.postCadastro(user).then(
        (response)=>{
            console.log(response.data.message)
            Alert.alert(response.data.message)
        },
        (error)=>{
            console.log(error)
            Alert.alert('Erro',error.response.data.error)
        }
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        placeholder="CPF"
        value={user.cpf}
        onChangeText={(value) => setUser({ ...user, cpf: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome"
        value={user.name}
        onChangeText={(value) => setUser({ ...user, name: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Nascimento (DD-MM-AAAA)"
        value={user.data_nascimento}
        onChangeText={(value) => setUser({ ...user, data_nascimento: value })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
