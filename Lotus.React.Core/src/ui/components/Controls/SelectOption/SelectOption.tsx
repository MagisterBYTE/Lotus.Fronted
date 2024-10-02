/* eslint-disable @typescript-eslint/no-unused-vars */
import { IOption, OptionHelper, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, MultiValue, MultiValueProps, OptionProps, Props, SingleValue, SingleValueProps, StylesConfig } from 'react-select';
import { IGeneralElementProperties } from 'ui/components';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TypographyHelper } from 'ui/components/Display/Typography';
import { InteractivityLogic } from 'ui/interactivity';
import { Theme } from 'ui/theme';
import { TCssWidth } from 'ui/types';
import { RenderComponentHelper } from 'ui/helpers';
import { SelectOptionHelper } from './SelectOptionHelper';

interface ISelectOptionBaseProps<IsMulti extends boolean = false, TValueOption extends TKey = TKey> extends Props<IOption, IsMulti>, 
  Omit<IGeneralElementProperties, 'extraClass'>
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
   * Имеют ли опции иконки
   */
  hasIcons?: boolean;

  /**
   * Список опций
   */
  options: IOption[];

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

interface ISelectOptionSingleProps<TValueOption extends TKey = TKey> extends ISelectOptionBaseProps<false, TValueOption>
{
  /**
   * Функция обратного вызова для установки выбранного значения
   * @param selectedValue Выбранное значение
   * @returns 
   */
  onSetSelectedValue?: (selectedValue: TValueOption|undefined) => void;

  /**
   * Изначально выбранное значение
   */
  initialSelectedValue?: TValueOption;

  onSetSelectedValues?: never;
  initialSelectedValues?: never;
}

interface ISelectOptionMultiProps<TValueOption extends TKey = TKey> extends ISelectOptionBaseProps<true, TValueOption>
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

export type ISelectOptionProps<TValueOption extends TKey = TKey> = ISelectOptionSingleProps<TValueOption> | ISelectOptionMultiProps<TValueOption>

