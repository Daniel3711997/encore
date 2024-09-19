export type ValueOf<T> = T[keyof T];

export const ObjectTyped = {
    keys: Object.keys as <T extends object>(yourObject: T) => (keyof T)[],
    values: Object.values as <U extends object>(yourObject: U) => U[keyof U][],
    entries: Object.entries as <O extends object>(yourObject: O) => [keyof O, O[keyof O]][],
    fromEntries: Object.fromEntries as <K extends string, V>(yourObjectEntries: [K, V][]) => Record<K, V>,
};
