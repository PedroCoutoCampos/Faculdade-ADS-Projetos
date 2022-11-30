

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CaixaOpinioes = ({ data }) => {
  return (
    <TouchableOpacity>
      <View style={styles.boxCard}>
        <Text>Opinião: {data.opiniao}</Text>
        <Text>Estrelas: {data.estrelas}</Text>
        <Text>Nome do Usuario: {data.id_usuario}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CaixaOpinioes;

const styles = StyleSheet.create({
  boxCard: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#FF0000",
  },
});
