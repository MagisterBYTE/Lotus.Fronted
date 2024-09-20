/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISelectOption, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, OptionProps, Props, SingleValue, SingleValueProps, StylesConfig } from 'react-select';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TCssWidth } from 'ui/types';
import { ThemeHelper } from 'ui/theme';
import { IconContext } from 'react-icons';
import { TypographyHelper } from 'ui/components/Display/Typography';
import { IGeneralPropertiesElement, IGeneralPropertiesText } from 'ui/components';
import { SelectHelper } from './SelectHelper';
import { InteractivityLogic } from 'ui/interactivity';

export interface ISelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, false>, IGeneralPropertiesElement, IGeneralPropertiesText
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
  options: ISelectOption[];

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

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const Select = <TValueOption extends TKey = TKey>(props:ISelectProps<TValueOption>) => 
{
  const  { borderRounded, borderStyle, color = 'primary', size = 'medium', paddingControl = 'normal', extraClass,
    fontBold, textAlign, textEffect,
    isBackground = false,
    width,
    labelProps,
    hasIcons = false,
    options,
    onSetSelectedValue,
    initialSelectedValue,
    rightElement,
    ...propsReactSelect } = props;

  const [selectedOption, setSelectedOption] = useState<ISelectOption | undefined>(options.find(x => x.value === initialSelectedValue));

  const handleSelect = (newValue: SingleValue<ISelectOption>, _actionMeta: ActionMeta<ISelectOption>) => 
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

  const selectOptionStyles: StylesConfig<ISelectOption> = {
    container: (base) => ({
      ...base,
      width: width,
      minHeight: `${ThemeHelper.convertControlSizeToHeightPixel(size, paddingControl, 'half')}px`
    }),
    control: (styles, state) =>
      ({
        ...styles,
        minHeight: `${ThemeHelper.convertControlSizeToHeightPixel(size, paddingControl, 'half')}px`,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 0,
        ...ThemeHelper.getFontProps(size, fontBold),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getBorderProps(size, borderRounded, borderStyle),
        ...ThemeHelper.getTransitionColorsProps(),
        ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused),
        ...SelectHelper.getBoxShadowProps(color, state.isDisabled, state.isFocused),
        ':hover':
      {
        ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused)
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
      paddingBottom: 0
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    input: (base) => (
      {
        ...base,
        marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetInput(size, selectedOption)}px` : 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half')
      }
    ),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => 
    {
      const bgSelected = ThemeHelper.getBackgroundColorProps(color, 'darker').backgroundColor;
      const bgHover = ThemeHelper.getBackgroundColorProps(color, 'darker').backgroundColor;
      const bgPressed = ThemeHelper.getBackgroundColorProps(color, 'darker').backgroundColor
      // const colorSelected = ThemeHelper.getForegroundColorForBackAsCSS(color).color;
      // const colorHover = ThemeHelper.getForegroundColorForBackAsCSS(color, 'light').color;
      return {
        ...styles,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ...ThemeHelper.getFontProps(size, fontBold),
        ...ThemeHelper.getTextEffectProps(size, textEffect, textAlign),
        ...ThemeHelper.getPaddingProps(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
        ...ThemeHelper.getTransitionColorsProps(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size, paddingControl) : {}),
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'inherit'
              : bgPressed
            : undefined
        }
      };
    },

    singleValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetSingleValue(size, data)}px` : '2px',
        ...ThemeHelper.getFontProps(size),
        ...ThemeHelper.getTransitionColorsProps(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size, paddingControl) : {})
      };
    }
  };

  const { Option, SingleValue } = components;
  const RenderOption = (props: OptionProps<ISelectOption>) => 
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<Option {...props}>
          <img src={props.data.icon} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </Option>)
      }
      else
      {
        return (<Option {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem` }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </Option>)
      }
    }
    else
    {
      return (<Option {...props}>
        {props.data.text}
      </Option>)
    }
  }

  const RenderSingleValue = (props: SingleValueProps<ISelectOption>) =>
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<SingleValue {...props}>
          <img src={props.data.icon} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </SingleValue>)
      }
      else
      {
        return (<SingleValue {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </SingleValue>)
      }
    }
    else
    {
      return (<SingleValue {...props}>
        {props.data.text}
      </SingleValue>)
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
      onChange={handleSelect}
      components={{ Option: RenderOption, SingleValue: RenderSingleValue }} />
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
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