import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Header from '../components/Header.js'

function Listar({ navigation, route }) {
    return (
        <SafeAreaView>
        <Header></Header>
            <Text style={styles.tituloDetalhes}>Detalhes do Seguro</Text>
            <View>

                <View style={styles.textValores}>

                    <Text style={styles.valores}>-  Nome do Cliente: {route.params?.nome}.</Text>
                    <Text style={styles.valores}>-  Valor do Veiculo: R$ {route.params?.valor}.</Text>
                    <Text style={styles.valores}>-  Renovação: {route.params?.renovacao? "Sim ": "Não"}.</Text>
                    <Text style={styles.valores}>-  {route.params?.mensagem}.</Text>
                </View>
                <View style={styles.buttons}>
                    
                    <TouchableOpacity
                        style={styles.button} onPress={() => navigation.goBack()}>
                        <Text
                            style={styles.buttonText}>Voltar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    
    tituloDetalhes: {
        fontSize: 30,
        marginTop: 60,
        textAlign: 'center'
    },
    textValores: {
        padding: 30
    },
    valores:{
        display: 'flex',
        padding: 10,
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    button: {
        backgroundColor: '#101010',
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 40,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
    },
})
export default Listar;