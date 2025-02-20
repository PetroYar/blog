import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

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
    
      console.error("Server Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      
      console.error("No response received:", error.request);
    } else {
    
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
