import type { Optional } from 'utility-types';
import type { IConfiguration } from '../types';

export const config: IConfiguration = {
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

export const setConfig = (newConfig: Optional<IConfiguration>) => Object.assign(config, newConfig);
