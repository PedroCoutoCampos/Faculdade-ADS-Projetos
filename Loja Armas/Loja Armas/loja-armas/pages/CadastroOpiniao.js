import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import ArmaDados from '../components/ArmaDados';
import CaixaOpinioes from '../components/CaixaOpinioes';
import { GlobalContext } from '../context';

const CadastroOpiniao = ({ route, navigation }) => {
  const { id_arma } = route.params;
  const { dados } = React.useContext(GlobalContext);

  const [opiniao, setOpiniao] = React.useState('');
  const [estrelas, setEstrelas] = React.useState('');

  const [data, setData] = React.useState('');
  const [dataOpiniao, setDataOpiniao] = React.useState('');

  React.useEffect(() => {
    fetch(`http://localhost:3000/armas?id=${id_arma}`)
      .then((r) => r.json())
      .then((r) => setData(r[0]));
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:3000/opinioes_salvas?id_arma=${id_arma}`)
      .then((r) => r.json())
      .then((r) => setDataOpiniao(r));
  }, [dataOpiniao]);

  const handleAddOpiniao = () => {
    if (!estrelas || !opiniao) {
      alert('Preencha os campos');
      return;
    }
    fetch('http://localhost:3000/opinioes_salvas', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id_usuario: dados[0].id,
        id_arma: id_arma,
        opiniao: opiniao,
        estrelas: estrelas,
      }),
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
    setOpiniao('');
    setEstrelas('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textName}>Atenção, {dados[0]?.nome}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textName}>Quando quiser voltar, Clique aqui</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Text style={styles.textarma}>Arma escolhida: </Text>
          <ArmaDados data={data} />
        </View>
        <Text style={styles.textTitile}>Incluir uma opinião</Text>
        <View style={styles.boxInputAll}>
          <Input
            text="Opinião"
            value={opiniao}
            onChangeText={(text) => setOpiniao(text)}
          />
          <Input
            text="Estrelas"
            value={estrelas}
            onChangeText={(text) => setEstrelas(text)}
          />
        </View>
        <Button color="red" title="Salvar Opinião" onPress={handleAddOpiniao} />
        <Text style={styles.textarma}>Opniões anteriores:</Text>
          {dataOpiniao &&
            dataOpiniao.map((dOpiniao) => (
              <CaixaOpinioes
                
                data={dOpiniao}
                key={dOpiniao.id}
              />
            ))}
      </ScrollView>
    </View>
  );
};
export default CadastroOpiniao;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FF6666',
  },
  boxInputAll: {
    padding: 20,
    backgroundColor: '#FF6666',
    borderRadius: 10,
    marginBottom: 20,
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
  textarma: {
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 55,
  },
});
