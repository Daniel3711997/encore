import type { ReactElement, Context } from 'react';
import type { ScaledSize, ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type ScaleFunction = (
    px: number,
    customMaxUpScale?: ScaleProperty,
    customMaxDownScale?: ScaleProperty,
) => number;
export type Property = 'width' | 'height';
export type ScaleProperty = Options | MediaQuery;
export type Orientation = 'portrait' | 'landscape';
export type Options = number | 'limitless' | 'original';
export type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export type ContextProps<T> = Omit<AppContextProps<T>, 'setAppTheme'>;
export type StylesConstructor<T, U> = (context: ContextProps<U>, functions: Functions) => T;

export interface MediaQuery {
    default: Options;
    [key: string]: Options;
}

export interface Functions {
    font: ScaleFunction;
    radius: ScaleFunction;
    width: ScaleFunction;
    height: ScaleFunction;
}

export interface FunctionsConfig {
    font: Property;
    radius: Property;
    width: Property;
    height: Property;
}

export interface ProviderProps<T> {
    theme: T;
    children: ReactElement;
    context: Context<AppContextProps<T>>;
}

export type StyleSheetCache = Record<string, number>;

export interface AppContextProps<T> {
    theme: T;
    orientation: Orientation;
    screenDimensions: ScaledSize;
    windowDimensions: ScaledSize;
    setAppTheme: (theme: T) => void;
}

export interface ScaleOptions {
    dimensions: ScaledSize;
    orientation: Orientation;
    customMaxUpScale?: ScaleProperty;
    customMaxDownScale?: ScaleProperty;
}

export interface Configuration {
    width: number;
    height: number;
    debug: boolean;
    maxUpScale: ScaleProperty;
    functions: FunctionsConfig;
    maxDownScale: ScaleProperty;
    dimensionsController: 'screen' | 'window';
    autoFunctions: Record<string, keyof FunctionsConfig>;
}
