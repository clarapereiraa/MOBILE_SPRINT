import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../axios/axios";
import EditarPerfil from "../components/EditarPerfil";
import * as SecureStore from "expo-secure-store";

export default function PerfilScreen({ route, navigation }) {
  const { user: userFromParams } = route.params || {};
  const [user, setUser] = useState(userFromParams || {});
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontWeight: "bold" }}>
          Erro: dados do usuário não recebidos.
        </Text>
      </View>
    );
  }

  // Função de logout
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const excluirUsuario = async (id) => {
    try {
      await api.deleteUser(id);
      await SecureStore.deleteItemAsync("token");
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log(
        "Erro ao excluir usuário:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  const confirmarExclusao = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir sua conta? Essa ação não poderá ser desfeita.",
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
      {/* Ícone home */}
      <TouchableOpacity
        style={styles.homeIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="home" size={28} color="black" />
      </TouchableOpacity>

      {/* Ícone logout no topo direito */}
      <TouchableOpacity style={styles.logoutIcon} onPress={logout}>
        <Icon name="sign-out" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.logoSENAI}>SENAI</Text>

      <Icon name="user" size={50} color="black" />
      <Text style={styles.titulo}>Meu perfil</Text>

      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Nome Completo:</Text>
            <Text style={styles.valor}>{user.nome}</Text>

            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.valor}>{user.email}</Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.valor}>{user.cpf}</Text>

        <View style={styles.linhaSenha}>
          <View>
            <Text style={styles.label}>Senha:</Text>
            <Text style={styles.valor}>***********</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconExcluir}
          onPress={() => confirmarExclusao(user.id_usuario)}
        >
          <Icon name="times" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <EditarPerfil
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />
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
  logoutIcon: {
    position: "absolute",
    top: 20,
    right: 20,
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
  iconExcluir: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  textoExcluir: {
    color: "white",
    fontWeight: "bold",
  },
});
