/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISelectOption, SelectOptionHelper, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, MultiValue, MultiValueProps, OptionProps, Props, StylesConfig } from 'react-select';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TColorAccent, TCssWidth } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { IconContext } from 'react-icons';
import { TypographyHelper } from 'ui/components/Display/Typography';
import { IGeneralPropertiesElements } from 'ui/components/GeneralPropertiesElements';
import { SelectHelper } from '../Select/SelectHelper';


export interface IMultiSelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, true>, IGeneralPropertiesElements 
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
   * Функция обратного вызова для установки выбранных значений
   * @param selectedValues Выбранные значения или пустой массив
   * @returns 
   */
  onSetSelectedValues?: (selectedValues: TValueOption[]) => void;

  /**
   * Изначально выбранные значения
   */
  initialSelectedValues?: TValueOption[];

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const MultiSelect = <TValueOption extends TKey = TKey>(props: IMultiSelectProps<TValueOption>) => 
{
  const  { hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal',
    isBackground = false,
    width,
    labelProps,
    hasIcons = false,
    options,
    onSetSelectedValues,
    initialSelectedValues,
    rightElement,
    ...propsReactSelect } = props;

  const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>(SelectOptionHelper.getSelectOptionsByValues(options,
    initialSelectedValues));

  const handleMultiSelect = (newValue: MultiValue<ISelectOption>, _actionMeta: ActionMeta<ISelectOption>) => 
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
        ...ThemeHelper.getFontPropsAsCSS(size),
        ...ThemeHelper.getTransitionColorsPropsAsCSS(),
        ...ThemeHelper.getBorderPropsAsCSS(undefined, undefined, hasRadius, size),
        ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused),
        ...SelectHelper.getBoxShadowProps(color, state.isDisabled, state.isFocused),
        ':hover':
      {
        ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused)
      },
        ':disabled':
      {
        ...ThemeHelper.getOpacityPropsForDisabledAsCSS()
      }
      }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      columnGap: `${SelectHelper.getGapFromSize(size, paddingControl)}rem`
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    input: (base) => (
      {
        ...base,
        marginLeft: selectedOptions.length == 0 ? '-2px' : '-8px',
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        ...ThemeHelper.getPaddingPropsAsCSS(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half')
      }
    ),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => 
    {
      const bgSelected = ThemeHelper.getBackgroundColorAsCSS(color, undefined, 'selected').backgroundColor;
      const bgHover = ThemeHelper.getBackgroundColorAsCSS(color, undefined, 'hover').backgroundColor;
      const bgPressed = ThemeHelper.getBackgroundColorAsCSS(color, undefined, 'pressed').backgroundColor
      const colorSelected = ThemeHelper.getForegroundColorForBackAsCSS(color).color;
      const colorHover = ThemeHelper.getForegroundColorForBackAsCSS(color, 'light').color;
      return {
        ...styles,
        ...ThemeHelper.getPaddingPropsAsCSS(size, paddingControl, (size == 'large') ? 'half' : 'normal', 'half'),
        ...ThemeHelper.getFontPropsAsCSS(size),
        ...ThemeHelper.getTransitionColorsPropsAsCSS(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size, paddingControl) : {}),
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? bgSelected
            : isFocused
              ? bgHover
              : undefined,
        color: isDisabled
          ? 'gray'
          : isSelected
            ? colorSelected
            : isFocused
              ? colorHover
              : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
  
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

    multiValue: (styles, { data, isDisabled }) =>
    {
      const colorAccent:TColorAccent|undefined = (color == 'main' || color == 'secondary') ? undefined : 'palest'; 

      return {
        ...styles,
        fontSize: '100%',
        backgroundColor: ThemeHelper.getBackgroundColorAsCSS(color, colorAccent).backgroundColor,
        ...ThemeHelper.getBorderPropsAsCSS(color, undefined, hasRadius),
        ...ThemeHelper.getFontPropsAsCSS(size),
        ...ThemeHelper.getTransitionColorsPropsAsCSS()
      };
    },

    multiValueRemove: (styles) =>
    {
      return {
        ...styles,
        ':hover':
        {
          backgroundColor: ThemeHelper.getBackgroundColorAsCSS(color, undefined, 'hover').backgroundColor
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
        ... (hasIcons ? SelectHelper.getFlexContainer(size, paddingControl) : {})
      };
    }
  };

  const { Option, MultiValue } = components;
  const RenderOption = (props: OptionProps<ISelectOption>) => 
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<Option {...props}>
          <img src={props.data.icon} style={{margin: '1px'}} width={sizeIcon} height={sizeIcon}  />
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

  const RenderMultiValue = (props: MultiValueProps<ISelectOption>) =>
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<MultiValue {...props}>
          <img src={props.data.icon} style={{margin: '1px'}} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </MultiValue>)
      }
      else
      {
        return (<MultiValue {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </MultiValue>)
      }
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
      isMulti
      {...propsReactSelect}
      options={options}
      value={selectedOptions}
      styles={selectOptionStyles}
      classNamePrefix='react-multiSelect'
      getOptionLabel={(MultiSelectOption) => MultiSelectOption.text}
      getOptionValue={(MultiSelectOption) => MultiSelectOption.value}
      // @ts-expect-error handleMultiSelect
      onChange={handleMultiSelect}
      className='basic-multi-select'
      components={{ Option: RenderOption, MultiValue: RenderMultiValue }}
    />
  }

  if (labelProps)
  {
    return <Label {...labelProps} size={size} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)} >
      {RenderReactSelect()}
    </Label>
  }
  else
  {
    return RenderReactSelect();
  }
}