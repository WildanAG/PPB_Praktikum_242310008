import axios from "axios";

const AXIOS_REQUEST = async (config) => {
  try {
    const response = await axios(config);
    return { loading: false, message: "", data: response.data };
  } catch (error) {
    console.warn("Error in AXIOS_REQUEST:", error);

    // Handle specific error messages
    let errorMessage = "Failed to process request";

    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        errorMessage = "Invalid username or password";
      } else if (error.response.status === 400) {
        errorMessage = "Invalid request format";
      } else if (error.response.status === 404) {
        errorMessage = "Resource not found";
      } else if (error.response.status === 500) {
        errorMessage = "Internal server error";
      } else {
        errorMessage = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response from server. Check your internet connection.";
    } else {
      // Something else happened
      errorMessage = error.message || "An unexpected error occurred";
    }

    return { loading: false, message: errorMessage, data: [] };
  }
};

const AUTH_USER = async (param) => {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://fakestoreapi.com/auth/login",
      data: param,
    };

    const response = await AXIOS_REQUEST(config);
    console.log("AUTH_USER response:", response);
    return response;
  } catch (error) {
    console.warn("Error in AUTH_USER:", error);
    return {
      loading: false,
      message:
        "An unexpected error occurred during authentication. Please try again.",
      data: [],
    };
  }
};

const ADD_USER = async (param) => {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://fakestoreapi.com/users",
      data: param,
    };

    const response = await AXIOS_REQUEST(config);
    console.log("ADD_USER response:", response);
    return response;
  } catch (error) {
    console.warn("Error in ADD_USER:", error);
    return {
      loading: false,
      message:
        "An unexpected error occurred during registration. Please try again.",
      data: [],
    };
  }
};

export { ADD_USER, AUTH_USER };