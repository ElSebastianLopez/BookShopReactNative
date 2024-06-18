/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getPedidos } from '../API/PedidosAPI';
import PedidosSVG from '../IconosSVG/PediosSVG';
import CustomText from '../Components/CustomText';

const Pedidos = ({ route }) => {
  //PROPIEDADES
  const headers = ['Orden', 'Cantidad det', 'Total', 'Acciones'];
  const { userId } = route.params;
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  //SE CARGA AL INICIAR EL COMPONENETE
  useEffect(() => {
    fetchOrders();
  }, []);
  //METODO PARA CARGAR LOS USUAURIOS
  const fetchOrders = async () => {
    try {
      const usersData = await getPedidos(userId);
      setOrders(usersData.data.Data);
      console.log('zhzhzhhzhz', usersData.data.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false); // Asegúrate de detener la carga en caso de error también
    }
  };
  //ME LLEVA  A LAS LINEAS DE UNA ORDEN  X
  const handleOrderClick = (orderId) => {
    navigation.navigate('PedidosDet', { orderId });
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
          data={orders}
          renderItem={({ item }) => (
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>
                <CustomText dateString={item.FechaPedido} />
              </Text>
              <Text style={styles.rowText}>{item.CantidadDetallesPedido}</Text>
              <Text style={styles.rowText}>${item.TotalPedido}</Text>
              <Text style={styles.rowText}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => handleOrderClick(item.PedidoID)}
                >
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
    alignSelf: 'center',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tableContainer: {
    margin: 10,
  },
});

export default Pedidos;
