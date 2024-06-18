/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView,TouchableOpacity, } from 'react-native';
import { getUsers } from '../API/UsersAPI';
import { useNavigation } from '@react-navigation/native';
import PedidosSVG from '../IconosSVG/PediosSVG';


const headers = ['Nombre', 'Email', 'Acciones'];

const UsersComponents = () => {
  //PROPIEDADES 
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //SE CARGA AL INICIAR EL COMPONENETE
  useEffect(() => {
    fetchUsers();
  }, []);
  //METODO PARA CARGAR LOS USUAURIOS
  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData.data.Data);
      console.log("zhzhzhhzhz",usersData.data.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false); // Asegúrate de detener la carga en caso de error también
    }
  };

  //ME LLEVA  A LAS ORDENES DE UN USUARIO X
  const handleOrderClick = (userId) => {
    navigation.navigate('Pedidos', { userId });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.headerContainer}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.headerText}>
              {header}
            </Text>
          ))}
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{item.Nombre}</Text>
              <Text style={styles.rowText}>{item.Email}</Text>
              <Text style={styles.rowText}>
              <TouchableOpacity onPress={() => handleOrderClick(item.UsuarioID)}>
              <PedidosSVG width={20} height={20} stroke="black" />
              </TouchableOpacity>
              </Text> 
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    padding: 10,
  },

  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  rowText: {
    flex: 1,
  },
  tableContainer: {
    margin: 10,
  },
});

export default UsersComponents;
