export type RippleOptions<T extends HTMLElement = any> = {
    duration: number;
    color: string;
    timingFunction: string;
    disabled?: boolean;
    className: string;
    containerClassName: string;
    ignoreNonLeftClick: boolean;
    onSpawn?: (ctx: {
        /** the ripple element */
        readonly ripple: HTMLDivElement;
        /** cancels the current ripple animation */
        readonly cancelRipple: () => void;
        /** the ref to the ripple host element */
        readonly ref: React.RefObject<T>;
        /** the event that triggered the ripple (ts: casting required) */
        readonly event: unknown;
        /** the ripple container element */
        readonly container: HTMLDivElement;
    }) => void;
    cancelAutomatically: boolean;
    ref: React.RefObject<T>;
};
export type RippleMinimalEvent = {
    clientX: number;
    clientY: number;
    nativeEvent?: {
        which?: number;
        type?: string;
    };
};
/**
 * useRipple - Material UI style ripple effect React hook
 * @param inputOptions Ripple options
 * @returns Tuple `[ref, event]`. See https://github.com/asplunds/use-ripple for usage
 */
export declare function useRippleEffect<T extends HTMLElement = any>(inputOptions?: Partial<RippleOptions<T>>): readonly [import("react").RefObject<any>, (event: RippleMinimalEvent) => void];
/**
 * HOF useRipple - Generate a custom ripple hook with predefined options
 *
 * After generating a HOF useRipple you can then override some or all predefined options by passing a new option object.
 * @param inputOptions ripple options
 * @returns Custom HOC useRipple hook
 */
export declare function customRippleEffect<T extends HTMLElement = any>(inputOptions?: Partial<Omit<RippleOptions<T>, 'ref'>>): (overrideOptions?: Partial<RippleOptions<T>>) => readonly [import("react").RefObject<any>, (event: RippleMinimalEvent) => void];
