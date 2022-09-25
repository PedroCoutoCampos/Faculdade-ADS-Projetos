import { Text, StyleSheet, Pressable, Button } from 'react-native';
const Interesse = ({ nome, valor }) => {
    return (
        <Pressable>
            <Text style={styles.lista}>
                {nome} - {valor}
            </Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    lista: {
        fontSize: 14,
        lineHeight: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#00f',
        borderRadius: 4,
        padding: 4,
        marginTop: 2,
    },
});
export default Interesse;