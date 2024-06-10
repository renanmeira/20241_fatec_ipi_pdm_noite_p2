import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Pressable
  } from 'react-native';

  import {
    useState
    } from 'react';

  export default function App() {
    const [busca, SetBusca] = useState('')
  return (
  <View style={styles.container}>
    <TextInput
    style={styles.input}
     placeholder='Buscar gatos'
     value={busca}
     onChangeText={SetBusca}
/>
  <Pressable
  style={styles.button}>
  <Text style={styles.buttonText}>
  Buscar
  </Text >
  </Pressable>
  </View>
    
  );
  }
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },

  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4
    },
  
  button: {
  width: '80%',
  backgroundColor: '#0096F3', //material design blue 500
  padding: 12,
  borderRadius: 4
  },

  buttonText: {
  color: 'white',
  textAlign: 'center'
  }

  });
  