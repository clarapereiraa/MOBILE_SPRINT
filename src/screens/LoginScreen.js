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
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

async function saveToken(token) {
  await SecureStore.setItemAsync('token',token);
  console.log("token: ", token);
}

export default function Login({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    senha: "",
    showPassword: true,
  });

  async function handleLogin() {
    await api.postLogin(user).then(
      (response) => {
        Alert.alert("OK", response.data.message);
        saveToken(response.data.token);
      
        navigation.navigate("Home", { user: response.data.user });
      },
      (error) => {
        console.log(error);
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../img/logosenai.png")} style={styles.logo} />
      <Text style={styles.title}>Faça Login</Text>
      <TextInput
        placeholder="E-mail"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={user.senha}
          onChangeText={(value) => setUser({ ...user, senha: value })}
          secureTextEntry={user.showPassword}
          style={styles.passwordInput}
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não tem cadastro? Cadastre-se</Text>
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
  registerText: {
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