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
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "../components/DateTimePicker";

export default function BlocoDScreen({ route }) {
  const { user } = route.params;
  const [salasD, setSalasD] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salaSelecionada, setSalaSelecionada] = useState({});
  const [novaReserva, setNovaReserva] = useState({
    fk_id_usuario: "",
    fk_id_sala: "",
    datahora_inicio: "",
    datahora_fim: "",
  });

  async function criarReserva() {
    console.log({
      fk_id_usuario: user.id_usuario,
      fk_id_sala: salaSelecionada.id_sala,
      datahora_inicio: novaReserva.datahora_inicio,
      datahora_fim: novaReserva.datahora_fim,
    });
    try {
      const response = await api.createReserva({
        fk_id_usuario: user.id_usuario,
        fk_id_sala: salaSelecionada.id_sala,
        datahora_inicio: novaReserva.datahora_inicio,
        datahora_fim: novaReserva.datahora_fim,
      });
      abrirModalComReserva(salaSelecionada);
      Alert.alert("Sucesso", response.data.message);

      setNovaReserva({
        fk_id_usuario: "",
        fk_id_sala: "",
        datahora_inicio: "",
        datahora_fim: "",
      });
    } catch (error) {
      Alert.alert("Erro", error.response.data.error);
    }
  }

  useEffect(() => {
    getAllSalasD();
  }, []);

  async function getAllSalasD() {
    try {
      const response = await api.getAllSalasD();
      setSalasD(response.data.salas);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error || "Erro ao buscar salas");
    }
  }

  async function abrirModalComReserva(sala) {
    setSalaSelecionada(sala);
    setNovaReserva((prev) => ({
      ...prev,
      fk_id_sala: sala.id_sala,
    }));
    setReservas([]);
    try {
      const response = await api.getAllReserva();
      const reservasSalaSelecionada = [];
      response.data.reservas.forEach((reservaFiltro) => {
        // FILTRAR AS RESERVAS DENTRE AS QUAIS SÃO SOMENTE DA SALA SELECIONADA
        if (reservaFiltro.fk_id_sala === sala.id_sala) {
          reservasSalaSelecionada.push(reservaFiltro);
          console.log(reservaFiltro);
        }
      });
      setReservas(reservasSalaSelecionada);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>D</Text>
      <MaterialIcons
        style={styles.title}
        name="calendar-today"
        size={50}
        color="#fff"
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={salasD}
          keyExtractor={(item) => item.classificacao}
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
        onRequestClose={() => {
          setModalVisible(false);
          setReservas([]); // Limpa as reservas
        }}
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
              keyExtractor={(item) => item.id_reserva}
              renderItem={({ item }) => (
                <View style={styles.reservaItem}>
                  <Text>{item.nome}</Text>
                  <Text>
                    {new Date(item.datahora_inicio).toLocaleString("pt-BR")}
                  </Text>
                  <Text>
                    {new Date(item.datahora_fim).toLocaleString("pt-BR")}
                  </Text>
                </View>
              )}
            />
          )}

          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            Criar nova reserva
          </Text>

          <DateTimePicker
            type="datetime"
            buttonTitle={
              novaReserva.datahora_inicio
                ? `Início: ${new Date(
                    novaReserva.datahora_inicio
                  ).toLocaleString("pt-BR")}`
                : "Selecionar Início"
            }
            dateKey="datahora_inicio"
            setValue={setNovaReserva}
          />
          <DateTimePicker
            type="datetime"
            buttonTitle={
              novaReserva.datahora_fim
                ? `Fim: ${new Date(novaReserva.datahora_fim).toLocaleString(
                    "pt-BR"
                  )}`
                : "Selecionar Fim"
            }
            dateKey="datahora_fim"
            setValue={setNovaReserva}
          />
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => criarReserva()}
          >
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
    flexDirection: "row",
    padding: 20,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "flex-start",
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
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
  },
});
