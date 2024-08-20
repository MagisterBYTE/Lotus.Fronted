/**
 * Интерфейс для описания трехмерного вектора
 */
export interface IVector3 {
    /**
     * Координата X
     */
    x: number;
    /**
     * Координата Y
     */
    y: number;
    /**
     * Координата Z
     */
    z: number;
}
export declare class Vector3 implements IVector3 {
    static get zero(): Vector3;
    static get one(): Vector3;
    static get up(): Vector3;
    static get down(): Vector3;
    static get right(): Vector3;
    static get left(): Vector3;
    static get forward(): Vector3;
    static get backward(): Vector3;
    get x(): number;
    get y(): number;
    get z(): number;
    get xy(): number[];
    get xyz(): number[];
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set xy(values: number[]);
    set xyz(values: number[]);
    private _values;
    constructor(values?: number[]);
    static cross(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    static dot(vector: Vector3, vector2: Vector3): number;
    static distance(vector: Vector3, vector2: Vector3): number;
    static squaredDistance(vector: Vector3, vector2: Vector3): number;
    static direction(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    static lerp(a: Vector3, b: Vector3, t: number, dest?: Vector3): Vector3;
    static sum(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    static difference(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    static product(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    static quotient(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3;
    at(index: number): number;
    reset(): void;
    copy(dest?: Vector3): Vector3;
    negate(dest?: Vector3): Vector3;
    equals(other: Vector3, threshold?: number): boolean;
    length(): number;
    squaredLength(): number;
    add(vector: Vector3, dest?: Vector3): Vector3;
    subtract(vector: Vector3, dest?: Vector3): Vector3;
    multiply(vector: Vector3, dest?: Vector3): Vector3;
    /**
     *
     * @param vector
     * @param dest
     * @returns
     */
    divide(vector: Vector3, dest?: Vector3): Vector3;
    scale(value: number, dest?: Vector3): Vector3;
    normalize(dest?: Vector3): Vector3;
}
