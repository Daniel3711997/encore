import type { AppContextProps, StylesConstructor } from '../types';
import type { Context } from 'react';

import { useMemo } from 'react';

import { useAppContext } from '../components/AppContext';
import { useFunctions } from '../hooks/useFunctions';

export const useStyles = <T, U>(styles: StylesConstructor<T, U>, appContext: Context<AppContextProps<U>>) => {
    const functions = useFunctions(appContext);
    const context = useAppContext(appContext);

    const limitedContext = useMemo(
        () => ({
            theme: context.theme,
            orientation: context.orientation,
            screenDimensions: context.screenDimensions,
            windowDimensions: context.windowDimensions,
        }),
        [context],
    );

    return useMemo(() => styles(limitedContext, functions), [functions, limitedContext, styles]);
};
