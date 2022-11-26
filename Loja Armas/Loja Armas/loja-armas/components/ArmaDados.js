import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ArmaDados = ({ data, handleSelectMarket }) => {
  return (
    <TouchableOpacity onPress={() => handleSelectMarket(data.id)}>
      <View style={styles.itemLista}>
        <Text style={styles.textItem}>Nome: {data.nome}</Text>
        <Text style={styles.textItem}>Modelo: {data.modelo}</Text>
        <Text style={styles.textItem}>Calibre: {data.calibre}</Text>
        <View style={styles.boxCardFoto}>
          <Image
            source={{ uri: data.foto }}
            style={{ width: 64, height: 64}}
          />{' '}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArmaDados;

const styles = StyleSheet.create({
  boxCardFoto: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemLista: {
    backgroundColor: '#FFCCCC',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  textItem: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
    padding: 2,
  },
});
