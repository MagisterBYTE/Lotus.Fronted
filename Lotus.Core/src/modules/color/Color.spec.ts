import { Color } from './Color';

describe('Color class constructor', function () 
{
  it('accepts strings', function (done) 
  {
    expect(new Color('#f00').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('#ff0000').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('#FF0000').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('red').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('red 1').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('tan').getRGB()).toStrictEqual([210, 180, 140]);
    expect(new Color('transparent').getRGB()).toStrictEqual([0, 0, 0]);
    expect(new Color('transparent').toString()).toBe('transparent');
    expect(new Color('rgba(255,0,0,0)').toString()).toBe('transparent');
    expect(new Color('rgb(255,0,0)').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('rgba(255, 0, 0, 0.5)').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('rgba(255, 0, 0, 0.5)').getAlpha()).toBe(0.5);
    expect(new Color('rgba(255, 0, 0, 0.5)', 0.1).getAlpha()).toBe(0.1);
    done();
  });
  it('accepts rgb arrays', function (done) 
  {
    expect(new Color([255, 0, 0]).getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color([255, 0, 0], 0.5).toString()).toBe('rgba(255,0,0,0.5)');
    expect(new Color(255, 0, 0).getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color(255, 0, 0, 0.5).toString()).toBe('rgba(255,0,0,0.5)');
    done();
  });
  it('accepts hsl objects', function (done) 
  {
    expect(new Color({
      h: 0,
      s: 1,
      l: 0.5
    }).toString(true)).toBe('#f00');

    expect(new Color({
      h: 0,
      s: 1,
      l: 0.5
    }, 0.5).toString(true)).toBe('rgba(255,0,0,0.5)');

    expect(new Color({
      h: 0.5,
      s: 0.5,
      l: 0.5
    }).getRGB()).toStrictEqual([64, 191, 191]);

    done();
  });
  it('accepts color class', function (done) 
  {
    expect(new Color(new Color(255, 0, 0)).getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color(new Color(255, 0, 0, 0.5)).toString()).toBe('rgba(255,0,0,0.5)');
    expect(new Color(new Color(255, 0, 0, 0.5), 0.1).toString()).toBe('rgba(255,0,0,0.1)');
    done();
  });

  it('toString() converts the supplied color into a CSS compatible hex, rgb, rgba string', function (done) 
  {
    expect(new Color('red').toString(true)).toBe('#f00');
    expect(new Color('tan').toString(true)).toBe('#d2b48c');
    expect(new Color('#FF0000').toString(true)).toBe('#f00');
    expect(new Color('rgb(255,0,0)').toString(true)).toBe('#f00');
    expect(new Color('rgba(255, 0, 0, 0.5)').toString()).toBe('rgba(255,0,0,0.5)');
    expect(new Color('rgba(255, 255, 255, 0)').toString()).toBe('transparent');
    expect(new Color([255, 0, 0], 0.5).toString()).toBe('rgba(255,0,0,0.5)');
    expect(new Color(255, 0, 0, 0.5).toString()).toBe('rgba(255,0,0,0.5)');
    done();
  });

  it('throws Error invalid color string', function (done) 
  {
    try 
    {
      new Color('this is not a color string');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) 
    {
      expect(e.message).toBe('invalid color');
      done();
    }
  });

  it('throws Error: invalid color data', function (done) 
  {
    try 
    {
      new Color(['a', -10, 0, 1.01]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) 
    {
      expect(e.message).toBe('invalid color');
      done();
    }
  });

  it('throws Error: invalid color data', function (done) 
  {
    try 
    {
      new Color(255, 0, 0, -1);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) 
    {
      expect(e.message).toBe('invalid color');
      done();
    }
  });
});

describe('.setAlpha()', function () 
{
  it('converts to rgba()', function (done) 
  {
    expect(new Color('red').setAlpha(0.5).toString()).toBe('rgba(255,0,0,0.5)');
    expect(new Color('red').setAlpha(0).toString()).toBe('transparent');
    expect(new Color([255, 0, 0], 0.5).setAlpha(1).toString(true)).toBe('#f00');
    done();
  });
  it('alpha does not modify existing color', function (done) 
  {
    const myColor = new Color('red');
    expect(myColor.toString(true)).toBe('#f00');
    expect(myColor.setAlpha(0.5).toString()).toBe('rgba(255,0,0,0.5)');
    expect(myColor.toString(true)).toBe('#f00');
    done();
  });
});

describe('.setSaturation()', function () 
{
  it('sets the saturation value', function (done) 
  {
    expect(new Color(100, 50, 50).setSaturation(0).toString(true)).toBe('#4b4b4b');
    expect(new Color(100, 50, 50).setSaturation(1).toString(true)).toBe('#960000');
    done();
  });
});

describe('.increaseSaturate()', function () 
{
  it('increases the saturation by a percentage (1.0 = 100%)', function (done) 
  {
    const cornsilk = new Color('corn silk 3');
    expect(cornsilk.getSaturation()).toBe(0.2187500000000001);
    expect(cornsilk.toString(true)).toBe('#cdc8b1');
    expect(cornsilk.increaseSaturate(0.1).getSaturation()).toBe(0.3187500000000001);
    expect(cornsilk.increaseSaturate(0.1).toString(true)).toBe('#d3ccab');

    expect(new Color('red').increaseSaturate(0.1).toString(true)).toBe('#f00'); // already fully saturated
    done();
  });
});

describe('.decreaseSaturate()', function () 
{
  it('decreaseSaturate the saturation by a percentage (1.0 = 100%)', function (done) 
  {
    expect(new Color('#d3ccab').getSaturation()).toBe(0.31249999999999994); // not the same numbers as above due to hsl/rgb calculations
    expect(new Color('#d3ccab').decreaseSaturate(0.1).toString(true)).toBe('#cdc8b1');
    expect(new Color('#d3ccab').decreaseSaturate(0.1).getSaturation()).toBe(0.21249999999999994);
    expect(new Color('#888').decreaseSaturate(0.1).toString(true)).toBe('#888'); // already fully desaturated
    done();
  });
});

describe('.setHue', function () 
{
  it('sets the hue', function (done) 
  {
    expect(new Color('red').setHue(2 / 3).toString(true)).toBe('#00f');
    expect(new Color('blue').setHue(1 / 3).toString(true)).toBe('#0f0');
    expect(new Color('red').setHue(0.23).toString(true)).toBe('#9eff00');
    done();
  });
});

describe('.shiftHue()', function () 
{
  it('shifts the hue', function (done) 
  {
    expect(new Color(255, 255, 0).shiftHue(0.25).toString(true)).toBe('#00ff7f');
    expect(new Color(255, 0, 0).shiftHue(0.1).toString(true)).toBe('#f90');
    expect(new Color(255, 0, 0).shiftHue(1.1).toString(true)).toBe('#f90');
    expect(new Color(255, 0, 0).shiftHue(1).toString(true)).toBe('#f00');
    expect(new Color(255, 0, 0).shiftHue(-0.1).toString(true)).toBe('#f09');
    expect(new Color(255, 0, 0).shiftHue(-1.1).toString(true)).toBe('#f09');
    done();
  });
});

describe('.setLightness()', function () 
{
  it('sets the lightness value', function (done) 
  {
    expect(new Color('#cdc8b1').setLightness(0.5).toString(true)).toBe('#9b9164');
    done();
  });
});

describe('.increaseLightness()', function () 
{
  it('lightens', function (done) 
  {
    expect(new Color('red').increaseLightness(0.1).toString(true)).toBe('#f33');
    expect(new Color('blue').increaseLightness(0.1).toString(true)).toBe('#33f');
    done();
  });
});

describe('.decreaseLightness()', function () 
{
  it('darkens', function (done) 
  {
    expect(new Color('red').decreaseLightness(0.1).toString(true)).toBe('#c00');
    expect(new Color('tan').decreaseLightness(0.1).toString(true)).toBe('#c49c67');
    done();
  });
});

describe('set colors', function () 
{
  it('also is used by .red()', function (done) 
  {
    expect(new Color('black').setRed(255).getRGB()).toStrictEqual([255, 0, 0]);
    done();
  });

  it('also is used by .green()', function (done) 
  {
    expect(new Color('black').setGreen(255).getRGB()).toStrictEqual([0, 255, 0]);
    done();
  });

  it('also is used by .blue()', function (done) 
  {
    expect(new Color('black').setBlue(255).getRGB()).toStrictEqual([0, 0, 255]);
    done();
  });
});

describe('.combine', function () 
{
  it('combines colors', function (done) 
  {
    expect(new Color('black').combine(new Color('red'), 0.5).toString(true)).toBe('#800000');
    expect(new Color('black').combine('red', 0.5).toString(true)).toBe('#800000');
    expect(new Color('black').combine('red', 0.2).toString(true)).toBe('#300');
    expect(new Color('red').combine('#00f', 0.7).toString(true)).toBe('#4d00b3');
    expect(new Color('red').combine([0, 0, 255], 0.5).toString(true)).toBe('#800080');
    expect(new Color('red').combine([0, 0, 1], 0.5).toString(true)).toBe('#800001');
    expect(new Color(25, 135, 84).combine('black', 0.5).toString(true)).toBe('#0d442a');
    expect(new Color(25, 135, 84).combine('white', 0.25).toString(true)).toBe('#53a57f');
    done();
  });
  it('maintains alpha channel', function (done) 
  {
    expect(new Color('red').setAlpha(0.5).combine('black', 0.5).toString()).toBe('rgba(128,0,0,0.5)');
    done();
  });
});

describe('.tint', function () 
{
  it('tint colors', function (done) 
  {
    expect(new Color('red').tint('blue', 0.5).toString(true)).toBe('#0f0'); // green is half way between red and blue
    expect(new Color('red').tint('blue', 1).toString(true)).toBe('#00f');
    expect(new Color('red').tint('blue', 0).toString(true)).toBe('#f00');
    expect(new Color('rgb(0,0,100)').tint('rgb(100,0,0)', 0.1).toString(true)).toBe('#002864');
    done();
  });
  it('only adjusts the hue', function (done) 
  {
    expect(new Color('red').tint([0, 0, 255], 0.5).toString(true)).toBe('#0f0');
    expect(new Color('red').tint([0, 0, 1], 0.5).toString(true)).toBe('#0f0'); // same as above, because tint only adjusts the hue
    done();
  });
  it('maintains alpha channel', function (done) 
  {
    expect(new Color('rgba(255,0,0,0.5)').tint([0, 0, 255], 0.5).toString()).toBe('rgba(0,255,0,0.5)');
    done();
  });
});

describe('.invert', function () 
{
  it('inverts', function (done) 
  {
    expect(new Color('#f00').invert().toString(true)).toBe('#0ff');
    expect(new Color('white').invert().toString(true)).toBe('#000');
    done();
  });
});

describe('Getters', function () 
{
  it('.getRed()', function (done) 
  {
    expect(new Color('tan').getRed()).toBe(210);
    done();
  });

  it('.getGreen()', function (done) 
  {
    expect(new Color('tan').getGreen()).toBe(180);
    done();
  });

  it('.getBlue()', function (done) 
  {
    expect(new Color('tan').getBlue()).toBe(140);
    done();
  });

  it('.getAlpha()', function (done) 
  {
    expect(new Color('rgba(255,0,0,0.5)').getAlpha()).toBe(0.5);
    expect(new Color('rgb(255,0,0)').getAlpha()).toBe(1);
    done();
  });

  it('.getHSL()', function (done) 
  {
    expect(new Color('tan').getHSL()).toStrictEqual({
      h: 0.09523809523809527,
      s: 0.4374999999999999,
      l: 0.6862745098039216
    });
    done();
  });

  it('.getHue()', function (done) 
  {
    expect(new Color('red').getHue()).toBe(0);
    expect(new Color('yellow').getHue()).toBe(0.16666666666666666);
    expect(new Color('green').getHue()).toBe(0.3333333333333333);
    expect(new Color('cyan').getHue()).toBe(0.5);
    expect(new Color('blue').getHue()).toBe(0.6666666666666666);
    expect(new Color('magenta').getHue()).toBe(0.8333333333333334);
    expect(new Color([255, 0, 43]).getHue()).toBe(0.9718954248366013);
    done();
  });

  it('.getSaturation()', function (done) 
  {
    expect(new Color([128, 0, 0]).getSaturation()).toBe(1);
    expect(new Color([128, 128, 0]).getSaturation()).toBe(1);
    expect(new Color([255, 128, 128]).getSaturation()).toBe(1);
    expect(new Color([128, 128, 128]).getSaturation()).toBe(0);
    expect(new Color([96, 32, 32]).getSaturation()).toBe(0.5);
    done();
  });

  it('.getLightness()', function (done) 
  {
    expect(new Color('tan').getLightness()).toBe(0.6862745098039216);
    done();
  });

  it('.getHex()', function (done) 
  {
    expect(new Color('rgba(255,0,0,0.5)').getHex()).toBe('#f00');
    done();
  });

  it('.getRGB()', function (done) 
  {
    expect(new Color('rgb(255,0,0)').getRGB()).toStrictEqual([255, 0, 0]);
    expect(new Color('rgba(255,0,0,0.5)').getRGB()).toStrictEqual([255, 0, 0]);
    done();
  });
});

describe('Color.getNames', function () 
{
  it('returns the color names literal', function (done) 
  {
    expect(Color.getNames()['red']).toStrictEqual([255, 0, 0]);
    done();
  });
});

describe('Color.createMatchingColor', function () 
{
  it('returns matchingColor', function (done) 
  {
    // background-color: rgb(221, 238, 224); color: rgb(0, 51, 10); text-shadow: rgb(187, 221, 194) 1px 2px 5px;
    expect(new Color(221, 238, 224).createMatchingColor().text.toString()).toBe('rgb(0,51,9)');

    // background-color: rgb(110, 97, 152); color: rgb(235, 230, 255); text-shadow: rgb(23, 20, 31) 1px 2px 5px;
    expect(new Color(110, 97, 152).createMatchingColor().text.toString()).toBe('rgb(236,229,255)');
    done();
  });
});