/* eslint-disable prettier/prettier */
import axios from 'axios';

// Configuración de Axios

  const baseURL= 'http://192.168.1.19:3000/';  // Reemplaza con la URL base de tu API
 

// Función para obtener todos los libros
export const getPedidos = async (userId) => {
  try {
    const response = await axios.get(baseURL+`pedidos/${userId}`);
        console.log(response);
        return response;
  } catch (error) {
    console.error('Pailaaaa:', error);
    throw error;
  }
};

export const getDetPedidos = async (orderId) => {
  try {
    const response = await axios.get(baseURL+`pedidos/DetPedidos/${orderId}`);
        console.log(response);
        return response;
  } catch (error) {
    console.error('Pailaaaa:', error);
    throw error;
  }
};

export const createDetPedido = async (detpedido) => {
  try {
    const response = await axios.post(baseURL+'pedidos/DetPedidos', detpedido,{headers: {'Content-Type': 'application/json'}});
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};