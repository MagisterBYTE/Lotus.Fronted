/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColorHelper } from './ColorHelper';
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
export class Color 
{
  private rgb: number[] | undefined;
  private hsl: IColorModelHSL | undefined;
  private a: number;

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
  constructor(red?: any, green?: number, blue?: number, alpha?: number) 
  {
    if (arguments.length === 0) 
    {
      this.rgb = [0, 0, 0];
      this.a = 0;
    }

    else if (typeof arguments[0] === 'number') 
    {
      if (arguments.length === 3 && ColorHelper.isRGBArray([red, green, blue])) 
      {
        this.rgb = [red, green, blue];
        this.a = 1;
      }
      else if (arguments.length === 4 && ColorHelper.isRGBAArray([red, green, blue, alpha])) 
      {
        this.rgb = [red, green, blue];
        this.a = alpha!;
      }
      else throw Error('invalid color');
    }
    else if (typeof arguments[0] === 'string') 
    {
      const rgba = ColorHelper.parseColorString(arguments[0]);
      if (rgba) 
      {
        this.rgb = rgba.slice(0, 3);
        if (arguments.length === 2 && ColorHelper.isAlphaValue(arguments[1])) 
        {
          this.a = arguments[1];
        }
        else if (rgba.length === 4) 
        {
          this.a = rgba[3];
        }
        else 
        {
          this.a = 1;
        }
      }
      else throw Error('invalid color');
    }
    else if (typeof arguments[0] === 'object') 
    {
      const obj = arguments[0];
      if (obj.length > 0) 
      {
        if (obj.length === 3 && ColorHelper.isRGBArray(obj)) 
        {
          this.rgb = obj.slice(0, 3);
          if (arguments.length === 2) 
          {
            if (ColorHelper.isAlphaValue(arguments[1])) 
            {
              this.a = arguments[1];
            }
            else throw new Error('invalid alpha value');
          }
          else 
          {
            this.a = 1;
          }
        }
        else throw Error('invalid color');
      }
      else 
      {
        if (obj instanceof Color) 
        {
          if (obj.hsl) 
          {
            this.hsl = {
              h: obj.hsl.h,
              s: obj.hsl.s,
              l: obj.hsl.l
            };
          }
          if (obj.rgb) 
          {
            this.rgb = obj.rgb.slice();
          }
          if (arguments.length === 2) 
          {
            if (ColorHelper.isAlphaValue(arguments[1])) 
            {
              this.a = arguments[1];
            }
            else throw new Error('invalid alpha value');
          }
          else 
          {
            this.a = obj.a;
          }
        }
        else if (ColorHelper.isHSL(obj)) 
        {
          this.hsl = {
            h: obj.h,
            s: obj.s,
            l: obj.l
          };
          if (arguments.length === 2) 
          {
            if (ColorHelper.isAlphaValue(arguments[1])) 
            {
              this.a = arguments[1];
            }
            else throw new Error('invalid alpha value');
          }
          else 
          {
            this.a = 1;
          }
        }
        else throw Error('invalid color');
      }
    }
    else throw new Error('invalid color');
  }

  private _getRGB(): number[] 
  {
    if (!this.rgb) 
    {
      this.rgb = ColorHelper.hsl2rgb(this.hsl);
    }
    return this.rgb;
  }

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
  getRGB(): number[] 
  {
    return this._getRGB().slice();
  }

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
  getHex(): string 
  {
    return ColorHelper.rgb2hex(this._getRGB());
  }

