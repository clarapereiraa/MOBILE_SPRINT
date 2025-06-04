import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../axios/axios";

export default function EditarReserva({ visible, onClose, reserva, onAtualizar }) {
  const [inicio, setInicio] = useState(new Date(reserva.datahora_inicio));
  const [fim, setFim] = useState(new Date(reserva.datahora_fim));
  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFimPicker, setShowFimPicker] = useState(false);

  const handleUpdate = async () => {
    try {
      const dados = {
        datahora_inicio: inicio.toISOString(),
        datahora_fim: fim.toISOString(),
      };

      const response = await api.updateReserva(reserva.id_reserva, dados);
      Alert.alert("Sucesso", response.data.message || "Reserva atualizada!");
      onAtualizar(); // recarrega reservas
      onClose(); // fecha modal
    } catch (error) {
      const msg =
        error.response?.data?.error || "Erro ao atualizar reserva.";
      Alert.alert("Erro", msg);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar Reserva</Text>

          <Text style={styles.label}>Data e Hora de Início:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowInicioPicker(true)}
          >
            <Text>{inicio.toLocaleString()}</Text>
          </TouchableOpacity>
          {showInicioPicker && (
            <DateTimePicker
              value={inicio}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                setShowInicioPicker(false);
                if (date) setInicio(date);
              }}
            />
          )}

          <Text style={styles.label}>Data e Hora de Fim:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowFimPicker(true)}
          >
            <Text>{fim.toLocaleString()}</Text>
          </TouchableOpacity>
          {showFimPicker && (
            <DateTimePicker
              value={fim}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                setShowFimPicker(false);
                if (date) setFim(date);
              }}
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#aaa" }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF0000",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
