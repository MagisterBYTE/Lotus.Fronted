/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/css';
import { IOption, TKey } from 'lotus-core';
import React from 'react';
import { Button, IGeneralElementProperties, ILabelProps, TButtonVariant } from 'ui/components';
import { RenderComponentHelper } from 'ui/helpers';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';
import { TCssWidth } from 'ui/types';

interface IButtonOptionBaseProps extends IGeneralElementProperties
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;
  
  disabled?: boolean;

  /**
   * Ширина
   */
  width?: TCssWidth;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps

  /**
   * Имеют ли опции иконки
   */
  hasIcons?: boolean;

  /**
   * Список опций
   */
  options: IOption[];

  /**
   * Использовать эффект масштабирования
   */
  hasScaleEffect?: boolean;

  /**
   * Использовать эффект тени
   */
  hasShadowEffect?: boolean;
}

interface IButtonOptionSingleProps<TValueOption extends TKey = TKey> extends IButtonOptionBaseProps
{
  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedValue Выбранное значение
   * @returns 
   */
  onSetSelectedValue?: (selectedValue: TValueOption | undefined) => void;

  /**
   * Изначально выбранное значение
   */
  initialSelectedValue?: TValueOption;

  onSetSelectedValues?: never;
  initialSelectedValues?: never;
}

interface IButtonOptionMultiProps<TValueOption extends TKey = TKey> extends IButtonOptionBaseProps
{
  /**
   * Функция обратного вызова для установки выбранных значений
   * @param selectedValues Выбранные значения или пустой массив
   * @returns 
   */
  onSetSelectedValues?: (selectedValues: TValueOption[]) => void;

  /**
   * Изначально выбранные значения
   */
  initialSelectedValues?: TValueOption[];

  onSetSelectedValue?: never;
  initialSelectedValue?: never;
}

export type IButtonOptionProps<TValueOption extends TKey = TKey> = IButtonOptionSingleProps<TValueOption> | IButtonOptionMultiProps<TValueOption>

export const ButtonOption = <TValueOption extends TKey = TKey>(props: IButtonOptionProps<TValueOption>) => 
{
  const {
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal',
    disabled, variant = 'filled', hasIcons, width, labelProps, options,
    onSetSelectedValue,
    initialSelectedValue,
    onSetSelectedValues,
    initialSelectedValues,
    hasScaleEffect, hasShadowEffect,
    ...propsReactSelect } = props;

  const buttonClassFirst = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: hasIcons ? 0 : 'normal',
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getTransitionColorsProps(),
      ...Theme.getBorderRadiusIndividualProps(size, borderRadius, true, false, true, false),
      ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, disabled, false),
      '&:hover':
          {
            ...InteractivityLogic.getEffectProps(variant, 'hover', props, false, disabled, false),
            ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
            ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.05) : {})
          },
      '&:active':
          {
            ...InteractivityLogic.getEffectProps(variant, 'pressed', props, false, disabled, false),
            ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
            ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(0.95) : {})
          },
      '&:disabled':
          {
            ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, true, false),
            ...Theme.getOpacityForDisabledProps()
          }
    })

  const buttonClassLast = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: hasIcons ? 0 : 'normal',
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getTransitionColorsProps(),
      ...Theme.getBorderRadiusIndividualProps(size, borderRadius, false, true, false, true),
      ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, disabled, false),
      '&:hover':
            {
              ...InteractivityLogic.getEffectProps(variant, 'hover', props, false, disabled, false),
              ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
              ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.05) : {})
            },
      '&:active':
            {
              ...InteractivityLogic.getEffectProps(variant, 'pressed', props, false, disabled, false),
              ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
              ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(0.95) : {})
            },
      '&:disabled':
            {
              ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, true, false),
              ...Theme.getOpacityForDisabledProps()
            }
    })

  const buttonClassMiddle = css(
    {
      cursor: 'pointer',
      display: 'inline-block',
      lineHeight: hasIcons ? 0 : 'normal',
      ...Theme.getFontProps(size, fontBold, fontAccent),
      ...Theme.getTextEffectProps(size, textEffect, textAlign),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'half'),
      ...Theme.getTransitionColorsProps(),
      ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, disabled, false),
      '&:hover':
        {
          ...InteractivityLogic.getEffectProps(variant, 'hover', props, false, disabled, false),
          ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {}),
          ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(1.05) : {})
        },
      '&:active':
        {
          ...InteractivityLogic.getEffectProps(variant, 'pressed', props, false, disabled, false),
          ...((!disabled && hasShadowEffect) ? Theme.getBorderShadowProps(6, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
          ...((!disabled && hasScaleEffect) ? Theme.getTransformScaleProps(0.95) : {})
        },
      '&:disabled':
        {
          ...InteractivityLogic.getEffectProps(variant, 'normal', props, false, true, false),
          ...Theme.getOpacityForDisabledProps()
        }
    })

  const getClassIndexByIndex = (index: number, length: number):string =>
  {
    if(index == 0) return buttonClassFirst;
    if(index == length - 1) return buttonClassLast;
    return buttonClassMiddle;
  }

  return <div style={
    {
      display: 'flex',
      flexDirection: 'row'
    }}>
    {options.map((option, index) =>
    {
      return <button className={getClassIndexByIndex(index, options.length)}>
        {RenderComponentHelper.renderOption(size, option)}
      </button>;
    })}
  </div>
};