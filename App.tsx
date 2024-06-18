/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BooksComponents from './src/Components/BooksComponents';
import UsersComponents from './src/Components/UsersComponents';
import PedidosComponents from './src/Components/PedidosComponents';
import PedidosDetComponents from './src/Components/PedidosDetComponents';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack = createStackNavigator();
function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (      
      <View style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BooksComponents}
            options={{ title: 'Libros' }}
          />
          <Stack.Screen
            name="Details"
            component={UsersComponents}
            options={{ title: 'Usuarios' }}
          />
          <Stack.Screen
            name="Pedidos"
            component={PedidosComponents}
            options={{ title: 'Pedidos' }}
          />
          <Stack.Screen
            name="PedidosDet"
            component={PedidosDetComponents}
            options={{ title: 'Detalles del pedido' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenido se expanda para llenar el SafeAreaView
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
