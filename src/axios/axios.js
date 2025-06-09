import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://10.89.240.66:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  postCadastro: (user) => api.post("user/", user),
  postLogin: (user) => api.post("userLogin/", user),
  updateUser: (usuarioId, dados) => api.put(`/user/${usuarioId}`, dados),
  getAllSalasA: () => api.get("/blocoA/"),
  getAllSalasB: () => api.get("/blocoB/"),
  getAllSalasC: () => api.get("/blocoC/"),
  getAllSalasD: () => api.get("/blocoD/"),
  getAllReserva: () => api.get(`reserva/`),
  getReservaByUsuario: (usuarioId) => api.get(`/reserva/${usuarioId}`),
  createReserva: (reserva) => api.post("/reserva", reserva),
  deleteReserva: (reservaId) => api.delete(`/reserva/${reservaId}`),
  updateReserva: (reservaId, dados) => api.put(`/reserva/${reservaId}`, dados),
  deleteUser: (usuarioId) => api.delete(`/user/${usuarioId}`),
};

export default sheets;
