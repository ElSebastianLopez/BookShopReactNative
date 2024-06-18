/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDetPedidos } from '../API/PedidosAPI';
import { createDetPedido } from '../API/PedidosAPI';
import { getBooks } from '../API/BooksApi';

const PedidosDetComponents = ({ route }) => {
  //PROPIEDADES
  const { orderId } = route.params;
  const [ordersDet, setDetOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState('');
  //SE CARGA AL INICIAR EL COMPONENETE
  useEffect(() => {
    fetchDetOrders();
    fillSelectedBook();
  }, []);
  //METODO PARA CARGAR LOS USUAURIOS
  const fetchDetOrders = async () => {
    try {
      const orderDetData = await getDetPedidos(orderId);
      setDetOrders(orderDetData.data.Data);
      console.log('zhzhzhhzhz', orderDetData.data.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false); // Asegúrate de detener la carga en caso de error también
    }
  };

  const handleCreateDetail = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSaveDetail = async () => {
    // Aquí puedes enviar los datos del nuevo detalle a tu API o hacer lo que necesites
    console.log('Book:', selectedBook);
    console.log('Quantity:', quantity);
    let detpedido={
        pedidoId:orderId,
        libroId:selectedBook,
        cantidad:quantity
    }
    const detOrderData = await createDetPedido(detpedido);
    console.log('Al crear detPedido ', detOrderData);
    // Limpia los campos después de guardar
    setSelectedBook(null);
    setQuantity('');
    setModalVisible(false);
    fetchDetOrders();
  };

  const fillSelectedBook = async () => {
    try {
      const booksData = await getBooks(); // Suponiendo que getBooks es el método que llama a la API para obtener todos los libros
      if (booksData.data.Succes) {
        // Si la llamada a la API es exitosa
        const allBooks = booksData.data.Data;
        setBooks(allBooks);
      } else {
        // Si hay algún error en la llamada a la API, puedes manejarlo aquí
        console.error('Error fetching books:', booksData.Message);
      }
    } catch (error) {
      // Si hay algún error en la solicitud, puedes manejarlo aquí
      console.error('Error fetching books:', error);
    }
  };

  //SE DA CUENTA SI ESTA HACIENDO UNA PETICION Y APAREECE UN LOADING
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Crear Detalle" onPress={handleCreateDetail} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedBook}
              onValueChange={(itemValue) => setSelectedBook(itemValue)}
            >
              <Picker.Item label="Seleccione un libro" value={null} />
              {books.map((book) => (
                <Picker.Item
                  key={book.LibroID}
                  label={book.Titulo}
                  value={book.LibroID}
                />
              ))}
            </Picker>
            <TextInput
              placeholder="Cantidad"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSaveDetail} />
            <Button title="Cancelar" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
      {ordersDet.map((detalle, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{detalle.Titulo}</Text>
          <Text>Autor: {detalle.Autor}</Text>
          <Text>Cantidad: {detalle.Cantidad}</Text>
          <Text>Precio unitario: ${detalle.PrecioLibro}</Text>
          <Text>Total: ${detalle.Precio}</Text>
          <Text>
            Fecha del Pedido:{' '}
            {new Date(detalle.FechaPedido).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  // eslint-disable-next-line react-native/sort-styles
  card: {
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PedidosDetComponents;
