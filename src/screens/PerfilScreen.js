import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../axios/axios";

export default function PerfilScreen({ route, navigation }) {
  const { user } = route.params || {};

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontWeight: "bold" }}>
          Erro: dados do usuário não recebidos.
        </Text>
      </View>
    );
  }

  const excluirUsuario = async (id) => {
    try {
      await api.delete(`/usuario/${id}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log(
        "Erro ao excluir usuário:",
        error.response?.data?.error || error.message
      );
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  const confirmarExclusaoUsuario = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza de que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => excluirUsuario(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="home" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.logoSENAI}>SENAI</Text>

      <Icon name="user" size={50} color="black" />
      <Text style={styles.titulo}>Meu perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome Completo:</Text>
        <Text style={styles.valor}>{user.nome}</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{user.email}</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.valor}>{user.cpf}</Text>

        <View style={styles.linhaSenha}>
          <View>
            <Text style={styles.label}>Senha:</Text>
            <Text style={styles.valor}>***********</Text>
          </View>
          <TouchableOpacity>
            <Icon name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão de excluir conta */}
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => confirmarExclusaoUsuario(user.id_usuario)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    paddingTop: 40,
  },
  homeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  logoSENAI: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  valor: {
    marginBottom: 5,
  },
  linhaSenha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  botaoExcluir: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    width: "85%",
  },
  textoBotaoExcluir: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
