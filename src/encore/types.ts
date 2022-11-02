import type { ReactElement, Context } from 'react';
import type { ScaledSize, ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type TScaleFunction = (
    px: number,
    customMaxUpScale?: TScaleProperty,
    customMaxDownScale?: TScaleProperty
) => number;
export type TProperty = 'width' | 'height';
export type TScaleProperty = TOptions | TMediaQuery;
export type TOrientation = 'portrait' | 'landscape';
export type TOptions = number | 'limitless' | 'original';
export type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export type TContextProps<T> = Omit<IAppContextProps<T>, 'setAppTheme'>;
export type TStylesConstructor<T, U> = (context: TContextProps<U>, functions: IFunctions) => T;

export interface TMediaQuery {
    default: TOptions;
    [key: string]: TOptions;
}

export interface IFunctions {
    font: TScaleFunction;
    radius: TScaleFunction;
    width: TScaleFunction;
    height: TScaleFunction;
}

export interface IFunctionsConfig {
    font: TProperty;
    radius: TProperty;
    width: TProperty;
    height: TProperty;
}

export interface IProviderProps<T> {
    theme: T;
    children: ReactElement;
    context: Context<IAppContextProps<T>>;
}

export interface IStyleSheetCache {
    [key: string]: number;
}

export interface IAppContextProps<T> {
    theme: T;
    orientation: TOrientation;
    screenDimensions: ScaledSize;
    windowDimensions: ScaledSize;
    setAppTheme: (theme: T) => void;
}

export interface IScaleOptions {
    dimensions: ScaledSize;
    orientation: TOrientation;
    customMaxUpScale?: TScaleProperty;
    customMaxDownScale?: TScaleProperty;
}

export interface IConfiguration {
    width: number;
    height: number;
    debug: boolean;
    maxUpScale: TScaleProperty;
    functions: IFunctionsConfig;
    maxDownScale: TScaleProperty;
    autoFunctions: {
        [key: string]: keyof IFunctionsConfig;
    };
    dimensionsController: 'screen' | 'window';
}
