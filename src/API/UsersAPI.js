/* eslint-disable prettier/prettier */
import axios from 'axios';

// Configuración de Axios

const baseURL = 'http://192.168.1.19:3000/'; // Reemplaza con la URL base de tu API

// Función para obtener todos los libros
export const getUsers = async () => {
  try {
    const response = await axios.get(baseURL + 'usuarios');
    return response;
  } catch (error) {
    console.error('Pailaaaa:', error);
    throw error;
  }
};
