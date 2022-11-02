/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    setConfig,
    createTheme,
    createAppContext,
    useStyles as useStylesBase,
    StyleSheet as NativeStyleSheet,
    useFunctions as useFunctionsBase,
    useAppContext as useAppContextBase,
} from '@app/encore';

import type { NamedStyles, TStylesConstructor } from '@app/encore';

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
    maxUpScale: 'original',
    maxDownScale: 'original',
    dimensionsController: 'window',
});

const createFactory = <T extends NamedStyles<T> | NamedStyles<any>>(
    constructor: TStylesConstructor<T, typeof theme>
): TStylesConstructor<T, typeof theme> => {
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

export const useStyles = <T>(styles: TStylesConstructor<T, typeof theme>) => {
    return useStylesBase(styles, appContext);
};
