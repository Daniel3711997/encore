import { AppProvider } from '@unpack/encore';
import { StrictMode } from 'react';
import { View, Text } from 'react-native';

import { theme, appContext, StyleSheet, useStyles } from './services/tools';

function MyComponent() {
    const styles = useStyles(stylesFactory);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
        </View>
    );
}

export default function App() {
    return (
        <StrictMode>
            <AppProvider theme={theme} context={appContext}>
                <MyComponent />
            </AppProvider>
        </StrictMode>
    );
}

const stylesFactory = StyleSheet.create(context => {
    return {
        text: {
            fontSize: 20,
            color: context.theme.colors.secondary,
            '(min-width: 500px)': {
                color: context.theme.colors.primary,
            },
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: context.theme.colors.primary,
            '(min-width: 500px)': {
                backgroundColor: context.theme.colors.secondary,
            },
        },
    };
});
