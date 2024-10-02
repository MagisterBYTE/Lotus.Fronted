import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TThemeColors } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { SelectOption } from './SelectOption';
import { SelectOptionsIconsBase, SelectOptionsIconsSvg, SelectOptionsText } from '.storydata/SelectOptionsData';

const meta = {
  title: 'Controls/SelectOptionMulti',
  component: SelectOption,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onSetSelectedValue: fn() },
  argTypes: {
    // IGeneralBorderProperties
    borderRadius: { control: 'boolean' },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined] },
    borderWidth: { control: 'number' },
    borderColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralTextProperties
    fontBold: { control: 'boolean' },
    fontAccent: { control: 'boolean' },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined] },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined] },
    textColorHarmonious: { control: 'boolean' },
    textColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralBaseElementProperties
    size: { control: 'inline-radio', options: [...TControlSizes, undefined] },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined] },

    // ISelectOptionProps
    options: { table: { disable: true } },
    rightElement: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }

} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconsReact: Story = {
  args: {
    options: SelectOptionsIconsSvg,
    width: '200px',
    hasIcons: true,
    isSearchable: false,
    isClearable: true,
    isMulti:true
  }
};

export const IconsImage: Story = {
  args: {
    options: SelectOptionsIconsBase,
    hasIcons: true,
    width: '300px',
    isSearchable: false,
    isClearable: true,
    isMulti:true
  }
};

export const LabelLeft: Story = {
  args: {
    isDisabled: true,
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false },
    options: SelectOptionsText,
    width: '400px',
    isClearable: true,
    isMulti:true
  }
};

export const LabelTop: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: true, style: { marginLeft: '0.4rem' } },
    options: SelectOptionsText,
    width: '400px',
    isClearable: true,
    isMulti:true
  }
};

export const HorizontalSpaceText: Story = {
  args: {
    backColor: 'blue',
    isDisabled: true,
    options: SelectOptionsText,
    isMulti:true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          isClearable
          width='200px'
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
    options: SelectOptionsIconsSvg,
    isMulti:true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          hasIcons={true}
          isClearable
          width='200px'
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
    options: SelectOptionsIconsBase,
    isMulti:true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <SelectOption
          hasIcons={true}
          isClearable
          options={args.options}
          width='400px'
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
