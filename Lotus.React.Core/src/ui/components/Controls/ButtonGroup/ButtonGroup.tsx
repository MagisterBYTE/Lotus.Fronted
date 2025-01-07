/* eslint-disable @typescript-eslint/no-unused-vars */
import { IOption, OptionHelper, TKey } from 'lotus-core';
import { CSSProperties, useState } from 'react';
import { Button, IGeneralIconProperties, ILabelProps, Label, TButtonVariant, TypographyHelper } from 'ui/components';
import { IInteractivityBackgroundEffect, IInteractivityElement } from 'ui/interactivity';
import { ThemeHelper } from 'ui/theme';
import { TCssWidth } from 'ui/types';

interface IButtonGroupBaseProps extends Omit<IGeneralIconProperties, 'icon'>, IInteractivityElement, IInteractivityBackgroundEffect
{
  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;

  /**
   * Статус доступности
   */
  isDisabled?: boolean;

  /**
   * Ширина
   */
  width?: TCssWidth;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps

  /**
   * Список опций
   */
  options: IOption[];
}

interface IButtonGroupSingleProps<TValueOption extends TKey = TKey> extends IButtonGroupBaseProps
{
  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedOption Выбранная опция
   * @returns 
   */
  onSelectedOption?: (selectedOption?: IOption) => void;

  /**
   * Изначально выбранное значение
   */
  initialSelectedValue?: TValueOption;

  onSelectedOptions?: never;
  initialSelectedValues?: never;
}

interface IButtonGroupMultiProps<TValueOption extends TKey = TKey> extends IButtonGroupBaseProps
{
  /**
   * Функция обратного вызова для установки выбранных значений
   * @param selectedOptions Выбранные опции или пустой массив
   * @returns 
   */
  onSelectedOptions?: (selectedOptions: IOption[]) => void;

  /**
   * Изначально выбранные значения
   */
  initialSelectedValues?: TValueOption[];

  onSelectedOption?: never;
  initialSelectedValue?: never;
}

export type IButtonGroupProps<TValueOption extends TKey = TKey> = IButtonGroupSingleProps<TValueOption> | IButtonGroupMultiProps<TValueOption>

export const ButtonGroup = <TValueOption extends TKey = TKey>(props: IButtonGroupProps<TValueOption>) => 
{
  const {
    variant = 'filled', isDisabled, width, labelProps, options,
    onSelectedOption, initialSelectedValue, onSelectedOptions, initialSelectedValues,
    ...propsButton
  } = props;

  const cssPropertiesFirst: CSSProperties =
  {
    ...ThemeHelper.getBorderRadiusIndividualProps(props.size,
      props.borderRadius, true, false, true, false)
  }

  const cssPropertiesLast: CSSProperties =
  {
    ...ThemeHelper.getBorderRadiusIndividualProps(props.size,
      props.borderRadius, false, true, false, true)
  }

  const cssPropertiesMiddle: CSSProperties =
  {
    borderRadius: undefined,
    borderLeftStyle: undefined,
    borderLeftWidth: undefined,
    borderRightStyle: undefined,
    borderRightWidth: undefined
  }

  const getButtonStyleByIndex = (index: number, length: number): CSSProperties =>
  {
    if (index == 0) return cssPropertiesFirst;
    if (index == length - 1) return cssPropertiesLast;
    return cssPropertiesMiddle;
  }

  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(OptionHelper.getOptionsByValues(options, initialSelectedValue ?? initialSelectedValues));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleButtonSelect = (selected: boolean, value?: any) =>
  {
    const correctValue = OptionHelper.convertValue(options, value);
    if (onSelectedOption)
    {
      if (selected)
      {
        const option = OptionHelper.getOptionByValue(options, correctValue);
        onSelectedOption(option);
        setSelectedOptions([option]);
      }
      else
      {
        const newSelectedOptions = selectedOptions.filter((x) => x.value !== correctValue);
        setSelectedOptions(newSelectedOptions);
      }
    }
    if (onSelectedOptions)
    {
      if (selected)
      {
        const option = OptionHelper.getOptionByValue(options, correctValue);
        const newSelectedOptions = [...selectedOptions, option];
        onSelectedOptions(newSelectedOptions);
        setSelectedOptions(newSelectedOptions);
      }
      else
      {
        const newSelectedOptions = selectedOptions.filter((x) => x.value !== correctValue);
        onSelectedOptions(newSelectedOptions);
        setSelectedOptions(newSelectedOptions);
      }
    }
  }

  const renderButtonGroup = () =>
  {
    return <div style={
      {
        display: 'flex',
        flexDirection: 'row'
      }}>
      {options.map((option, index) =>
      {
        return <Button
          key={index}
          {...propsButton}
          isSelected={OptionHelper.hasOption(selectedOptions, option.value)}
          value={option.value}
          onSelected={handleButtonSelect}
          disabled={isDisabled}
          variant={variant}
          isSelectedStatus={true}
          overrideButtonStyle={getButtonStyleByIndex(index, options.length)}
          icon={option.icon}
          children={option.text}
        />
      })}
    </div>
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={props.size}
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(props.size)}
      textColor={labelProps.textColor ?? props.textColor}>
      {renderButtonGroup()}
    </Label>
  }
  else
  {
    return renderButtonGroup()
  }
};