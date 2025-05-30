import React from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image 
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export default function Home({navigation, route}) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      {/* Logo do SENAI */}
      <Image source={require("../img/logosenai.png")} style={styles.logo} />

      {/* Botão "Minhas Reservas" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Minhas Reservas', {user})}>
        <MaterialIcons name="calendar-today" size={45} color="#fff" />
        <Text style={styles.buttonText}>Minhas Reservas</Text>
      </TouchableOpacity>

      {/* Botão "Salas" */}
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Salas', {user})}>
        <MaterialIcons name="meeting-room" size={45} color="#fff" />
        <Text style={styles.buttonText}>Salas</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:  "flex-start",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    marginTop: 40,
    resizeMode: "contain",
  },
  title: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D32F2F", 
    padding: 45,
    borderRadius: 10,
    marginVertical: 20,
    width: 200,
    height: 200, 
    maxWidth: 300,
    justifyContent: "center", 
  },
});