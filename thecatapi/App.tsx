import React, { useState } from 'react';
import { StyleSheet, 
          View, 
          TextInput, 
          Text, 
          Pressable, 
          FlatList, 
          Image } from 'react-native';

interface Cat {
  id: string;
  url: string;
}

export default function App() {
  const [busca, SetBusca] = useState('');
  //const [imagensAntigas, setImagensAntigas] = useState<Cat[]>([]);
  const [imagens, setImagens] = useState<Cat[]>([]);

  const buscarGatos = () => {
    const busca2 = busca === '' ? 5 : busca;

    fetch(`https://api.thecatapi.com/v1/images/search?limit=${busca2}`, {
      method: 'GET',
      headers: { 'x-api-key': 'live_NlMToAhRoePKfi8lz88338uu7cKIV7MyYoZC4Qraf1ZSmCmmvSWk6V9falQT347f' },
    })
      .then((response) => response.json())
      .then((data: Cat[]) => {
        setImagens(data);
        //setImagensAntigas(imagensAnteriores)
        SetBusca("");
      })
      
      .catch((error) => {
        console.error(error);
      });
  };

  const RemoverFotos = () => {
    setImagens([]); 
    SetBusca("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Insira a quantidade de gatos:"
        value={busca}
        onChangeText={SetBusca}
      />
      <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.95 }] },
          ]}
          onPress={buscarGatos}
        >
        <Text style={styles.buttonText}>Buscar gatos</Text>
      </Pressable>

      <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.95 }] },
          ]}
          onPress={RemoverFotos}
        >
        <Text style={styles.buttonText}>Remover gatos</Text>
      </Pressable>

      <FlatList
        style={styles.imageList}
        data={imagens.slice(0, 10)}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
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
    borderRadius: 4,
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
  },


  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  imageList: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
