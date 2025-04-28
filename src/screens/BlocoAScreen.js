import React from "react";
import {  useEffect ,useState } from "react";
import api from "../axios/axios"
import { 
  View, 
  Text, 
  Modal,
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

export default function BlocoAScreen({navigation}){
    const [salasA,setSalasA] = useState([]);
    const [reservas,setReservas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [salaSelecionada, setSalaSelecionada] = useState('');

    useEffect(()=>{
        getAllSalasA();
    }, []);

    async function getAllSalasA(){
        try{
            const response = await api.getAllSalasA();
            console.log(response.data);
            setSalasA(response.data.salas);
        } catch(error){
            console.log(error.response.data.error)
        }
    }
    async function abrirModalComReserva(sala) {
        setSalaSelecionada(sala);
        setModalVisible(true);
        setLoading(false);
        try{
            const response = await api.getReservasPorSala(reserva.id_sala)
            setReservas(response.data.reserva);
          } catch (error) {
            console.log("Error ao buscar reservas", error.response);
          }
      }
  
      return(
          <View style={styles.container}>
              <Text style={styles.title}>Salas Disponíveis</Text>
              {loading  ? <ActivityIndicator size="large"color="blue"/> : <FlatList 
              data={salasA}
              keyExtractor={(item)=> item.id_sala.toString()}
              renderItem={({item})=>(
                  <TouchableOpacity
                  style={styles.salaCard}
                  onPress={()=> abrirModalComReserva(item)}
                  >
                      <Text style={styles.salaName}>{item.classificacao}</Text>
                      <Text>{item.horarios_disponiveis}</Text>
                      <Text>{new Date (item.horarios_disponiveis).toLocaleString()}</Text>
                  </TouchableOpacity>
              )}
              />}
              <Modal
              visible={modalVisible}
              onRequestClose={()=> setModalVisible(false)}
              animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <Text>
                    ingressos para: {salaSelecionada.nome}
                  </Text>
                 {reservas.length === 0 ? (
                  <Text> Nenhuma reserva encontrada </Text>
                 ): (
                  <FlatList
                  data={reservas}
                  keyExtractor={(item)=>item.id_reserva.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.reservaItem}>
                      <Text>{item.nome_usuario}</Text>
                      <Text>{new Date(item.data_reserva).toLocaleString()}</Text>
                    </View>
                  )}
                  />
                 )}
                 <TouchableOpacity style={styles.closeButton}
                 onPress={()=>setModalVisible(false)}
                 >
                  <Text style={{color:"white"}}>Fechar</Text>
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
      closeButton: {
        marginTop: 20,
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
        borderRadius: 6,
      },
    });


