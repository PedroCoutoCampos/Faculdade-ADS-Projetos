import * as React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    Text, Animated,
    TouchableOpacity,
    Alert,
    ScrollView,
    TextInput,
    Button,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SelectDropdown from 'react-native-select-dropdown';
import Interesse from '../components/Interesse.js'
import Header from '../components/Header.js'

function HomeScreen({ navigation }) {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [valor, setValor] = useState('')
    const [renovacao, setRenovacao] = useState(false)
    const [avaliacao, setAvaliacao] = useState([])
    const [mensagem, setMensagem] = useState('')

    const marcas = ["Toyota", "Volkswagen", "Mercedes", "Ford", "BMW", "Honda", "Nissan", "Chevrolet "]

    const dropdownRef = useRef({})

    const salvar = async (avaliacoes) => {
        try {
            const jsonValue = JSON.stringify(avaliacoes)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // error writing value
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const prods = jsonValue != null ? JSON.parse(jsonValue) : [];
            setAvaliacao(prods)
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData()
    }, [])


    
    const calcular = async () => {
        // faz o calculo
        let porcentagem = 3.9
        if (renovacao === true) {
            const renov = porcentagem = 2.5
            porcentagem = renov
        } else if (renovacao === false) {
            porcentagem = 3.9
        }

        if (nome == 0) {
            Alert.alert("Preencha o nome")
        } else if (valor == 0) {
            Alert.alert("Preencha o valor")
        } else {
            let resultado = (valor * porcentagem) / 100;
            setMensagem(`Valor Estimado foi: R$ ${resultado.toFixed(2)}`)
        }
    }
    const addAvaliacao = async () => {

        const novo = {
            nome: nome,
            valor: valor,
            marca: marca,
            renovacao: renovacao,
        }
        // faz uma nova atribuição à lista, com os elementos
        // já existentes (...lista) e o novo
        setAvaliacao([...avaliacao, novo]);
        salvar([...avaliacao, novo])
        //console.log(avaliacao);
    }

    const novo = async () => {
        setNome('');
        setValor('');
        setMarca(false);
        setRenovacao(false)
        setMensagem('');
        dropdownRef.current.reset()
    }

    return (
        <SafeAreaView>

            <Header></Header>
            <ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event([{
                    nativeEvent: {
                        contentOffset: { y: scrollY }
                    },
                }],
                    { useNativeDriver: false })}
            >
                <View style={styles.caixasTextos}>

                    <Text style={styles.titulo}>Nome do Cliente</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Nome"
                        style={styles.caixaTexto}
                    />

                    <Text style={styles.titulo}>Marca</Text>
                    <SelectDropdown
                        ref={dropdownRef}
                        buttonStyle={styles.caixaTexto}
                        data={marcas}
                        value={marca}
                        defaultButtonText={"Selecione a marca"}
                        onChangeText={setMarca}
                        placeholder="Marca"
                        onSelect={(selectedItem, index) => {
                            setMarca(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {

                            return item
                        }}
                    />

                    <Text style={styles.titulo}>Valor da Fipe em R$</Text>
                    <TextInput

                        keyboardType='numeric'
                        value={valor}
                        onChangeText={setValor}
                        placeholder="Valor R$"
                        style={styles.caixaTexto}

                    />

                    <View style={styles.renovacaoButton}>
                        <BouncyCheckbox
                            disableBuiltInState
                            title="Renovação de Seguro"
                            checkedIcon="check"
                            uncheckedIcon="square-o"
                            isChecked={renovacao}
                            onPress={() => setRenovacao(!renovacao)}
                            size={25}
                            fillColor="black"
                            innerIconStyle={{ borderWidth: 1 }}

                        />
                        <Text>Renovação de Seguro</Text>
                    </View>

                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button} onPress={calcular}>
                        <Text
                            style={styles.buttonText}>Calcular
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={novo}
                        style={styles.button}>
                        <Text
                            style={styles.buttonText}>Novo

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Listar', { nome: nome, valor: valor, renovacao: renovacao, mensagem: mensagem })
                    }
                        style={styles.button}>
                        <Text
                            style={styles.buttonText}>Listar
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textRegistrar} onPress={novo}>{mensagem}</Text>
                {mensagem && <TouchableOpacity
                    style={styles.buttonRegistrar} onPress={addAvaliacao}>
                    <Text
                        style={styles.buttonText}>Registrar Interesse
                    </Text>
                </TouchableOpacity>}


            </ScrollView>
        </SafeAreaView>
    );
}
export default HomeScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
        marginTop: 30
    },
    titulo: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    caixasTextos: {
        alignItems: 'center',
    },
    caixaTexto: {
        fontSize: 17,
        backgroundColor: '#DDD',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 40,
        width: 350,
        alignItems: 'center',
        textAlign: 'center'
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
    buttonRegistrar: {
        backgroundColor: '#101010',
        padding: 10,
        marginTop: 10,
        borderRadius: 40,
        width: 150,
        marginLeft: 130
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
    },
    renovacaoButton: {
        checkedIcon: "check",
        uncheckedIcon: "square-o",
        checkedColor: "green",
        uncheckedColor: "red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        margin: 10,
        height: 50,
    },
    buttonMarca: {
        marginLeft: 50
    },
    fundo: {
        height: "100%",
        width: "100%"

    },
    textRegistrar: {
        textAlign: "center",
        fontSize: 20,
    },


});