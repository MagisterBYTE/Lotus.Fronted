import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeModeColors } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TIconPlacements, TTextEffects } from 'ui/types';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { SelectOption } from './SelectOption';
import { OptionsText, OptionsTextAndIconImage, OptionsTextAndIconReact } from '.storydata/OptionsData';

const meta = {
  title: 'Controls/SelectOptionMulti',
  component: SelectOption,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onSelectedOptions: fn() },
  argTypes: {

    // IGeneralBaseElementProperties
    isDisabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2 } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3 } },

    // ISelectOptionBase
    isBackground: { control: 'boolean', table: { category: 'SelectOption', order: 4 } },
    width: { control: 'text', table: { category: 'SelectOption', order: 5 } },
    hasRippleEffect: { control: 'boolean', table: { category: 'SelectOption', order: 6 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'SelectOption', order: 7 } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'SelectOption', order: 8 } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'SelectOption', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Text', order: 18 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Border', order: 24 } },

    // IGeneralIconProperties
    iconColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconStyle: { table: { disable: true } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    imageDatabase: { table: { disable: true } },

    labelProps: { table: { disable: true } },
    options: { table: { disable: true } },
    rightElement: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }

} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconsReact: Story = {
  args: {
    options: OptionsTextAndIconReact,
    width: '200px',
    isSearchable: false,
    isClearable: true,
    isMulti: true
  }
};

export const IconsImage: Story = {
  args: {
    options: OptionsTextAndIconImage,
    width: '300px',
    isSearchable: false,
    isClearable: true,
    isMulti: true
  }
};

export const LabelLeft: Story = {
  args: {
    isDisabled: true,
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false },
    options: OptionsText,
    width: '400px',
    isClearable: true,
    isMulti: true
  }
};

export const LabelTop: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: true, style: { marginLeft: '0.4rem' } },
    options: OptionsText,
    width: '400px',
    isClearable: true,
    isMulti: true
  }
};

export const HorizontalSpaceText: Story = {
  args: {
    backColor: 'blue',
    isDisabled: true,
    options: OptionsText
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          isClearable
          isMulti
          width={args.width}
          options={args.options}
          isDisabled={args.isDisabled}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl}
        />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить'
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};

export const HorizontalSpaceIconsReact: Story = {
  args: {
    backColor: 'brown',
    options: OptionsTextAndIconReact,
    isMulti:true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          isMulti
          isClearable
          width={args.width}
          options={args.options}
          isDisabled={args.isDisabled}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить'
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};

export const HorizontalSpaceIconsImage: Story = {
  args: {
    backColor: 'blueGrey',
    options: OptionsTextAndIconImage,
    isMulti:true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          isMulti={args.isMulti}
          isClearable
          options={args.options}
          width={args.width}
          isDisabled={args.isDisabled}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }}
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить'
          borderRadius={args.borderRadius}
          backColor={args.backColor}
          textColor={args.textColor}
          size={args.size}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};
