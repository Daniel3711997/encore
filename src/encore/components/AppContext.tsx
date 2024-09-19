import type { ProviderProps, AppContextProps, Orientation } from '../types';
import type { Context } from 'react';

import { createContext, useState, useMemo, useContext } from 'react';
import { Dimensions } from 'react-native';

import { config } from '../app/config';
import { useDimensions } from '../hooks/useDimensions';

export const createTheme = <T,>(theme: T): T => {
    return theme;
};

export const useAppContext = <T,>(AppContext: Context<T>): T => {
    return useContext(AppContext);
};

export const createAppContext = <T,>(theme: T): Context<AppContextProps<T>> => {
    const screenDimensions = Dimensions.get('screen');
    const windowDimensions = Dimensions.get('window');

    return createContext({
        theme,
        screenDimensions,
        windowDimensions,
        setAppTheme: newTheme => {
            console.error('setAppTheme is not implemented', newTheme);
        },
        orientation:
            ('screen' === config.dimensionsController ? screenDimensions : windowDimensions).width >
            ('screen' === config.dimensionsController ? screenDimensions : windowDimensions).height
                ? 'landscape'
                : 'portrait',
    });
};

export const AppProvider = <T,>({ children, theme, context: AppContext }: ProviderProps<T>) => {
    const dimensions = useDimensions();

    const [appTheme, setAppTheme] = useState<T>(theme);

    const contextValue = useMemo(
        () => ({
            setAppTheme,
            theme: appTheme,
            screenDimensions: dimensions.screen,
            windowDimensions: dimensions.window,
            orientation: (dimensions['screen' === config.dimensionsController ? 'screen' : 'window'].width >
            dimensions['screen' === config.dimensionsController ? 'screen' : 'window'].height
                ? 'landscape'
                : 'portrait') as Orientation,
        }),
        [appTheme, dimensions],
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
