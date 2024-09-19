import type { Options, MediaQuery, Property, StyleSheetCache, ScaleOptions } from '../types';

import { match } from 'css-mediaquery';
import { PixelRatio } from 'react-native';

import { config } from './config';
import { ObjectTyped } from './object';

const StyleSheetCache: StyleSheetCache = {};

export const designLogicalPixelsToDeviceLogicalPixels = (px: number, base: Property, options: ScaleOptions) => {
    const { orientation, dimensions, customMaxUpScale, customMaxDownScale } = options;

    let maxUpScale = 'undefined' !== typeof customMaxUpScale ? customMaxUpScale : config.maxUpScale;

    if ('object' === typeof maxUpScale) {
        maxUpScale =
            ObjectTyped.keys(maxUpScale).reduce<null | Options>(
                (acc, query) =>
                    'string' === typeof query &&
                    match(query, {
                        orientation,
                        ...dimensions,
                        'device-width': dimensions.width,
                        'device-height': dimensions.height,
                    })
                        ? ((maxUpScale as MediaQuery)[query] as unknown as Options)
                        : acc,
                null,
            ) ?? maxUpScale.default;
    }

    let maxDownScale = 'undefined' !== typeof customMaxDownScale ? customMaxDownScale : config.maxDownScale;

    if ('object' === typeof maxDownScale) {
        maxDownScale =
            ObjectTyped.keys(maxDownScale).reduce<null | Options>(
                (acc, query) =>
                    'string' === typeof query &&
                    match(query, {
                        orientation,
                        ...dimensions,
                        'device-width': dimensions.width,
                        'device-height': dimensions.height,
                    })
                        ? ((maxDownScale as MediaQuery)[query] as unknown as Options)
                        : acc,
                null,
            ) ?? maxDownScale.default;
    }

    const cacheIdentifier = JSON.stringify({
        px,
        base,
        orientation,
        maxUpScale,
        maxDownScale,
        dimensions: {
            width: dimensions.width,
            height: dimensions.height,
        },
    });

    if ('undefined' !== typeof StyleSheetCache[cacheIdentifier]) {
        return StyleSheetCache[cacheIdentifier] as unknown as number;
    }

    if (config.debug) {
        console.log(
            `[INFO] There is no ${cacheIdentifier} in the StyleSheetCache, calculating it...this is normal on the first run or orientation changes.`,
        );
    }

    let result = 0;

    let factor: number | null =
        ('width' === base ? dimensions.width : dimensions.height) / ('width' === base ? config.width : config.height);

    if ('original' === maxUpScale && factor >= 1) {
        result = px;
        factor = null;
    } else if ('original' === maxDownScale && factor <= 1) {
        result = px;
        factor = null;
    } else if ('original' !== maxUpScale && 'limitless' !== maxUpScale && factor > maxUpScale) {
        factor = maxUpScale;
    } else if ('original' !== maxDownScale && 'limitless' !== maxDownScale && factor < maxDownScale) {
        factor = maxDownScale;
    }

    if ('number' === typeof factor) {
        result = PixelRatio.roundToNearestPixel(px * factor);
    }

    StyleSheetCache[cacheIdentifier] = result;

    return result;
};