  private _getHSL(): IColorModelHSL 
  {
    if (!this.hsl) 
    {
      this.hsl = ColorHelper.rgb2hsl(this.rgb!);
    }
    return this.hsl;
  }

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
  getHSL(): IColorModelHSL 
  {
    const hsl = this._getHSL();
    return {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l
    }
  }

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
  getRed(): number 
  {
    return this._getRGB()[0];
  }

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
  setRed(red: number): Color 
  {
    if (ColorHelper.isColorValue(red)) 
    {
      const rgb = this._getRGB();
      return new Color([red, rgb[1], rgb[2]], this.a);
    }
    else throw new Error('invalid red');
  }

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
  getGreen(): number 
  {
    return this._getRGB()[1];
  }

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
  setGreen(green: number): Color 
  {
    if (ColorHelper.isColorValue(green)) 
    {
      const rgb = this._getRGB();
      return new Color([rgb[0], green, rgb[2]], this.a);
    }
    else throw new Error('invalid green');
  }

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
  getBlue(): number 
  {
    return this._getRGB()[2];
  }

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
  setBlue(blue: number): Color 
  {
    if (ColorHelper.isColorValue(blue)) 
    {
      const rgb = this._getRGB();
      return new Color([rgb[0], rgb[1], blue], this.a);
    }
    else throw new Error('invalid blue');
  }

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
  getAlpha(): number 
  {
    return this.a;
  }

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
  setAlpha(alpha: number): Color 
  {
    if (ColorHelper.isAlphaValue(alpha)) 
    {
      if (this.hsl) 
      {
        return new Color(this.getHSL(), alpha);
      }
      else 
      {
        return new Color(this.getRGB(), alpha);
      }
    }
    else 
    {
      throw new Error('invalid alpha value');
    }
  }

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
  getSaturation(): number 
  {
    const hsl = this._getHSL();
    return hsl.s;
  }

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
  setSaturation(saturation: number): Color 
  {
    if (ColorHelper.isAlphaValue(saturation)) 
    {
      const hsl = this._getHSL();
      return new Color({
        h: hsl.h,
        s: saturation,
        l: hsl.l
      }, this.a);
    }
    else throw new Error('invalid saturation');
  }

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
  increaseSaturate(amount: number): Color 
  {
    if (amount >= -1 && amount <= 1) 
    {
      let s = this.getSaturation();
      s += amount;
      if (s > 1) s = 1;
      if (s < 0) s = 0;
      return this.setSaturation(s);
    }
    else throw new Error('invalid saturate');
  }

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
  decreaseSaturate(amount: number): Color 
  {
    return this.increaseSaturate(-amount);
  }

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
  getHue(): number 
  {
    const hsl = this._getHSL();
    return hsl.h;
  }

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
  setHue(hue: number): Color 
  {
    if (ColorHelper.isAlphaValue(hue)) 
    {
      const hsl = this._getHSL();
      return new Color({
        h: hue,
        s: hsl.s,
        l: hsl.l
      }, this.a);
    }
    else throw new Error('invalid hue');
  }

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
  shiftHue(amount: number): Color 
  {
    const hsl = this._getHSL();
    let newHue = hsl.h + amount;
    if (newHue > 1) 
    {
      const x = Math.floor(newHue);
      newHue -= x;
    }
    if (newHue < -1) 
    {
      const x = Math.floor(newHue);
      newHue += Math.abs(x);
    }
    if (newHue < 0) 
    {
      newHue += 1;
    }

    return new Color({
      h: newHue,
      s: hsl.s,
      l: hsl.l
    }, this.a);
  }

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
  getLightness(): number 
  {
    const hsl = this._getHSL();
    return hsl.l;
  }

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
  setLightness(lightness: number): Color 
  {
    if (ColorHelper.isAlphaValue(lightness)) 
    {
      const hsl = this._getHSL();
      return new Color({
        h: hsl.h,
        s: hsl.s,
        l: lightness
      }, this.a);
    }
    else
    {
      return new Color(255, 255, 255);
    }
  }

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
  increaseLightness(amount: number): Color 
  {
    if (amount >= -1 && amount <= 1) 
    {
      const hsl = this._getHSL();
      let l = hsl.l + amount;
      if (l > 1) l = 1;
      if (l < 0) l = 0;
      return new Color({
        h: hsl.h,
        s: hsl.s,
        l
      }, this.a);
    }
    else throw new Error('invalid lighten');
  }

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
  decreaseLightness(amount: number): Color 
  {
    return this.increaseLightness(-amount);
  }

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
  combine(colorValue: any, amount: number): Color 
  {
    if (ColorHelper.isAlphaValue(amount)) 
    {
      let color;
      if (colorValue instanceof Color) 
      {
        color = colorValue;
      }
      else 
      {
        color = new Color(colorValue);
      }
      const newRgb = ColorHelper.combine(this._getRGB(), color._getRGB(), amount);
      return new Color(newRgb, this.a);
    }
    else throw new Error('invalid combine amount');
  }

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
  invert(): Color 
  {
    return new Color(ColorHelper.invert(this._getRGB()), this.a);
  }

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
  tint(colorValue: any, amount: number | undefined): Color 
  {
    let color;
    if (colorValue instanceof Color) 
    {
      color = colorValue;
    }
    else 
    {
      color = new Color(colorValue);
    }
    if (typeof amount === 'undefined') 
    {
      amount = 0.5;
    }
    const h = ColorHelper.tint(this.getHue(), color.getHue(), amount);
    return new Color({
      h,
      s: this.hsl!.s,
      l: this.hsl!.l
    }, this.a);
  }

  /**
   * Вернуть этот же цвет, но с модифицированным альфа значением
   * @param amount Альфа значение от 0 до 1
   * @returns {Color} new Color() instance
   */
  toModifyAlpha(amount: number): Color
  {
    const rgb = this._getRGB();
    return new Color(rgb[0], rgb[1], rgb[2], amount);
  }

  /**
   * Вернуть этот же цвет, но с модифицированным альфа значением или текущий цвет
   * @param amount Альфа значение от 0 до 1
   * @returns {Color} new Color() instance
   */
  toModifyAlphaOrThis(amount?: number): Color
  {
    if(amount)
    {
      const rgb = this._getRGB();
      return new Color(rgb[0], rgb[1], rgb[2], amount);
    }
    else
    {
      return this;
    }
  }

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
  toString(isHex?: boolean): string 
  {
    if (this.a === 0) 
    {
      return 'transparent';
    }
    if (this.a < 1) 
    {
      const rgb = this._getRGB();
      return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
    }
    else 
    {
      if (isHex)
      {
        return this.getHex();
      }
      else
      {
        const rgb = this._getRGB();
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
      }
    }
  }

