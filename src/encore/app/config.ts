import type { Configuration } from '../types';
import type { Optional } from 'utility-types';

export const config: Configuration = {
    width: 428,
    height: 926,
    debug: false,
    functions: {
        font: 'height',
        radius: 'width',
        width: 'width',
        height: 'height',
    },
    autoFunctions: {},
    maxUpScale: 'original',
    maxDownScale: 'original',
    dimensionsController: 'window',
};

export const setConfig = (newConfig: Optional<Configuration>) => {
    return Object.assign(config, newConfig);
};
