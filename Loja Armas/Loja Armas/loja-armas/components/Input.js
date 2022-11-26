import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = ({ text, value, onChangeText, ...props }) => {
  return (
    <View style={styles.boxInput}>
      <Text style={styles.textInput}>{text}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  boxInput: {
    marginBottom: 10,
  },
  textInput: {
    fontSize: 18,
    paddingBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 5,
    backgroundColor: '#EEE',
    borderRadius: 5,
  },
});
