/* eslint-disable react/no-unknown-property */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getBooks } from '../API/BooksApi';
import { createBook } from '../API/BooksApi';
import { getBookById } from '../API/BooksApi';
import { updateBook } from '../API/BooksApi';
import { deleteBook } from '../API/BooksApi';
import SvgEdit2 from '../IconosSVG/EditSVG';
import DeleteSVG from '../IconosSVG/DeleteSVG';
import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

export default function BooksComponent() {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newBook, setNewBook] = useState({
    BookId: 0,
    Titulo: '',
    Autor: '',
    FechaPublicacion: '',
    Precio: '',
  });
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      const booksWithImages = await Promise.all(
        booksData.data.Data.map(async (book) => {
          const imageUrl = await fetchBookCoverUrl(book.Titulo, book.Autor);
          return { ...book, imageUrl };
        }),
      );
      setBooks(booksWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false); // Asegúrate de detener la carga en caso de error también
    }
  };

  const handleAddBook = async () => {
    console.log('object al crear', newBook);
    const booksData = await createBook(newBook);
    console.log('Al crear ', booksData);
    setModalVisible(false);
    setNewBook({
      BookId: 0,
      Titulo: '',
      Autor: '',
      FechaPublicacion: '',
      Precio: '',
      imageUrl: '',
    });
    fetchBooks();
  };

  const getbookByid = async (id) => {
    const booksData = await getBookById(id);
    console.log('GetById', booksData);
    setNewBook({
      BookId: booksData.Data.LibroID,
      Titulo: booksData.Data.Titulo,
      Autor: booksData.Data.Autor,
      FechaPublicacion: booksData.Data.FechaPublicacion,
      Precio: booksData.Data.Precio,
    });
  };

  const editopen = async (id) => {
    console.log('idSeleccionado', id);
    getbookByid(id);
    setModalVisible(true);
    setIsEditing(true); //
  };
  const handleEditBook = async () => {
    console.log('Antes Editar ', newBook);
    const booksData = await updateBook(newBook.BookId, newBook);
    console.log('Al Editar ', booksData);
    setModalVisible(false);
    setNewBook({
      BookId: 0,
      Titulo: '',
      Autor: '',
      FechaPublicacion: '',
      Precio: '',
      imageUrl: '',
    });
    fetchBooks();
  };
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);

      fetchBooks(); // Refresh the list of books
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar Libro',
      '¿Estás seguro de que quieres eliminar este libro?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDeleteBook(id),
        },
      ],
      { cancelable: false },
    );
  };
  const openModalForNewBook = () => {
    setModalVisible(true);
    console.log('Entro a limpiarrrr');
    setIsEditing(false);
    setNewBook({
      BookId: 0,
      Titulo: '',
      Autor: '',
      FechaPublicacion: '',
      Precio: '',
      imageUrl: '',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Button
        title="Ver Usuarios"
        onPress={() => navigation.navigate('Details')}
      />
      <Text style={styles.header}>Lista de libros</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => openModalForNewBook()}
      >
        <Text style={styles.textStyle}>Crear libros</Text>
      </TouchableOpacity>
      <FlatList
        data={books}
        keyExtractor={(item) => item.LibroID.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.imageContainer}>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.bookImage}
                />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bookTitle}>{item.Titulo}</Text>
              <Text style={styles.bookAuthor}>Autor: {item.Autor}</Text>
              <Text style={styles.bookAuthor}>
                Fecha de Publicación: {item.FechaPublicacion}
              </Text>
              <Text style={styles.bookAuthor}>Precio: ${item.Precio}</Text>
              <View style={styles.acciones}>
                <View>
                  <TouchableOpacity onPress={() => editopen(item.LibroID)}>
                    <SvgEdit2 width={20} height={20} stroke="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => confirmDelete(item.LibroID)}>
                    <DeleteSVG width={20} height={20} stroke="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Agregar Nuevo Libro</Text>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={newBook.Titulo}
              onChangeText={(text) => setNewBook({ ...newBook, Titulo: text })}
              keyboardType="text"
            />
            <TextInput
              placeholder="Autor"
              style={styles.input}
              value={newBook.Autor}
              onChangeText={(text) => setNewBook({ ...newBook, Autor: text })}
              keyboardType="text"
            />
            <TextInput
              placeholder="Fecha de Publicación"
              style={styles.input}
              value={newBook.FechaPublicacion}
              onChangeText={(text) =>
                setNewBook({ ...newBook, FechaPublicacion: text })
              }
              keyboardType="text"
            />
            <TextInput
              placeholder="Precio"
              style={styles.input}
              value={newBook.Precio}
              onChangeText={(text) => setNewBook({ ...newBook, Precio: text })}
              keyboardType="text"
            />
            <Button
              title={isEditing ? 'Editar' : 'Agregar'}
              onPress={isEditing ? handleEditBook : handleAddBook}
            />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const fetchBookCoverUrl = async (title, author) => {
  try {
    console.log('parametrosimagen', title + ' ' + author);

    const response = await fetch(
      `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(title)}&author_name=${encodeURIComponent(author)}`,
    );
    const data = await response.json();
    if (data.url != null) {
      return data.url;
    } else {
      const response =
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1500191671l/61663._SY475_.jpg';
      return response;
    }
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
};

const styles = StyleSheet.create({
  acciones: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    // eslint-disable-next-line react-native/sort-styles
    marginVertical: 20,
  },
  // eslint-disable-next-line react-native/sort-styles
  bookItem: {
    alignItems: 'center', // Alinea los elementos verticalmente
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
    justifyContent: 'center',
    padding: 10,
  },
  buttonOpen: {
    alignContent: 'right',
    backgroundColor: '#F194FF',
    marginLeft: 'auto', // Mueve el botón a la derecha
    width: 100,
  },
  imageContainer: {
    marginRight: 10, // Espacio entre la imagen y el texto
  },
  bookImage: {
    height: 90,
    resizeMode: 'cover',
    width: 70,
  },
  textContainer: {
    flexShrink: 1, // Permite que el contenedor de texto se reduzca para evitar desbordamiento
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: 'grey',
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  modalButton: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
