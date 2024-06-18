/* eslint-disable prettier/prettier */
import axios from 'axios';

// Configuración de Axios

  const baseURL= 'http://192.168.1.19:3000/';  // Reemplaza con la URL base de tu API
 

// Función para obtener todos los libros
export const getBooks = async () => {
  try {
    const response=await axios.get(baseURL+'libros')
        console.log(response);
        return response;
  } catch (error) {
    console.error('Pailaaaa:', error);
    throw error;
  }
};

// Función para obtener un libro por ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(baseURL+`libros/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

// Función para crear un nuevo libro
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(baseURL+'libros', bookData,{headers: {'Content-Type': 'application/json'}});
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

//Función para actualizar un libro
export const updateBook = async (id, bookData) => {
  try {
    console.log(id+' updated', bookData);
    const response = await axios.put(baseURL+`libros/${id}`, bookData,{headers: {'Content-Type': 'application/json'}});
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

// // Función para eliminar un libro
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(baseURL+`libros/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};