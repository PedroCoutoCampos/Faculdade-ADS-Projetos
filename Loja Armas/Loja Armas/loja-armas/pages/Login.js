import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import Input from '../components/Input';
import { GlobalContext } from '../context';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const { setDados } = React.useContext(GlobalContext);

  const handleValidateLogin = async () => {
    const response = await fetch(`http://localhost:3000/user?email=${email}`);
    const data = await response.json();

    if (data && data[0]?.password === password) {
      setDados(data);
      navigation.navigate('Home');
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Usuário ou Senha Inválidos');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitile}>Login</Text>
      <View style={styles.boxInputAll}>
        <Input
          text="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          text="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {error && <Text style={styles.textError}>{error}</Text>}
      </View>
      <Button
        disabled={!email || !password}
        title="Entrar"
        color="red"
        onPress={handleValidateLogin}
        accessibilityLabel="Botao de entrar"
      />
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FF6666',
    height: '100%',
  },
  textTitile: {
    marginTop: 40,

    fontSize: 25,
    alignSelf: 'center',
    paddingBottom: 25,
  },
  boxInputAll: {
    padding: 20,
    backgroundColor: '#FF6666',
    borderRadius: 10,
    marginBottom: 20,
  },
  textError: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
  },
});
