import * as React from 'react';
import {
    StyleSheet,
    Image,
    Animated,

} from 'react-native';
import { useState } from 'react';

const Header = () => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));

    return (
        <Animated.View
            style={[
                styles.header,
                {
                    height: scrollY.interpolate({
                        inputRange: [10, 120, 145],
                        outputRange: [100, 10, 0],
                        extrapolate: 'clamp'
                    }),
                    opacity: scrollY.interpolate({
                        inputRange: [1, 80, 170],
                        outputRange: [1, 0.5, 0],
                        extrapolate: 'clamp'
                    })
                }
            ]}
        >
            <Image
                source={require('../assets/iconCarro.png')}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
            />
            <Animated.Image
                source={require('../assets/nomeEmpresa.png')}
                style={{
                    width: scrollY.interpolate({
                        inputRange: [0, 120],
                        outputRange: [230, 90],
                        extrapolate: 'clamp'
                    }),
                    height: 90
                }}
                resizeMode="contain"
            />
            <Image
                source={require('../assets/cadeadoSeguro.png')}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
            />
        </Animated.View>
    );
};

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
});
export default Header;