export const SelectOption = <TValueOption extends TKey = TKey>(props:ISelectOptionProps<TValueOption>) => 
{
  const  { 
    fontBold, fontAccent, textEffect, textAlign, textColorHarmonious, textColor,
    backColor, backImage,
    borderRadius, borderStyle, borderWidth, borderColor,
    size = 'medium', paddingControl = 'normal',
    isBackground = false, width, labelProps, hasIcons = false, options, rightElement,
    onSetSelectedValue,
    initialSelectedValue,
    onSetSelectedValues,
    initialSelectedValues,
    ...propsReactSelect } = props;

  const [selectedOption, setSelectedOption] = useState<IOption | undefined>(options.find(x => x.value === initialSelectedValue));
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(OptionHelper.getOptionsByValues(options, initialSelectedValues));

  const handleSelect = (newValue: SingleValue<IOption>, _actionMeta: ActionMeta<IOption>) => 
  {
    if(newValue)
    {
      setSelectedOption(newValue);
      if (onSetSelectedValue)
      {
        onSetSelectedValue(newValue.value);
      }
    }
    else
    {
      setSelectedOption(undefined);
      if (onSetSelectedValue)
      {
        onSetSelectedValue(undefined);
      }
    }
  };

  const handleMultiSelect = (newValue: MultiValue<IOption>, _actionMeta: ActionMeta<IOption>) => 
  {
    if(newValue)
    {
      const values = newValue.map(x => x.value);
      setSelectedOptions(Array.from(newValue));
      if (onSetSelectedValues)
      {
        onSetSelectedValues(values);
      }
    }
    else
    {
      setSelectedOptions([]);
      if (onSetSelectedValues)
      {
        onSetSelectedValues([]);
      }
    }
  };

  const selectOptionStyles: StylesConfig<IOption> = {
    container: (base) => ({
      ...base,
      width: width,
      minHeight: `${Theme.convertControlSizeToHeightPixel(size, paddingControl, 'half', 1.2)}px`
    }),
    control: (styles, state) =>
      ({
        ...styles,
        minHeight: `${Theme.convertControlSizeToHeightPixel(size, paddingControl, 'half', 1.2)}px`,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 0,
        boxShadow: 'none',
        ...Theme.getFontProps(size, fontBold, fontAccent),
        ...Theme.getTextEffectProps(size, textEffect, textAlign),
        ...Theme.getBorderRadiusProps(size, borderRadius),
        ...Theme.getTransitionColorsProps(),
        ...InteractivityLogic.getEffectProps('input', 'normal', props, false, false, false),
        ...((!propsReactSelect.isDisabled && state.menuIsOpen) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowActive) : {}),
        ...((propsReactSelect.isDisabled) ? Theme.getOpacityForDisabledProps() : {}),
        ':hover':
        {
          ...InteractivityLogic.getEffectProps('input', 'hover', props, false, state.isDisabled, state.isFocused),
          ...((!propsReactSelect.isDisabled) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowHover) : {})
        },
        ':focus':
        {
          ...((!propsReactSelect.isDisabled) ? Theme.getBorderShadowProps(4, backColor, undefined, Theme.OpacityForBorderShadowActive) : {})
        },
        ':disabled':
        {
          ...Theme.getOpacityForDisabledProps()
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
      ...Theme.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
      paddingTop: 0,
      paddingBottom: 0,
      columnGap: props.isMulti ? `${SelectOptionHelper.getGapFromSize(size, paddingControl)}rem` : base.columnGap
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    input: (base) => (
      {
        ...base,    
        marginLeft: `${SelectOptionHelper.getMarginOffsetInput(size, props.isMulti, hasIcons, props.isMulti ? selectedOptions : selectedOption)}px`,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        ...Theme.getPaddingProps(size, paddingControl, ((size == 'large') ? 'half' : 'normal'), 'half')
      }
    ),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => 
    {
      return {
        ...styles,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ...Theme.getFontProps(size, fontBold, fontAccent),
        ...Theme.getTextEffectProps(size, textEffect, textAlign),
        ...Theme.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
        ...Theme.getTransitionColorsProps(),
        ... (hasIcons ? SelectOptionHelper.getFlexContainer(size, paddingControl) : {}),
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
          ...Theme.getOpacityForDisabledProps()
        }
      };
    },

    singleValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        marginLeft: hasIcons ? `${SelectOptionHelper.getMarginOffsetSingleValue(size, data)}px` : '2px',
        ...Theme.getFontProps(size, fontBold, fontAccent),
        ...Theme.getTextEffectProps(size, textEffect, textAlign),
        ...Theme.getTransitionColorsProps(),
        ... (hasIcons ? SelectOptionHelper.getFlexContainer(size, paddingControl) : {})
      };
    },

    multiValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        fontSize: '100%',
        backgroundColor: Theme.getBackgroundColorProps(backColor, 'palest').backgroundColor,
        ...Theme.getFontProps(size, fontBold, fontAccent),
        ...Theme.getTextEffectProps(size, textEffect, textAlign),
        ...Theme.getBorderRadiusProps(size, borderRadius), 
        ...Theme.getBorderStyleProps(size, borderStyle, borderWidth, borderColor), 
        ...Theme.getTransitionColorsProps()
      };
    },
  
    multiValueRemove: (styles) =>
    {
      return {
        ...styles,
        ':hover':
          {
            backgroundColor: Theme.getBackgroundColorProps(backColor, 'dark').backgroundColor
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
        ... (hasIcons ? SelectOptionHelper.getFlexContainer(size, paddingControl) : {})
      };
    }
  };

  const { Option, SingleValue, MultiValue } = components;
  
  const RenderOption = (props: OptionProps<IOption>) => 
  {
    if (props.data.icon)
    {
      return <Option {...props}>
        {RenderComponentHelper.renderIcon(size, props.data.icon, props.data.text)}
      </Option>
    }
    else
    {
      return (<Option {...props}>
        {props.data.text}
      </Option>)
    }
  }

  const RenderSingleValue = (props: SingleValueProps<IOption>) =>
  {
    if (props.data.icon)
    {
      const styleMarginLeft = (typeof props.data.icon === 'string') ? undefined : { marginLeft: '-10x' };

      return <SingleValue {...props}>
        {RenderComponentHelper.renderIcon(size, props.data.icon, props.data.text, styleMarginLeft)}
      </SingleValue> 
    }
    else
    {
      return (<SingleValue {...props}>
        {props.data.text}
      </SingleValue>)
    }
  }

  const RenderMultiValue = (props: MultiValueProps<IOption>) =>
  {
    if (props.data.icon)
    {
      const styleMarginLeft = (typeof props.data.icon === 'string') ? { marginLeft: '1x' } : undefined;
      return <MultiValue {...props}>
        {RenderComponentHelper.renderIcon(size, props.data.icon, props.data.text, styleMarginLeft)}
      </MultiValue>
    }
    else
    {
      return (<MultiValue {...props}>
        {props.data.text}
      </MultiValue>)
    }
  }

  const RenderReactSelect = () =>
  {
    return <ReactSelect
      {...propsReactSelect}
      options={options}
      value={selectedOption}
      styles={selectOptionStyles}
      classNamePrefix='react-select'
      getOptionLabel={(selectOption) => selectOption.text}
      getOptionValue={(selectOption) => selectOption.value}
      // @ts-expect-error onChange
      onChange={props.isMulti ? handleMultiSelect : handleSelect}
      components={{ Option: RenderOption, SingleValue: RenderSingleValue, MultiValue:RenderMultiValue }} />
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
      textColor={labelProps.textColor ?? textColor}>
      {
        RenderReactSelect()
      }
    </Label>
  }
  else
  {
    return RenderReactSelect();
  }
}