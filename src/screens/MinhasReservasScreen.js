import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../axios/axios'; // Utilizando o arquivo de API
import { useNavigation } from '@react-navigation/native';

const MinhasReservasScreen = () => {
  const [reservas, setReservas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    carregarReservas();
  }, []);

  const carregarReservas = async () => {
    try {
      const token = await api.getItem('token');
      const response = await api.getAllReservas(); 
      setReservas(response.data.reservas); 
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  };

  const excluirReserva = async (id) => {
    try {
      const token = await api.getItem('token');
      await api.deleteReserva(id); 
      Alert.alert('Sucesso', 'Reserva excluída!');
      carregarReservas(); 
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
    }
  };

  const confirmarExclusao = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta reserva?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirReserva(id), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Icon name="book" size={24} color="#FF0000" style={{ marginRight: 8 }} />
          <Text style={styles.headerText}>Minhas Reservas</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {reservas.map((reserva) => (
            <View key={reserva.id_reserva} style={styles.card}> {/* Altere para usar id_reserva como chave */}
              <Text style={styles.salaText}>{reserva.sala}</Text>
              <Text style={styles.label}>Data: {reserva.datahora_inicio}</Text> {/* Ajuste para mostrar a data correta */}
              <Text style={styles.label}>Horário: {reserva.datahora_inicio} - {reserva.datahora_fim}</Text> {/* Ajuste para exibir horário completo */}
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => navigation.navigate('EditarReserva', { reserva })}>
                  <Icon name="pencil" size={18} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmarExclusao(reserva.id_reserva)}>
                  <Icon name="times" size={20} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MinhasReservasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  salaText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 15,
  },
  icon: {
    color: '#000',
  },
});
