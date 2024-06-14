import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList, Image } from 'react-native';

interface Cat {
  id: string;
  url: string;
}

export default function App() {
  const [busca, setBusca] = useState('');
  const [imagens, setImagens] = useState<Cat[]>([]);

  const buscarGatos = () => {
    const busca2 = busca === '' ? 5 : parseInt(busca, 10);

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${busca2}`, {
      method: 'GET',
      headers: { 'x-api-key': 'live_NlMToAhRoePKfi8lz88338uu7cKIV7MyYoZC4Qraf1ZSmCmmvSWk6V9falQT347f' },
    })
      .then((response) => response.json())
      .then((data: Cat[]) => {
        console.log('Dados retornados:', data);
        setImagens(data);
        setBusca('');
      })
      .catch((error) => {
        console.error('Erro ao buscar gatos:', error);
      });
  };

  const removerFotos = () => {
    setImagens([]);
    setBusca('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Insira a quantidade de gatos:"
          value={busca}
          onChangeText={setBusca}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={buscarGatos}
        >
          <Text style={styles.buttonText}>Buscar gatos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={removerFotos}
        >
          <Text style={styles.buttonText}>Remover gatos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.imageList}
        contentContainerStyle={styles.imageListContainer}
        data={imagens.slice(0, 10)}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  input: {
    width: '80%',
    maxWidth: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4,
  },
  button: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageList: {
    width: '100%',
  },
  imageListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
});
