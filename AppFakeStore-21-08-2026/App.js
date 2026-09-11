import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,Image } from 'react-native';

export default function App() {

  const [dados, setDados] = useState([])

  async function carregaProdutos() {
    try {
      let resposta = await fetch("https://fakestoreapi.com/products/");
      if (resposta.status == 200) {
        let novosDados = await resposta.json();
        setDados(novosDados);
      }
      else {
        throw Exception("Falha no carregamento de dados")
      }
    }
    catch (e) {
      console.log(e)
      throw Exception("Falha no carregamento de dados")
    }
  }

  useEffect(() => {
    carregaProdutos()
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
     
      <FlatList
      style={{width:'100%', flex}}
      data={dados}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item}) =>(
          <View style={styles.container} >
          <Image source={{uri:item.image}} style={{width:50, height:50}} />
          <Text>{item.price}</Text>
          <Text>{item.title}</Text>
       </View> 
      )}
      ></FlatList>
      <StatusBar style="auto" />
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

  card: {
    flexDirection: 'column',
    color:'#fff',
    elevation: 8,
    padding:16,
    width:'100%'
  }


});
