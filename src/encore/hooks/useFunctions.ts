import type { Context } from 'react';
import type { TProperty, TScaleProperty, IAppContextProps, IFunctions } from '../types';

import { useMemo } from 'react';
import { config } from '../app/config';
import { useAppContext } from '@app/encore';
import { designLogicalPixelsToDeviceLogicalPixels } from '../app/helpers';

export const useFunctions = <T>(appContext: Context<IAppContextProps<T>>): IFunctions => {
    const context = useAppContext(appContext);

    return useMemo(
        () => ({
            font: createScaleFunction(config.functions.font, context),
            radius: createScaleFunction(config.functions.radius, context),
            width: createScaleFunction(config.functions.width, context),
            height: createScaleFunction(config.functions.height, context),
        }),
        [context]
    );
};

const createScaleFunction = <T>(base: TProperty, context: IAppContextProps<T>) => {
    return (px: number, customMaxUpScale?: TScaleProperty, customMaxDownScale?: TScaleProperty) =>
        designLogicalPixelsToDeviceLogicalPixels(px, base, {
            customMaxUpScale,
            customMaxDownScale,
            orientation: context.orientation,
            dimensions: context['screen' === config.dimensionsController ? 'screenDimensions' : 'windowDimensions'],
        });
};