  /**
   * Преобразование в CSS rgb/rgba значения 
   * @param modifyAlpha Модификация значения альфы от 0 до 1
   * @param addSemicolon Добавить точку с запятой в конце
   * @returns {String} CSS rgb/rgba значение
   */
  toCSSRgbValue(modifyAlpha?: number, addSemicolon?: boolean): string 
  {
    let textColor = '';
    if (modifyAlpha)
    {
      const rgb = this._getRGB();
      textColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + modifyAlpha + ')';

      if (addSemicolon)
      {
        textColor = textColor + ';';
      }

      return textColor;
    }

    if (this.a === 0) 
    {
      textColor = 'transparent;';
    }
    if (this.a < 1) 
    {
      const rgb = this._getRGB();
      textColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
    }
    else 
    {
      const rgb = this._getRGB();
      textColor = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }

    if (addSemicolon)
    {
      textColor = textColor + ';';
    }

    return textColor;
  }

  /**
   * Получить яркость цвета
   * @returns Яркость цвета
   */
  public luma(): number
  {
    const rgb = this._getRGB();
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
  }

  /**
   * Получить цвет и цвет тени гармоничный к текущему
   * @returns Цвет и цвет тени гармоничный к текущему
   */
  public createHarmoniousColorAndShadow(): { text: Color, shadow: Color }
  {
    const hsl = this._getHSL();
    let h = hsl.h * 360;
    let s = hsl.s * 100;
    let l = hsl.l * 100;

    /* originals*/
    const o_h = h, o_s = s, o_l = l;
    s = 100;
    if (o_s <= 25)
    {
      if (o_l > 60)
      {
        l = 10;
      }
      else 
      {
        l = 95;
      }
    }
    else 
    {
      if ((o_h >= 25 && o_h <= 195) || o_h >= 295)
      {
        l = 10;
      }
      else if ((o_h >= 285 && o_h < 295) || (o_h > 195 && o_h <= 205))
      {
        h = 60;
        l = 50;
      }
      else 
      {
        l = 95;
      }
    }
    if ((o_h >= 295 || (o_h > 20 && o_h < 200)) && o_l <= 35)
    {
      l = 95;
    }
    else if (((o_h < 25 || o_h > 275) && o_l >= 60) || (o_h > 195 && o_l >= 70)
    )
    {
      l = 10;
    }

    let s_l = l;
    let s_h = h;
    const s_s = o_s;

    /* shadow*/
    if (l < 25)
    {
      s_l = 80;
    }
    else 
    {
      s_l = 10;
    }
    if (h == 60 && (l < 90 || l > 20))
    {
      s_h = 320;
    }
    else 
    {
      s_h = h;
    }

    const textColor: IColorModelHSL = { h: h / 360, s: s / 100, l: l / 100 };
    const shadowColor: IColorModelHSL = { h: s_h / 360, s: s_s / 100, l: s_l / 100 };

    return { text: new Color(textColor, 1), shadow: new Color(shadowColor, 0.5) };
  }

  /**
   * Получить цвет гармоничный к текущему
   * @returns Цвет гармоничный к текущему
   */
  public createHarmoniousColor(): Color
  {
    const hsl = this._getHSL();
    let h = hsl.h * 360;
    let s = hsl.s * 100;
    let l = hsl.l * 100;

    /* originals*/
    const o_h = h, o_s = s, o_l = l;
    s = 100;
    if (o_s <= 25)
    {
      if (o_l > 60)
      {
        l = 10;
      }
      else 
      {
        l = 95;
      }
    }
    else 
    {
      if ((o_h >= 25 && o_h <= 195) || o_h >= 295)
      {
        l = 10;
      }
      else if ((o_h >= 285 && o_h < 295) || (o_h > 195 && o_h <= 205))
      {
        h = 60;
        l = 50;
      }
      else 
      {
        l = 95;
      }
    }
    if ((o_h >= 295 || (o_h > 20 && o_h < 200)) && o_l <= 35)
    {
      l = 95;
    }
    else if (((o_h < 25 || o_h > 275) && o_l >= 60) || (o_h > 195 && o_l >= 70)
    )
    {
      l = 10;
    }

    const textColor: IColorModelHSL = { h: h / 360, s: s / 100, l: l / 100 };

    return new Color(textColor, 1);
  }

  /**
   * Получить цвет контрастный к текущему
   * @returns Цвет контрастный к текущему
   */
  public createContrastColor(): Color
  {
    return (this.luma() >= 165) ? new Color(255, 255, 255) : new Color(0, 0, 0);
  }

  /**
   * Получить цвет контрастный или гармоничный к текущему
   * @param isHarmonious Гармоничный цвет текста 
   * @returns Цвет контрастный или гармоничный к текущему
   */
  public createContrastOrHarmoniousColor(isHarmonious?: boolean): Color
  {
    if (isHarmonious)
    {
      return this.createHarmoniousColor();
    }
    else
    {
      return this.createContrastColor();
    }
  }
}