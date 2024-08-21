export declare class BooleanHelper {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static readonly TrueValues: string[];
    static parse(item: any): boolean;
    static getValue(value: boolean, yes?: string, no?: string): string;
    static compare(left?: boolean, right?: boolean, isDesc?: boolean): number;
}
