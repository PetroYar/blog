import axios from "axios";
// const API_URL = "https://new-cet-server.vercel.app/api";
const API_URL = "http://localhost:5000/api";
export const getData = async (params, token, queryParams = {}) => {
  try {
    const response = await axios.get(API_URL + params, {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (params, body) => {
  const token = localStorage.getItem("token") ?? "";
  try {
    const response = await axios.post(API_URL + params, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const updateData = async (params, body) => {
  const token = localStorage.getItem("token") ?? "";
  try {
    const response = await axios.put(API_URL + params, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Сервер відповів з помилкою
      console.error("Server Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // Запит був зроблений, але немає відповіді
      console.error("No response received:", error.request);
    } else {
      // Інші помилки
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export const deleteData = async (params) => {
  const token = localStorage.getItem("token") ?? "";
  try {
    const response = await axios.delete(API_URL + params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
