/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any */

import type { NamedStyles, TStylesConstructor, IFunctions } from '../types';

import mediaQuery from 'css-mediaquery';

import { config } from '../app/config';
import { ObjectTyped } from '../app/object';
import { StyleSheet as NativeStyleSheet } from 'react-native';

const processStyles = <T>(styles: T, functions: IFunctions): T => {
    if (styles !== null && 'object' === typeof styles) {
        ObjectTyped.keys(styles).forEach(key => {
            const style = styles[key];

            if (style !== null && 'object' === typeof style) {
                styles[key] = processStyles(style, functions);
                return;
            }

            if (
                'string' === typeof key &&
                'number' === typeof style &&
                'undefined' !== typeof config.autoFunctions[key]
            ) {
                styles[key] = functions[config.autoFunctions[key] as keyof IFunctions](style) as any;
            }
        });
    }

    return styles;
};

const StyleSheetCreateStyle = <T extends NamedStyles<T> | NamedStyles<any>, U>(
    stylesConstructor: TStylesConstructor<NamedStyles<T> | T, U>
): TStylesConstructor<T, U> => {
    return (context, functions) => {
        let styles = stylesConstructor(context, functions);

        const orientation = context.orientation;
        const dimensions = context['screen' === config.dimensionsController ? 'screenDimensions' : 'windowDimensions'];

        ObjectTyped.keys(styles).forEach(key => {
            const style = styles[key];

            if (style !== null && 'object' === typeof style) {
                ObjectTyped.keys(style).forEach(query => {
                    if ('string' === typeof query && query.startsWith('(') && query.endsWith(')')) {
                        // eslint-disable-next-line import/no-named-as-default-member
                        const mediaQueryMatch = mediaQuery.match(query, {
                            // @ts-ignore
                            type: 'screen',
                            orientation,
                            ...dimensions,
                            'device-width': dimensions.width,
                            'device-height': dimensions.height,
                        });

                        if (mediaQueryMatch) {
                            styles[key] = {
                                ...style,
                                ...style[query],
                            };
                        }

                        delete styles[key][query]; // Remove the media query from the style object
                    }
                });
            }
        });

        if (ObjectTyped.keys(config.autoFunctions).length) styles = processStyles(styles, functions);

        return NativeStyleSheet.create(styles);
    };
};

export const StyleSheet = {
    ...NativeStyleSheet,
    create: StyleSheetCreateStyle,
    nativeCreate: NativeStyleSheet.create,
};
