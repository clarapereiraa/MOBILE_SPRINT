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

export default function CadastroEvento({ navigation }) {
  const [evento, setEvento] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_organizador: "",
  });

  async function handleevento() {
    try {
      const response = await api.postEvento(evento);
      console.log(response.data.message);
      Alert.alert("OK", response.data.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", error.response.data.error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Evento</Text>
      <TextInput
        placeholder="Nome do Evento"
        value={evento.nome}
        onChangeText={(value) => setEvento({ ...evento, nome: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={evento.descricao}
        onChangeText={(value) => setEvento({ ...evento, descricao: value })}
        style={styles.input}
      />
       <TextInput
        placeholder="Data e Hora"
        value={evento.data_hora}
        onChangeText={(value) => {
          setEvento({ ...evento, data_hora: value });
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="Local"
        value={evento.local}
        onChangeText={(value) => setEvento({ ...evento, local: value })}
        style={styles.input}
      />
      <TextInput
        placeholder="ID do Organizador"
        value={evento.fk_id_organizador}
        onChangeText={(value) => setEvento({ ...evento, fk_id_organizador: value })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleevento} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Evento</Text>
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
  