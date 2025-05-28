import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilScreen({ route, navigation }) {
  const { user } = route.params || {};

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          Erro: dados do usuário não recebidos.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('AlterarSenha', { userId: user.id })}>
            <Icon name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    paddingTop: 40,
  },
  homeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logoSENAI: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    marginBottom: 5,
  },
  linhaSenha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

