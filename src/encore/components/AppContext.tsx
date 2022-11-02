/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import type { Context } from 'react';
import type { IProviderProps, IAppContextProps, TOrientation } from '../types';

import { config } from '../app/config';
import { Dimensions } from 'react-native';
import { useDimensions } from '@app/encore';
import { createContext, useState, useMemo, useContext } from 'react';

export const createTheme = <T,>(theme: T): T => {
    return theme;
};

export const useAppContext = <T,>(AppContext: Context<T>): T => {
    return useContext(AppContext);
};

export const createAppContext = <T,>(theme: T): Context<IAppContextProps<T>> => {
    const screenDimensions = Dimensions.get('screen');
    const windowDimensions = Dimensions.get('window');

    return createContext({
        theme,
        screenDimensions,
        windowDimensions,
        setAppTheme: theme => {
            console.error('setAppTheme is not implemented', theme);
        },
        orientation:
            ('screen' === config.dimensionsController ? screenDimensions : windowDimensions).width >
            ('screen' === config.dimensionsController ? screenDimensions : windowDimensions).height
                ? 'landscape'
                : 'portrait',
    });
};

export const AppProvider = <T extends unknown>({ children, theme, context: AppContext }: IProviderProps<T>) => {
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
                : 'portrait') as TOrientation,
        }),
        [appTheme, dimensions]
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
