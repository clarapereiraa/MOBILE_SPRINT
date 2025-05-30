import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import api from "../axios/axios";
import { Ionicons } from "@expo/vector-icons";

export default function Cadastro({ navigation }) {
  const [user, setUser] = useState({
    cpf: "",
    email: "",
    senha: "",
    nome: "",
    showPassword: true,
  });

  async function handleCadastro() {
    try {
      const response = await api.postCadastro({
        cpf: user.cpf,
        email: user.email,
        senha: user.senha,
        nome: user.nome,
      });

      Alert.alert("Sucesso", response.data.message, [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home", { user }),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        error?.response?.data?.error || "Erro ao cadastrar usuário"
      );
    }
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
          value={user.senha}
          onChangeText={(value) => setUser({ ...user, senha: value })}
          style={styles.passwordInput}
          secureTextEntry={user.showPassword}
        />
        <TouchableOpacity
          onPress={() =>
            setUser({ ...user, showPassword: !user.showPassword })
          }
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
        value={user.nome}
        onChangeText={(value) => setUser({ ...user, nome: value })}
        style={styles.input}
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
    backgroundColor: "#E8E8E8",
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
