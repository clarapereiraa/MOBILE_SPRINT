import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.93:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postCadastro: (user) => api.post("user/", user),
  postLogin: (user) => api.post("login/", user),
  postOrganizador: (organizador) => api.post("org/", organizador),
  postEvento: (evento) => api.post("evento/", evento),
  postIngresso: (ingresso) => api.post("ingresso/", ingresso)
  
};

export default sheets