import React, { useEffect, useState } from "react";
import api from "../axios/axios";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";

export default function BlocoDScreen({ navigation }) {
  const [salasA, setSalasA] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salaSelecionada, setSalaSelecionada] = useState({});
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    id_usuario: "", // Substitua por um valor real se tiver login
    nome: "Usuário Exemplo"
  });
  const [novaReserva, setNovaReserva] = useState({
    fk_id_usuario: "",
    fk_id_sala: "",
    datahora_inicio: "",
    datahora_fim: ""
  });

  async function criarReserva() {
    try {
      const response = await api.createReserva({
        fk_id_usuario: usuarioSelecionado.id_usuario,
        fk_id_sala: salaSelecionada.id_sala,
        datahora_inicio: novaReserva.datahora_inicio,
        datahora_fim: novaReserva.datahora_fim
      });

      Alert.alert("Reserva criada com sucesso!");

      const responseAtualizado = await api.getReservasPorSala(salaSelecionada.id_sala);
      setReservas(responseAtualizado.data.reserva);

      setNovaReserva({
        fk_id_usuario: "",
        fk_id_sala: "",
        datahora_inicio: "",
        datahora_fim: ""
      });
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }

  useEffect(() => {
    getAllSalasA();
  }, []);

  async function getAllSalasA() {
    try {
      const response = await api.getAllSalasA();
      setSalasA(response.data.salas);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error || "Erro ao buscar salas");
    }
  }

  async function abrirModalComReserva(sala) {
    setSalaSelecionada(sala);
    setModalVisible(true);
    try {
      const response = await api.getReservasPorSala(sala.id_sala);
      setReservas(response.data.reserva);
    } catch (error) {
      Alert.alert("Erro ao buscar reservas");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salas Disponíveis</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={salasA}
          keyExtractor={(item, index) => item.classificacao || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.salaCard}
              onPress={() => abrirModalComReserva(item)}
            >
              <Text style={styles.salaName}>{item.classificacao}</Text>
              <Text>{item.bloco}</Text>
              <Text>{item.horarios_disponiveis}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Reservas para: {salaSelecionada.classificacao || "Sala"}
          </Text>

          {reservas.length === 0 ? (
            <Text>Nenhuma reserva encontrada</Text>
          ) : (
            <FlatList
              data={reservas}
              keyExtractor={(item, index) =>
                item.id_sala.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <View style={styles.reservaItem}>
                  <Text>{item.nome_usuario}</Text>
                  <Text>{new Date(item.data_reserva).toLocaleString("pt-BR")}</Text>
                </View>
              )}
            />
          )}

          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            Criar nova reserva
          </Text>
          <TextInput
            placeholder="Data/Hora Início (AAAA-MM-DD HH:mm:ss)"
            style={styles.input}
            value={novaReserva.datahora_inicio}
            onChangeText={(text) =>
              setNovaReserva({ ...novaReserva, datahora_inicio: text })
            }
          />
          <TextInput
            placeholder="Data/Hora Fim (AAAA-MM-DD HH:mm:ss)"
            style={styles.input}
            value={novaReserva.datahora_fim}
            onChangeText={(text) =>
              setNovaReserva({ ...novaReserva, datahora_fim: text })
            }
          />
          <TouchableOpacity style={styles.reserveButton} onPress={criarReserva}>
            <Text style={{ color: "white" }}>Reservar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  salaCard: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderRadius: 8,
  },
  salaName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  reservaItem: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  reserveButton: {
    marginTop: 15,
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
});
