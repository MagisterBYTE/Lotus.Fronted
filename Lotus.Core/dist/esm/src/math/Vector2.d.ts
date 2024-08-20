import { Vector3 } from './Vector3';
/**
 * Интерфейс для описания двухмерного вектора
 */
export interface IVector2 {
    /**
     * Координата X
     */
    x: number;
    /**
     * Координата Y
     */
    y: number;
}
export declare class Vector2 implements IVector2 {
    /**
     * Единичный вектор
     */
    static readonly One: Vector2;
    /**
     * Вектор "право"
     */
    static readonly Right: Vector2;
    /**
     * Вектор "влево"
     */
    static readonly Left: Vector2;
    /**
     * Вектор "вверх"
     */
    static readonly Up: Vector2;
    /**
     * Вектор "вниз"
     */
    static readonly Down: Vector2;
    /**
     * Нулевой вектор
     */
    static readonly Zero: Vector2;
    static cross(vector: Vector2, vector2: Vector2, dest?: Vector3): Vector3;
    /**
     * Calculates the dot product of two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The dot product of the two vectors
     */
    static dot(vector: Vector2, vector2: Vector2): number;
    /**
     * Calculates the distance between two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static distance(vector: Vector2, vector2: Vector2): number;
    /**
     * Calculates the distance between two vectors squared
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static squaredDistance(vector: Vector2, vector2: Vector2): number;
    /**
     * Calculates a normalized vector representing the direction from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static direction(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2;
    /**
     * Performs a linear interpolation over two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} a
     * @param {Vector2} b
     * @param {number} t
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static lerp(a: Vector2, b: Vector2, t: number, dest?: Vector2): Vector2;
    /**
     * Adds two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static sum(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2;
    /**
     * Subtracts two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static difference(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2;
    /**
     * Multiplies two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static product(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2;
    /**
     * Divides two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static quotient(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2;
    /**
     * Координата X
     */
    x: number;
    /**
     * Координата Y
     */
    y: number;
    /**
     * @returns {number[]} An array containing the x-component and y-component of the vector
     */
    get xy(): number[];
    /**
     * @param {number[]} values An array containing the new x-component and y-component of the vector
     */
    set xy(values: number[]);
    constructor(x: number, y: number);
    /**
     * Retrieves the x-component or y-component of the vector.
     * @param {number} index
     * @returns {number}
     */
    at(index: number): number;
    /**
     * Sets both the x- and y-components of the vector to 0.
     */
    reset(): void;
    /**
     * Copies the x- and y-components from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    copy(dest?: Vector2): Vector2;
    /**
     * Multiplies both the x- and y-components of a vector by -1.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    negate(dest?: Vector2): Vector2;
    /**
     * Checks if two vectors are equal, using a threshold to avoid floating-point precision errors.
     * @param {Vector2} other
     * @param {number} threshold
     * @returns {boolean}
     */
    equals(other: Vector2, threshold?: number): boolean;
    /**
     * Returns the distance from the vector to the origin.
     * @returns {number}
     */
    length(): number;
    /**
     * Returns the distance from the vector to the origin, squared.
     * @returns {number}
     */
    squaredLength(): number;
    /**
     * Adds two vectors together.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    add(vector: Vector2, dest?: Vector2): Vector2;
    /**
     * Subtracts one vector from another.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    subtract(vector: Vector2, dest?: Vector2): Vector2;
    /**
     * Multiplies two vectors together piecewise.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    multiply(vector: Vector2, dest?: Vector2): Vector2;
    /**
     * Divides two vectors piecewise.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    divide(vector: Vector2, dest?: Vector2): Vector2;
    /**
     * Scales a vector by a scalar parameter.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {number} value
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    scale(value: number, dest?: Vector2): Vector2;
    /**
     * Normalizes a vector.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    normalize(dest?: Vector2): Vector2;
    toString(): string;
}
