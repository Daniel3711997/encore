import type { Property, ScaleProperty, AppContextProps, Functions } from '../types';
import type { Context } from 'react';

import { useMemo } from 'react';

import { config } from '../app/config';
import { designLogicalPixelsToDeviceLogicalPixels } from '../app/helpers';
import { useAppContext } from '../components/AppContext';

export const useFunctions = <T>(appContext: Context<AppContextProps<T>>): Functions => {
    const context = useAppContext(appContext);

    return useMemo(
        () => ({
            font: createScaleFunction(config.functions.font, context),
            radius: createScaleFunction(config.functions.radius, context),
            width: createScaleFunction(config.functions.width, context),
            height: createScaleFunction(config.functions.height, context),
        }),
        [context],
    );
};

const createScaleFunction = <T>(base: Property, context: AppContextProps<T>) => {
    return (px: number, customMaxUpScale?: ScaleProperty, customMaxDownScale?: ScaleProperty) =>
        designLogicalPixelsToDeviceLogicalPixels(px, base, {
            customMaxUpScale,
            customMaxDownScale,
            orientation: context.orientation,
            dimensions: context['screen' === config.dimensionsController ? 'screenDimensions' : 'windowDimensions'],
        });
};
