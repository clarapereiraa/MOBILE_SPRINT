import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MinhasReservasScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <Text>Aqui você verá suas reservas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
