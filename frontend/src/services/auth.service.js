import axiosInstance from "../utilities/axiosInstance";

const login = async (email, password) => {
  return await axiosInstance
    .post("login", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const signup = async (username, email, password) => {
  return await axiosInstance
    .post("signup", {
      email,
      password,
      username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = async () => {
  return await axiosInstance.get("logout").then((response) => {
    return response.data;
  });
};

const getProfile = async () => {
  return await axiosInstance.get("user").then((response) => {
    return response.data;
  }).catch((error) => {
    return error.response.data;
  });
}

export { login, signup, logout, getProfile };
