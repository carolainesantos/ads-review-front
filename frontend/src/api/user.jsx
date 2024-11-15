import api from "./api";
// export default é só pra
// quando for exportar apenas uma função

// user vaiser um bjeto = { nome , email, senha }
export const createUser = async (user) => {
  const response = await api.post("api/v1/user", user);

  console.log(response);
  return response.data;
};

export const loginUser = async (email, senha) => {
  const response = await api.post("/api/v1/login", { email, senha });

  console.log(response);

  return response.data;
};

export const getContext = async () => {
  const response = await api.get("api/v1/user/context");

  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`api/v1/user/${id}`, user);

  console.log(response);
};

export const deleteUser = async (id) => {
  return api.delete(`/api/v1user/${id}`);
};
