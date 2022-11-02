/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { TOptions, TMediaQuery, TProperty, IStyleSheetCache, IScaleOptions } from '../types';

import mediaQuery from 'css-mediaquery';

import { config } from './config';
import { ObjectTyped } from './object';
import { PixelRatio } from 'react-native';

const StyleSheetCache: IStyleSheetCache = {};

export const designLogicalPixelsToDeviceLogicalPixels = (px: number, base: TProperty, options: IScaleOptions) => {
    const { orientation, dimensions, customMaxUpScale, customMaxDownScale } = options;

    let maxUpScale =
        null !== customMaxUpScale && 'undefined' !== typeof customMaxUpScale ? customMaxUpScale : config.maxUpScale;

    if ('object' === typeof maxUpScale) {
        maxUpScale =
            ObjectTyped.keys(maxUpScale).reduce<null | TOptions>(
                (acc, query) =>
                    'string' === typeof query &&
                    // eslint-disable-next-line import/no-named-as-default-member
                    mediaQuery.match(query, {
                        // @ts-ignore
                        type: 'screen',
                        orientation,
                        ...dimensions,
                        'device-width': dimensions.width,
                        'device-height': dimensions.height,
                    })
                        ? ((maxUpScale as TMediaQuery)[query] as TOptions)
                        : acc,
                null
            ) || maxUpScale.default;
    }

    let maxDownScale =
        null !== customMaxDownScale && 'undefined' !== typeof customMaxDownScale
            ? customMaxDownScale
            : config.maxDownScale;

    if ('object' === typeof maxDownScale) {
        maxDownScale =
            ObjectTyped.keys(maxDownScale).reduce<null | TOptions>(
                (acc, query) =>
                    'string' === typeof query &&
                    // eslint-disable-next-line import/no-named-as-default-member
                    mediaQuery.match(query, {
                        // @ts-ignore
                        type: 'screen',
                        orientation,
                        ...dimensions,
                        'device-width': dimensions.width,
                        'device-height': dimensions.height,
                    })
                        ? ((maxDownScale as TMediaQuery)[query] as TOptions)
                        : acc,
                null
            ) || maxDownScale.default;
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

    if ('undefined' !== typeof StyleSheetCache[cacheIdentifier]) return StyleSheetCache[cacheIdentifier] as number;

    if (config.debug)
        console.log(
            `[INFO] There is no ${cacheIdentifier} in the StyleSheetCache, calculating it...this is normal on the first run or orientation changes`
        );

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
