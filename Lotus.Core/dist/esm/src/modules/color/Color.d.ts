import { IColorModelHSL } from './ColorModel';
/** @class Color
* Color class accepts a CSS color string, rgb, hsl data as the input, manipulate the color, and returns a CSS-compatible color string.
* @constructor
*
* @example
* new Color('red')  // named CSS colors
*
* @example
* new Color('red', 0.5)  // named CSS colors and transparency
*
* @example
* new Color('#f00')  // hex 3 characters
*
* @example
* new Color('#e2b644')  // hex 6 characters
*
* @example
* new Color('rgb(255, 0, 100)')  // rgb()
*
* @example
* new Color('rgba(255, 0, 100, 0.5)')  // rgba()
*
* @example
* new Color('rgba(255, 0, 100, 0.5)', 0.1)  // 0.1 overrides alpha from rgba
*
* @example
* new Color([255,0,0])  // rgb array
*
* @example
* new Color([255,0,0], 0.5)  // rgb and transparency
*
* @example
* new Color({  // hsl object
*     h: 0.2,
*     s: 0.5,
*     l: 1
* })
*
* @example
* new Color({  // hsl object and transparency
*     h: 0.5,
*     s: 1,
*     l: 1
* }, 0.5)
*/
export declare class Color {
    private rgb;
    private hsl;
    private a;
    constructor();
    constructor(any: any);
    constructor(any: Color);
    constructor(any: string);
    constructor(any: number[]);
    constructor(any: IColorModelHSL);
    constructor(any: Color, alpha: number);
    constructor(any: string, alpha: number);
    constructor(any: number[], alpha: number);
    constructor(any: IColorModelHSL, alpha: number);
    constructor(red: number, green: number, blue: number);
    constructor(red: number, green: number, blue: number, alpha: number);
    private _getRGB;
    /**
     * Return the red, green, blue color values with the alpha channel as an array
     *
     * @method getRGB
     * @memberof Color
     * @return {Array} rgba the array of color values
     * @instance
     *
     * @example
     * new Color('red).getRGB();   // returns [255,0,0]
     *
     */
    getRGB(): number[];
    /**
     * Returns the hexadecimal value of the color
     *
     * @method getHex
     * @memberof Color
     * @return {String} hex color value
     * @instance
     *
     * @example
     * new Color('rgba(255,0,0,0.5)').getHex(); // returns "#f00"
     *
     */
    getHex(): string;
    private _getHSL;
    /**
     * Returns an [h,s,l] array from color string
     *
     * @method getHSL
     * @memberof Color
     * @return {Number[]} hsl array of [hue,saturation,lightness]
     * @instance
     *
     * @example
     * new Color('#f00').getHSL(); // returns [0,1,0.5]
     *
     */
    getHSL(): IColorModelHSL;
    /**
     * Returns the red component of a color string
     *
     * @method getRed
     * @memberof Color
     * @return {Number} red component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getRed(); // returns 255
     *
     */
    getRed(): number;
    /**
     * Set the red component of a color
     *
     * @method setRed
     * @memberof Color
     * @param {Number} red red component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(0,0,255)').red(255).toString();  // returns "#F0F"
     *
     */
    setRed(red: number): Color;
    /**
     * Returns the green component of a color string
     *
     * @method getGreen
     * @memberof Color
     * @return {Number} green component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getGreen(); // returns 255
     *
     */
    getGreen(): number;
    /**
     * Set the green component of a color
     *
     * @method setGreen
     * @memberof Color
     * @param {Number} green green component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').green(255).toString();  // returns "#FF0"
     *
     */
    setGreen(green: number): Color;
    /**
     * Returns the blue component of a color string
     *
     * @method getBlue
     * @memberof Color
     * @return {Number} blue component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getBlue(); // returns 255
     *
     */
    getBlue(): number;
    /**
     * Set the blue component of a color
     *
     * @method setBlue
     * @memberof Color
     * @param {Number} blue blue component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#FF0').blue(255).toString();  // returns "#FFF"
     *
     */
    setBlue(blue: number): Color;
    /**
     * Returns the transparency of a color
     *
     * @method getAlpha
     * @memberof Color
     * @return {Number} alpha transparency level between 0 and 1
     * @instance
     *
     * @example
     * new Color('#F00').getAlpha(); // returns 0
     * new Color('rgba(255,0,0,0.5)').getAlpha(); // returns 0.5
     *
     */
    getAlpha(): number;
    /**
     * Sets the transparency of a color
     *
     * @method setAlpha
     * @memberof Color
     * @param {Number} alpha transparency level between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').alpha(0.5).toString();  // returns "rgba(255,0,0,0.5)"
     *
     */
    setAlpha(alpha: number): Color;
    /**
     * Return the "saturation" of a color
     *
     * @method getSaturation
     * @memberof Color
     * @return {Number} saturation saturation value between 0 and 1
     * @instance
     v
     * @example
     * new Color('rgb(100,100,100)').getSaturation(); // returns 0
     * new Color('rgb(100,50,100)').getSaturation();  // returns 0.8333333333333334
     * new Color('rgb(100,0,100)').getSaturation();   // returns 1
     *
     */
    getSaturation(): number;
    /**
     * Set the "saturation" of a color
     *
     * @method setSaturation
     * @memberof Color
     * @param {Number} saturation saturation value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(100,50,50).saturation(0.5).toString().toBe("#712626");
     *
     */
    setSaturation(saturation: number): Color;
    /**
     * Increases the "saturation" of a color value
     *
     * @method increaseSaturate
     * @memberof Color
     * @param {Number} saturateBy amount to saturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('corn silk 3').saturate(0.1).toString(); // returns "#d3ccab"
     *
     */
    increaseSaturate(amount: number): Color;
    /**
     * Decreases the "saturation" of a color value
     *
     * @method decreaseSaturate
     * @memberof Color
     * @param {Number} amount amount to desaturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#d3ccab').desaturate(0.1).toString(); // returns "#cdc8b1"
     *
     */
    decreaseSaturate(amount: number): Color;
    /**
     * Return the "hue" of a color
     *
     * @method getHue
     * @memberof Color
     * @return {Number} hue hue value between 0 and 1
     * @instance
     *
     * @example
     * new Color('#a1b2c1').getHue(); // returns "0.578125"}
     * new Color('#f00').getHue(); // returns 0
     * new Color('#0f0').getHue(); // returns 0.3333333333333333
     * new Color('#00f').getHue(); // returns 0.6666666666666666
     *
     */
    getHue(): number;
    /**
     * Set the "hue" of a color
     *
     * @method setHue
     * @memberof Color
     * @param {Number} hue hue value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').hue(2/3).toString(); // returns "#00f"
     * new Color('#0f0').hue(1/3).toString(); // returns "#0f0"
     * new Color('#00f').hue(0.23).toString(); // returns "#9eff00"
     *
     */
    setHue(hue: number): Color;
    /**
     * Shifts the "hue" of a color value by a given percentage
     *
     * @method shiftHue
     * @memberof Color
     * @param {Number} hueShift amount to modify the hue by between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(255,255,0).shiftHue(0.25).toString(); // returns "#00ff7f"
     *
     */
    shiftHue(amount: number): Color;
    /**
     * Return the lightness of a color (how close to white or black the color is)
     *
     * @method getLightness
     * @memberof Color
     * @return {Number} lightness lightness value between 0 and 1
     * @instance
     *
     * @example
     * new Color('rgb(0,0,0)').getLightness();       // returns 0
     * new Color('rgb(100,50,100)').getLightness();  // returns 0.29411764705882354
     * new Color('rgb(255,255,255)').getLightness(); // returns 1
     *
     */
    getLightness(): number;
    /**
     * Set the lightness of a color, how close to white or black the color will be
     *
     * @method setLightness
     * @memberof Color
     * @param {Number} lightness lightness value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').lightness(0).toString(); // returns "#000"
     * new Color('rgb(255,0,0)').lightness(0.5).toString(); // returns "#F00"
     * new Color('rgb(255,0,0)').lightness(1).toString(); // returns "#FFF"
     *
     */
    setLightness(lightness: number): Color;
    /**
     * Increases the "lightness" of a color value
     *
     * @method increaseLighten
     * @memberof Color
     * @param {Number} amount amount to lighten between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').lighten(0.5).toString(); // returns "#FF8080"
     *
     */
    increaseLightness(amount: number): Color;
    /**
     * Decreases the "lightness" of a color value
     *
     * @method decreaseLighten
     * @memberof Color
     * @param {Number} darkenBy amount to darken between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').darken(0.5).toString(); // returns "#800000"
     *
     */
    decreaseLightness(amount: number): Color;
    /**
     * Changes the color closer to another color by a given percentage
     *
     * @method combine
     * @memberof Color
     * @param {Object} colorValue color string, array, or object
     * @param {Number} [amount=0.5] how close to the target color between 0 and 1 (0.5 is half-way between)
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('black').combine('red', 0.5).toString(); // returns "#800000"
     *
     */
    combine(colorValue: any, amount: number): Color;
    /**
     * Inverts the color
     *
     * @method invert
     * @memberof Color
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').invert(1).toString(); // returns "#0FF"
     * new Color('#fff').invert().toString();  // returns "#000"
     *
     */
    invert(): Color;
    /**
     * Shifts only the hue of a color closer to another color by a given percentage
     *
     * @method tint
     * @memberof Color
     * @param {String} colorValue color string or array
     * @param {Number} amount amount to shift the hue toward the target color between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').tint('#00f',0.5).toString(); // returns "#0f0"
     * new Color('rgb(0,0,100)').tint('rgb(100,0,0)',0.1).toString(); // returns "#002864"
     *
     */
    tint(colorValue: any, amount: number | undefined): Color;
    /**
     * Вернуть этот же цвет, но с модифицированным альфа значением
     * @param amount Альфа значение от 0 до 1
     * @returns {Color} new Color() instance
     */
    toModifyAlpha(amount: number): Color;
    /**
     * Вернуть этот же цвет, но с модифицированным альфа значением или текущий цвет
     * @param amount Альфа значение от 0 до 1
     * @returns {Color} new Color() instance
     */
    toModifyAlphaOrThis(amount?: number): Color;
    /**
     * Returns the CSS string of the color, either as hex value, or rgba if an alpha value is defined
     *
     * @method toString
     * @memberof Color
     * @return {String} css color value
     * @instance
     *
     * @example
     * new Color('rgb(0,0,255)').toString(); // returns "#00f"
     *
     */
    toString(isHex?: boolean): string;
    /**
     * Преобразование в CSS rgb/rgba значения
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     * @param addSemicolon Добавить точку с запятой в конце
     * @returns {String} CSS rgb/rgba значение
     */
    toCSSRgbValue(modifyAlpha?: number, addSemicolon?: boolean): string;
    /**
     * Получить яркость цвета
     * @returns Яркость цвета
     */
    luma(): number;
    /**
     * Получить цвет и цвет тени гармоничный к текущему
     * @returns Цвет и цвет тени гармоничный к текущему
     */
    createHarmoniousColorAndShadow(): {
        text: Color;
        shadow: Color;
    };
    /**
     * Получить цвет гармоничный к текущему
     * @returns Цвет гармоничный к текущему
     */
    createHarmoniousColor(): Color;
    /**
     * Получить цвет контрастный к текущему
     * @returns Цвет контрастный к текущему
     */
    createContrastColor(): Color;
    /**
     * Получить цвет контрастный или гармоничный к текущему
     * @param isHarmonious Гармоничный цвет текста
     * @returns Цвет контрастный или гармоничный к текущему
     */
    createContrastOrHarmoniousColor(isHarmonious?: boolean): Color;
}
