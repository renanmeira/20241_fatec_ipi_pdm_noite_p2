import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
  Image
} from 'react-native';

import {
  useState
} from 'react';

interface Cat {
  id: string;
  url: string;
}

export default function App() {
  const [busca, SetBusca] = useState('')
  const [imagens, setImagens] = useState<Cat[]>([]);

  const buscarGatos = () => {
    const busca2 = busca === '' ? 5 : busca;

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${busca2}`, {
      method: 'GET',
      headers: {'x-api-key': 'live_NlMToAhRoePKfi8lz88338uu7cKIV7MyYoZC4Qraf1ZSmCmmvSWk6V9falQT347f'}
    })
      .then(response => response.json())
      .then((data: Cat[]) => {
        setImagens(data);
      })
      .catch(error => {
        console.error(error)
      })}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Buscar gatos'
        value={busca}
        onChangeText={SetBusca}
      />
      <Pressable
        style={styles.button}
        onPress={buscarGatos}>
        <Text style={styles.buttonText}>
          Buscar
        </Text >
      </Pressable>
      <FlatList
        style={styles.imageList}
        data={imagens}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
        keyExtractor={item => item.id}
      />
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
  },
  imageList: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  }

});
