// src/components/user/userAPI.js

import * as apiClient from "../../helpers/ApiHelpers";

export const checkPasswordOnServerAsync = async (password) => {
  try {
    const response = await apiClient.postHelper('api/authorization/login', { Password: password });
    return { data: response };
  } catch (error) {
    console.error('Error in checkPasswordOnServerAsync:', error);
    throw error;
  }
};

export const logOutUserAsync = async () => {
  try {
    const response = await apiClient.postHelper('api/authorization/logout');
    console.log("logOutUserAsync response: ", response);
    return { data: response.text };
  } catch (error) {
    console.error('Error in logOutUserAsync:', error);
    throw error;
  }
};
