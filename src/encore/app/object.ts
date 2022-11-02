/* eslint-disable @typescript-eslint/ban-types */

export type ValueOf<T> = T[keyof T];

export const ObjectTyped = {
    keys: Object.keys as <T extends {}>(yourObject: T) => Array<keyof T>,
    values: Object.values as <U extends {}>(yourObject: U) => Array<U[keyof U]>,
    entries: Object.entries as <O extends {}>(yourObject: O) => Array<[keyof O, O[keyof O]]>,
    fromEntries: Object.fromEntries as <K extends string, V>(yourObjectEntries: [K, V][]) => Record<K, V>,
};
