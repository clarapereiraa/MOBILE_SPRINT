import React, { useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import api from "../axios/axios";

export default function CadastroIngresso({ navigation }) {
  const [ingresso, setIngresso] = useState({
    preco: "",
    tipo: "",
    fk_id_evento: "",
  });

  async function handleCadastro() {
    await api.postIngresso(ingresso)
      .then((response) => {
        console.log(response.data.message);
        Alert.alert(response.data.message);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro", error.response.data.error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Ingresso</Text>
      <TextInput
        placeholder="Preço"
        value={ingresso.preco}
        onChangeText={(value) => setIngresso({ ...ingresso, preco: value })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Tipo"
        value={ingresso.tipo}
        onChangeText={(value) => setIngresso({ ...ingresso, tipo: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="ID do Evento"
        value={ingresso.fk_id_evento}
        onChangeText={(value) => setIngresso({ ...ingresso, fk_id_evento: value })}
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
    backgroundColor: "#492CFF",
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
