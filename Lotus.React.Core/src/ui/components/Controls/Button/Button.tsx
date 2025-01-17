/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from '@emotion/css';
import { useRippleEffect } from 'hooks/useRippleEffect';
import React, { ComponentPropsWithRef, CSSProperties, useEffect, useState } from 'react';
import { IGeneralIconProperties, TButtonVariant } from 'ui/components';
import { CssPropertiesBuilder, CssPropertiesHelper, RenderComponentHelper } from 'ui/helpers';
import { IInteractivityBackgroundEffect, IInteractivityElement } from 'ui/interactivity';
import { ThemeConstant, ThemeHelper } from 'ui/theme';

export interface IButtonProps extends ComponentPropsWithRef<'button'>, IGeneralIconProperties, IInteractivityElement, IInteractivityBackgroundEffect
{
  /**
   * Стиль для кнопки
   */
  overrideButtonStyle?: CSSProperties;

  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;

  /**
   * Статус возможности выбора
   */
  isSelectedStatus?: boolean;

  /**
   * Статус выбора
   */
  isSelected?: boolean;

  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selected Статус выбора
   * @param value Выбранное значение
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelected?: (selected: boolean, value?: any) => void;
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) =>
{
  const
    {
      fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor, hoverTextColor, pressedTextColor,
      backColor, backImage, hoverBackColor, pressedBackColor,
      borderRadius, borderStyle, borderWidth, borderColor, hoverBorderColor, pressedBorderColor,
      size = 'medium', paddingControl = 'normal', extraClass,
      overrideButtonStyle, variant = 'filled', isSelectedStatus, isSelected, onSelected,
      icon, iconColor, iconStyle, iconPlacement = 'left', imageDatabase,
      hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect,
      ...propsButton
    } = props

  const [selectedButton, setSelectedButton] = useState<boolean | undefined>(isSelected)

  const cssProperties = CssPropertiesBuilder.buildInteractivityElement(variant, props, { isSelected: selectedButton });

  if(overrideButtonStyle)
  {
    CssPropertiesHelper.overrideStyle(cssProperties, overrideButtonStyle);
  }

  const buttonClass = css({ ...cssProperties })

  const rippleColor = ThemeHelper.getRippleColor(backColor, (variant == 'text' || variant == 'icon'));
  const [ripple, event] = useRippleEffect({ duration: ThemeConstant.TransitionSpeed * 2, color: rippleColor, disabled: props.disabled });

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
  {
    setSelectedButton(!selectedButton);

    if (onSelected) onSelected(!selectedButton, event.currentTarget.value);

    if (props.onClick) props.onClick(event);
  }

  useEffect(()=>
  {
    setSelectedButton(isSelected);
  }, [isSelected])

  if (icon)
  {
    return (<button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
      onClick={isSelectedStatus ? handleSelect : props.onClick}
      onPointerDown={event}>
      {RenderComponentHelper.renderIconAndValue(size, icon, propsButton.children, iconStyle, iconColor, imageDatabase, true, 
        ThemeHelper.getFlexContainerByIcon(size, paddingControl, iconPlacement))}
    </button>);
  }
  else
  {
    return (
      <button {...propsButton} ref={hasRippleEffect ? ripple : props.ref} className={cx(buttonClass, extraClass)}
        onClick={isSelectedStatus ? handleSelect : props.onClick}
        onPointerDown={event}>
        {propsButton.children}
      </button>);
  }
};
