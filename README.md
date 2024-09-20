<img src="https://cdn-images-1.medium.com/max/800/1*BWpx3uRPlWByahoXA6M-BQ.jpeg" />

**Unfortunately i don't have enough time to write a detailed 'Read Me' but i'm pretty sure you will figure it out how to use it based on the types.**

# Contents

-   [The Package](#encore)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [License](#license)
-   [Contributing](#contributing)

# Encore

@unpack/encore is a React Native responsive tool designed to automatically scale your app to fit any screen size. It simplifies the process of creating responsive designs by providing utilities that adjust your app's layout and components based on the device's screen dimensions. Additionally, it includes a theme helper tool to manage and apply consistent styling across your application. With @unpack/encore, you can ensure a seamless user experience on any device, from mobile phones to tablets.

# Installation

```sh
yarn add @unpack/encore

or

npm install @unpack/encore
```

# Usage

Create a file for example tools.ts

```js
import type { NamedStyles, StylesConstructor } from '@unpack/encore';

import {
    setConfig,
    createTheme,
    createAppContext,
    useStyles as useStylesBase,
    StyleSheet as NativeStyleSheet,
    useFunctions as useFunctionsBase,
    useAppContext as useAppContextBase,
} from '@unpack/encore';

export const theme = createTheme({
    colors: {
        primary: 'red',
        secondary: 'blue',
    },
});

setConfig({
    width: 428,
    height: 926,
    debug: false,
    functions: {
        font: 'height',
        radius: 'width',
        width: 'width',
        height: 'height',
    },
    autoFunctions: {
        fontSize: 'font',
        lineHeight: 'font',
    },
    maxUpScale: 'limitless',
    maxDownScale: 'limitless',
    dimensionsController: 'window',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createFactory = <T extends NamedStyles<T> | NamedStyles<any>>(
    constructor: StylesConstructor<T, typeof theme>,
): StylesConstructor<T, typeof theme> => {
    return NativeStyleSheet.create(constructor);
};

export const StyleSheet = {
    ...NativeStyleSheet,
    create: createFactory,
};

export const useFunctions = () => {
    return useFunctionsBase(appContext);
};

export const useAppContext = () => {
    return useAppContextBase(appContext);
};

export const appContext = createAppContext(theme);

export const useStyles = <T>(styles: StylesConstructor<T, typeof theme>) => {
    return useStylesBase(styles, appContext);
};
```

In your App.tsx

```js
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
```

# API

#### setConfig

| Parameter              | Type            | Description                                                   |
| :--------------------- | :-------------- | :------------------------------------------------------------ |
| `width`                | `number`        | The width of the simulator where the design was made          |
| `height`               | `number`        | The height of the simulator where the design was made         |
| `debug`                | `boolean`       | Show debug logs                                               |
| `functions`            | `object`        | I suggest to keep those as is                                 |
| `autoFunctions`        | `object`        | Here you can define which style properties can be auto scaled |
| `maxUpScale`           | `ScaleProperty` | See types                                                     |
| `maxDownScale`         | `ScaleProperty` | See types                                                     |
| `dimensionsController` | `string`        | 'window' or 'screen'                                          |

# Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

# License

MIT
