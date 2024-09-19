import { multiply } from '@unpack/encore';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
    const [result, setResult] = useState<number | undefined>();

    useEffect(() => {
        multiply(3, 7)
            .then(setResult)
            .catch(() => null);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Result: {result}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
