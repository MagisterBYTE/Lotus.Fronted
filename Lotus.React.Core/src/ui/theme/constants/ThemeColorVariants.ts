import { Color, ColorVariants } from 'lotus-core';

/**
 * Наборы типовых вариантов цвета
 */
export class ThemeColorVariants
{
  public static readonly AntPrimary:ColorVariants = new ColorVariants(
    new Color(230, 247, 255), // white
    new Color(186, 234, 255), // palest
    new Color(145, 213, 255), // pale
    new Color(105, 192, 255), // lighter
    new Color(24, 144, 255), // light
    new Color(64, 169, 255), // main
    new Color(9, 109, 217), // dark
    new Color(0, 80, 179), // darker
    new Color(0, 58, 140), // darkest
    new Color(0, 39, 102)  // black
  );

  public static readonly MuiBlue:ColorVariants = new ColorVariants(
    new Color('#e3f2fd'), // white
    new Color('#bbdefb'), // palest
    new Color('#90caf9'), // pale
    new Color('#64b5f6'), // lighter
    new Color('#42a5f5'), // light
    new Color('#2196f3'), // main
    new Color('#1e88e5'), // dark
    new Color('#1976d2'), // darker
    new Color('#1565c0'), // darkest
    new Color('#0d47a1')  // black
  );

  public static readonly MuiBlueGrey:ColorVariants = new ColorVariants(
    new Color('#eceff1'), // white
    new Color('#cfd8dc'), // palest
    new Color('#b0bec5'), // pale
    new Color('#90a4ae'), // lighter
    new Color('#78909c'), // light
    new Color('#607d8b'), // main
    new Color('#546e7a'), // dark
    new Color('#455a64'), // darker
    new Color('#37474f'), // darkest
    new Color('#263238')  // black
  );
  
  public static readonly MuiIndigo:ColorVariants = new ColorVariants(
    new Color('#e8eaf6'), // white
    new Color('#c5cae9'), // palest
    new Color('#9fa8da'), // pale
    new Color('#7986cb'), // lighter
    new Color('#5c6bc0'), // light
    new Color('#3f51b5'), // main
    new Color('#3949ab'), // dark
    new Color('#303f9f'), // darker
    new Color('#283593'), // darkest
    new Color('#1a237e')  // black
  );

  public static readonly MuiGreen:ColorVariants = new ColorVariants(
    new Color('#e8f5e9'), // white
    new Color('#c8e6c9'), // palest
    new Color('#a5d6a7'), // pale
    new Color('#81c784'), // lighter
    new Color('#66bb6a'), // light
    new Color('#4caf50'), // main
    new Color('#43a047'), // dark
    new Color('#388e3c'), // darker
    new Color('#2e7d32'), // darkest
    new Color('#1b5e20')  // black
  );

  public static readonly MuiTeal:ColorVariants = new ColorVariants(
    new Color('#e0f2f1'), // white
    new Color('#b2dfdb'), // palest
    new Color('#80cbc4'), // pale
    new Color('#4db6ac'), // lighter
    new Color('#26a69a'), // light
    new Color('#009688'), // main
    new Color('#00897b'), // dark
    new Color('#00796b'), // darker
    new Color('#00695c'), // darkest
    new Color('#004d40')  // black
  );

  public static readonly MuiYellow:ColorVariants = new ColorVariants(
    new Color('#fffde7'), // white
    new Color('#fff9c4'), // palest
    new Color('#fff59d'), // pale
    new Color('#fff176'), // lighter
    new Color('#ffee58'), // light
    new Color('#ffeb3b'), // main
    new Color('#fdd835'), // dark
    new Color('#fbc02d'), // darker
    new Color('#f9a825'), // darkest
    new Color('#f57f17')  // black
  );

  public static readonly MuiAmber:ColorVariants = new ColorVariants(
    new Color('#fff8e1'), // white
    new Color('#ffecb3'), // palest
    new Color('#ffe082'), // pale
    new Color('#ffd54f'), // lighter
    new Color('#ffca28'), // light
    new Color('#ffc107'), // main
    new Color('#ffb300'), // dark
    new Color('#ffa000'), // darker
    new Color('#ff8f00'), // darkest
    new Color('#ff6f00')  // black
  );

  public static readonly MuiRed:ColorVariants = new ColorVariants(
    new Color('#ffebee'), // white
    new Color('#ffcdd2'), // palest
    new Color('#ef9a9a'), // pale
    new Color('#e57373'), // lighter
    new Color('#ef5350'), // light
    new Color('#f44336'), // main
    new Color('#e53935'), // dark
    new Color('#d32f2f'), // darker
    new Color('#c62828'), // darkest
    new Color('#b71c1c')  // black
  );

  public static readonly MuiBrown:ColorVariants = new ColorVariants(
    new Color('#efebe9'), // white
    new Color('#d7ccc8'), // palest
    new Color('#bcaaa4'), // pale
    new Color('#a1887f'), // lighter
    new Color('#8d6e63'), // light
    new Color('#795548'), // main
    new Color('#6d4c41'), // dark
    new Color('#5d4037'), // darker
    new Color('#4e342e'), // darkest
    new Color('#3e2723')  // black
  );

  public static readonly MuiGray:ColorVariants = new ColorVariants(
    new Color('#fafafa'), // white
    new Color('#f5f5f5'), // palest
    new Color('#eeeeee'), // pale
    new Color('#e0e0e0'), // lighter
    new Color('#bdbdbd'), // light
    new Color('#9e9e9e'), // main
    new Color('#757575'), // dark
    new Color('#616161'), // darker
    new Color('#424242'), // darkest
    new Color('#212121')  // black
  );
}