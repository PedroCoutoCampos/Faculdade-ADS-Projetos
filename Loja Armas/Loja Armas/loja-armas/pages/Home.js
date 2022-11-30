import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Touchable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ArmaDados from '../components/ArmaDados';
import { GlobalContext } from '../context';
import Input from '../components/Input';

const Home = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [dadosFilter, setDadosFilter] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const { dados } = React.useContext(GlobalContext);
 
  React.useEffect(() => {
    fetch(`http://localhost:3000/armas`)
      .then((r) => r.json())
      .then((r) => setData(r));
  }, []);

  const handleSelectMarket = (id) => {
    navigation.navigate('Armas', { id_arma: id });
  };
  const dataAtt = data.filter((data) => data.nome.includes(dadosFilter));
  const usuarioLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textUsuario} onPress={usuarioLogout}>
        <Text style={styles.textName}>Bem vindo, {dados[0]?.nome}</Text>
        <Text style={styles.textUsuario}>Quando quiser sair, Clique aqui</Text>
      </TouchableOpacity>
      <Modal
        visible={modal}
        animationType="slide"
        transparent={true}
        style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <Input
            text="Pesquisar por nome"
            value={dadosFilter}
            onChangeText={(text) => setDadosFilter(text)}
          />
          <Button color="red" title="Voltar" onPress={() => setModal(false)} />
        </View>
      </Modal>
      <ScrollView>
        <Text style={styles.textTitile}>Lista de Armas</Text>
        {dadosFilter && (
          <View style={styles.filter}>
            <Text>Filtrando por: {dadosFilter}</Text>
            <Button
              color="red"
              title="Limpar pesquisa"
              onPress={() => setDadosFilter('')}
            />
          </View>
        )}
        {dataAtt &&
          dataAtt.map((d) => (
            <ArmaDados
              data={d}
              key={d.id}
              handleSelectMarket={handleSelectMarket}
            />
          ))}
        <Button
          color="red"
          title="Pesquisar por nome"
          onPress={() => setModal(true)}
        />
      </ScrollView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FF6666",
    height: "100%"
  },
  textName: {
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  textTitile: {
    fontSize: 25,
    alignSelf: 'center',
    paddingBottom: 25,
    paddingTop: 25,
  },
  modalContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFCCCC',
    width: '80%',
    padding: 20,
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
});
