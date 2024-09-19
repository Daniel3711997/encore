import type { NamedStyles, StylesConstructor, Functions } from '../types';

import { match } from 'css-mediaquery';
import { StyleSheet as NativeStyleSheet } from 'react-native';

import { config } from '../app/config';
import { ObjectTyped } from '../app/object';

const processStyles = <T>(styles: T, functions: Functions): T => {
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                styles[key] = functions[config.autoFunctions[key] as keyof Functions](style) as any;
            }
        });
    }

    return styles;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyleSheetCreateStyle = <T extends NamedStyles<T> | NamedStyles<any>, U>(
    stylesConstructor: StylesConstructor<T, U>,
): StylesConstructor<T, U> => {
    return (context, functions) => {
        let styles = stylesConstructor(context, functions);

        const orientation = context.orientation;
        const dimensions = context['screen' === config.dimensionsController ? 'screenDimensions' : 'windowDimensions'];

        ObjectTyped.keys(styles).forEach(key => {
            const style = styles[key];

            if ('object' === typeof style) {
                ObjectTyped.keys(style).forEach(query => {
                    if ('string' === typeof query && query.startsWith('(') && query.endsWith(')')) {
                        const mediaQueryMatch = match(query, {
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

                        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                        delete styles[key][query];
                    }
                });
            }
        });

        if (ObjectTyped.keys(config.autoFunctions).length) {
            styles = processStyles(styles, functions);
        }

        return NativeStyleSheet.create(styles);
    };
};

export const StyleSheet = {
    ...NativeStyleSheet,
    create: StyleSheetCreateStyle,
    nativeCreate: NativeStyleSheet.create,
};
