import axios from "axios";

/* criando a config do axios,
 * para o front conecctar com o back */
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// interceptors serve pra enviar o token para o backend
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // passar ele no authorization da requisição
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
