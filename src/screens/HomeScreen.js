import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image 
} from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Logo do SENAI */}
      <Image source={require("../img/logosenai.png")} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo(a)</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 50,
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
});