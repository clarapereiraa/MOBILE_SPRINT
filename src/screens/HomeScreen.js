import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image 
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export default function Home() {
  const handlePressMinhasReservas = () => {
    navigation.navigate('Minhas Reservas')
  }
  return (
    <View style={styles.container}>
      {/* Logo do SENAI */}
      <Image source={require("../img/logosenai.png")} style={styles.logo} />
    
      
      {/* Bloco 1 */}
      <View style={styles.bloco}>
     <MaterialIcons name="CalendarMonthIcon" size={24} color="#fff" />
     <Text style={styles.buttonText}>Minhas Reservas</Text>
     </View>

      {/* Bloco 2 */}
      <View style={styles.bloco}>
        <MaterialIcons name="person" size={24} color="#fff" />
        <Text style={styles.buttonText}>Salas</Text>
      </View>

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
    height: 200,
    marginBottom: 20,
    marginTop: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  bloco: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    maxWidth: 300,
  },
});