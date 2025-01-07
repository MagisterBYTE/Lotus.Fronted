/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IOption, OptionHelper, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, MultiValue, MultiValueProps, OptionProps, Props, SingleValue, SingleValueProps, StylesConfig } from 'react-select';
import { IGeneralElementProperties, IGeneralIconProperties } from 'ui/components';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TypographyHelper } from 'ui/components/Display/Typography';
import { IInteractivityBackgroundEffect, InteractivityLogic } from 'ui/interactivity';
import { ThemeConstant, ThemeHelper } from 'ui/theme';
import { TCssWidth } from 'ui/types';
import { RenderComponentHelper } from 'ui/helpers';
import { SelectOptionHelper } from './SelectOptionHelper';

interface ISelectOptionBaseProps<IsMulti extends boolean = boolean> extends Props<IOption, IsMulti>,
  Omit<IGeneralElementProperties, 'extraClass'>, Omit<IGeneralIconProperties, 'icon'>, IInteractivityBackgroundEffect
{
  /**
   * Фон поля
   */
  isBackground?: boolean;

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

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

interface ISelectOptionSingleProps<TValueOption extends TKey = TKey> extends ISelectOptionBaseProps<false>
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

interface ISelectOptionMultiProps<TValueOption extends TKey = TKey> extends ISelectOptionBaseProps<true>
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

export type ISelectOptionProps<TValueOption extends TKey = TKey> = ISelectOptionSingleProps<TValueOption> | ISelectOptionMultiProps<TValueOption>

export const SelectOption = <TValueOption extends TKey = TKey>(props: ISelectOptionProps<TValueOption>) => 
{
  const {
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal',
    isBackground = false, width, labelProps, options, rightElement,
    iconColor, iconStyle, iconPlacement = 'left', imageDatabase,
    hasRippleEffect, hasScaleEffect, hasShadowBorderEffect, hasShadowBoxEffect,
    onSelectedOption, initialSelectedValue, onSelectedOptions, initialSelectedValues,
    ...propsReactSelect } = props;

  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(OptionHelper.getOptionsByValues(options, initialSelectedValue ?? initialSelectedValues));

  const handleSelect = (newValue: SingleValue<IOption> | MultiValue<IOption>, actionMeta: ActionMeta<IOption>) => 
  {
    if(props.isMulti)
    {
      const multiValue = newValue as MultiValue<IOption>;
      if(multiValue && multiValue.length > 0)
      {
        // @ts-expect-error multiValue
        setSelectedOptions(multiValue);

        // @ts-expect-error multiValue
        if(onSelectedOptions) onSelectedOptions(multiValue);
      }
      else
      {
        setSelectedOptions([]);
        if(onSelectedOptions) onSelectedOptions([]);
      }
    }
    else
    {
      const singleValue = newValue as SingleValue<IOption>;
      if(singleValue)
      {
        setSelectedOptions([singleValue]);
        if(onSelectedOption) onSelectedOption(singleValue);
      }
      else
      {
        setSelectedOptions([]);
        if(onSelectedOption) onSelectedOption(undefined);
      }
    }
  };

  const hasIcons = (options.filter((x => x.icon != undefined)).length > 0);

  const selectOptionStyles: StylesConfig<IOption> = {
    container: (base) => ({
      ...base,
      width: width,
      minHeight: `${ThemeHelper.convertControlSizeToHeightPixel(size, paddingControl, 'half', 1.2)}px`
    }),
    control: (styles, state) =>
      ({
        ...styles,
        minHeight: `${ThemeHelper.convertControlSizeToHeightPixel(size, paddingControl, 'half', 1.2)}px`,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 0,
        boxShadow: 'none',
        ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
        ...ThemeHelper.getTransitionColorsProps(),
        ...InteractivityLogic.getEffectProps('input', 'normal', props, false, props.isDisabled, false),
        ...((!propsReactSelect.isDisabled && state.menuIsOpen) ? ThemeHelper.getBorderShadowProps(4, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((propsReactSelect.isDisabled) ? ThemeHelper.getOpacityForDisabledProps() : {}),
        ':hover':
      {
        ...InteractivityLogic.getEffectProps('input', 'hover', props, false, state.isDisabled, state.isFocused),
        ...((!propsReactSelect.isDisabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(4, backColor, undefined, ThemeConstant.OpacityForBorderShadowHover) : {}),
        ...((!propsReactSelect.isDisabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(4, backColor, undefined) : {}),
        ...((!propsReactSelect.isDisabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(1.05) : {})
      },
        ':focus':
      {
        ...((!propsReactSelect.isDisabled && hasShadowBorderEffect) ? ThemeHelper.getBorderShadowProps(6, backColor, undefined, ThemeConstant.OpacityForBorderShadowActive) : {}),
        ...((!propsReactSelect.isDisabled && hasShadowBoxEffect) ? ThemeHelper.getBoxShadowProps(8, backColor, undefined) : {}),
        ...((!propsReactSelect.isDisabled && hasScaleEffect) ? ThemeHelper.getTransformScaleProps(0.95) : {})
      },
        ':disabled':
      {
        ...ThemeHelper.getOpacityForDisabledProps()
      }
      }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    valueContainer: (base) => ({
      ...base,
      zIndex: 0,
      padding: 0,
      ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
      paddingTop: 0,
      paddingBottom: 0,
      columnGap: props.isMulti ? `${ThemeHelper.getColumnGapFromSizeInRem(size, paddingControl)}rem` : base.columnGap
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    input: (base) => (
      {
        ...base,
        marginLeft: `${SelectOptionHelper.getMarginOffsetInput(size, Boolean(props.isMulti), hasIcons, selectedOptions)}px`,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        ...ThemeHelper.getPaddingProps(size, paddingControl, ((size == 'large') ? 'half' : 'normal'), 'half')
      }
    ),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => 
    {
      return {
        ...styles,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
        ...ThemeHelper.getTransitionColorsProps(),
        ... (hasIcons ? ThemeHelper.getFlexRowContainer(size, paddingControl) : {}),
        ...InteractivityLogic.getEffectProps('list', 'normal', props, isSelected, isDisabled, isFocused),
        ':hover':
        {
          ...styles[':hover'],
          ...InteractivityLogic.getEffectProps('list', 'hover', props, isSelected, isDisabled, isFocused)
        },
        ':active':
        {
          ...styles[':active'],
          ...InteractivityLogic.getEffectProps('list', 'pressed', props, isSelected, isDisabled, isFocused)
        },
        ':disabled':
        {
          ...styles[':disabled'],
          ...InteractivityLogic.getEffectProps('list', 'normal', props, isSelected, isDisabled, isFocused),
          ...ThemeHelper.getOpacityForDisabledProps()
        }
      };
    },

    singleValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        marginLeft: hasIcons ? `${SelectOptionHelper.getMarginOffsetSingleValue(size, data)}px` : '2px',
        ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getTransitionColorsProps(),
        ... (hasIcons ? ThemeHelper.getFlexRowContainer(size, paddingControl) : {})
      };
    },

    multiValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        fontSize: '100%',
        backgroundColor: ThemeHelper.getBackgroundColorProps(backColor, 'palest').backgroundColor,
        ...ThemeHelper.getFontProps(size, fontBold, fontAccent),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getBorderRadiusProps(size, borderRadius),
        ...ThemeHelper.getBorderStyleProps(size, borderStyle, borderWidth, borderColor),
        ...ThemeHelper.getTransitionColorsProps()
      };
    },

    multiValueRemove: (styles) =>
    {
      return {
        ...styles,
        ':hover':
        {
          backgroundColor: ThemeHelper.getBackgroundColorProps(backColor, 'dark').backgroundColor
        }
      };
    },

    multiValueLabel: (styles) =>
    {
      return {
        ...styles,
        fontSize: '95%',
        padding: 0,
        paddingLeft: hasIcons ? '2px' : styles.paddingLeft,
        ... (hasIcons ? ThemeHelper.getFlexRowContainer(size, paddingControl) : {})
      };
    }
  };

  const { Option, SingleValue, MultiValue } = components;

  const renderOption = (props: OptionProps<IOption>) => 
  {
    if (props.data.icon)
    {
      return <Option {...props}>
        {RenderComponentHelper.renderIconAndValue(size, props.data.icon, props.data.text, iconStyle, iconColor, imageDatabase)}
      </Option>
    }
    else
    {
      return (<Option {...props}>
        {props.data.text}
      </Option>)
    }
  }

  const renderSingleValue = (props: SingleValueProps<IOption>) =>
  {
    if (props.data.icon)
    {
      const iconStyleMarginLeft = (typeof props.data.icon === 'string') ? undefined : { marginLeft: '-10x' };

      return <SingleValue {...props}>
        {RenderComponentHelper.renderIconAndValue(size, props.data.icon, props.data.text, iconStyle ?? iconStyleMarginLeft, iconColor, imageDatabase)}
      </SingleValue>
    }
    else
    {
      return (<SingleValue {...props}>
        {props.data.text}
      </SingleValue>)
    }
  }

  const renderMultiValue = (props: MultiValueProps<IOption>) =>
  {
    if (props.data.icon)
    {
      const iconStyleMarginLeft = (typeof props.data.icon === 'string') ? { marginLeft: '1x' } : undefined;
      return <MultiValue {...props}>
        {RenderComponentHelper.renderIconAndValue(size, props.data.icon, props.data.text, iconStyle ?? iconStyleMarginLeft, iconColor, imageDatabase)}
      </MultiValue>
    }
    else
    {
      return (<MultiValue {...props}>
        {props.data.text}
      </MultiValue>)
    }
  }

  const renderReactSelect = () =>
  {
    // @ts-expect-error IsMulti
    return <ReactSelect
      {...propsReactSelect}
      options={options}
      value={selectedOptions}
      styles={selectOptionStyles}
      classNamePrefix='react-select'
      getOptionLabel={(selectOption) => selectOption.text}
      getOptionValue={(selectOption) => selectOption.value}
      onChange={handleSelect}
      components={{ Option: renderOption, SingleValue: renderSingleValue, MultiValue: renderMultiValue }} />
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={size} 
      variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      {
        renderReactSelect()
      }
    </Label>
  }
  else
  {
    return renderReactSelect();
  }
}