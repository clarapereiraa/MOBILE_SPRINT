import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import api from "../axios/axios";
import { Ionicons } from "@expo/vector-icons"; // Importe o Ionicons

export default function Cadastro({ navigation }) {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    password: "",
    name: "",
    data_nascimento: "",
    showPassword: false,
  });

  async function handleCadastro() {
    await api
      .postCadastro(user)
      .then((response) => {
        console.log(response.data.message);
        Alert.alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro", error.response.data.error);
      });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../img/logosenai.png")} style={styles.logo} />
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        placeholder="CPF"
        value={user.cpf}
        onChangeText={(value) => setUser({ ...user, cpf: value })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="E-mail"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        style={styles.input}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={user.password}
          onChangeText={(value) => setUser({ ...user, password: value })}
          style={styles.passwordInput}
          secureTextEntry={user.showPassword} // Usa o estado showPassword
        />
        <TouchableOpacity
          onPress={() => setUser({ ...user, showPassword: !user.showPassword })}
        >
          <Ionicons
            name={user.showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Nome"
        value={user.name}
        onChangeText={(value) => setUser({ ...user, name: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Nascimento (DD-MM-AAAA)"
        value={user.data_nascimento}
        onChangeText={(value) =>
          setUser({ ...user, data_nascimento: value })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "30%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    color: "black",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
});