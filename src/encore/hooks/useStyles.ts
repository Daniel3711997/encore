import type { Context } from 'react';
import type { IAppContextProps, TStylesConstructor } from '../types';

import { useMemo } from 'react';
import { useFunctions, useAppContext } from '@app/encore';

export const useStyles = <T, U>(styles: TStylesConstructor<T, U>, appContext: Context<IAppContextProps<U>>) => {
    const context = useAppContext(appContext);
    const functions = useFunctions(appContext);

    const limitedContext = useMemo(
        () => ({
            theme: context.theme,
            orientation: context.orientation,
            screenDimensions: context.screenDimensions,
            windowDimensions: context.windowDimensions,
        }),
        [context]
    );

    return useMemo(() => styles(limitedContext, functions), [functions, limitedContext, styles]);
};
