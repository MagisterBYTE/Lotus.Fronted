import { NumberHelper } from 'lotus-core';

/**
 * Визуальный эффект применяемый при интерактивном взаимодействии с элементом UI
 */
export enum TInteractivityEffect
{
  /**
   * Изменение цвета
   */
  Color = 1,

  /**
   * Изменение масштаба
   */
  Scale = 2,

  /**
   * Изменение тени
   */
  Shadow = 4,
}

export class InteractivityEffectHelper
{
  public static getEffect(hasColor?:boolean, hasScale?:boolean, hasShadow?:boolean):TInteractivityEffect
  {
    let effect:number = 0;

    if(hasColor)
    {
      effect = NumberHelper.setFlag(effect, TInteractivityEffect.Color)
    }

    if(hasScale)
    {
      effect = NumberHelper.setFlag(effect, TInteractivityEffect.Scale)
    }

    if(hasShadow)
    {
      effect = NumberHelper.setFlag(effect, TInteractivityEffect.Shadow)
    }

    console.log('effect', effect);

    if(effect == 0) return TInteractivityEffect.Color;

    return effect as TInteractivityEffect;
  }
}