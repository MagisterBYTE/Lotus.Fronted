import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CheckBox, InputField, SelectOption } from 'ui/components/Controls';
import { VerticalStack } from 'ui/components/Layout';
import { Panel } from 'ui/components/Surfaces';
import { ThemeHelper, TThemeColors, TThemeColorVariants, TThemeModeColors } from 'ui/theme';
import { TControlSizes, TIconPlacements, TTextEffects } from 'ui/types';
import { GiBarbute, GiSteeltoeBoots } from 'react-icons/gi';
import { Colors } from 'lotus-core';
import { TTypographyVariants } from '../Typography';
import { Label } from './Label';
import { OptionsText, OptionsTextAndIconReact } from '.storydata/OptionsData';

const meta = {
  title: 'Display/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {

    // ILabelProps
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Label', order: 1 }  },
    variant: { control: 'inline-radio', options: [...TTypographyVariants, undefined], table: { category: 'Label', order: 2 }  },
    textColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Label', order: 3 }  },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 1 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 2 }  },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 3 }  },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 4 }  },
    textColor: { control: 'inline-radio', options: [...TThemeColors, undefined], table: { category: 'Text', order: 5 }  },

    // IGeneralIconProperties
    iconColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconStyle: { table: { disable: true } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    imageDatabase: { table: { disable: true } },

    extraClass: { table: { disable: true } },
    onClick: { table: { disable: true } },
    style: { table: { disable: true } },
    children: { table: { disable: true } }
  },

  args: { onClick: fn() }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelTextInput: Story = {

  args: {
    textColor: 'blue',
    label: 'Фамилия'
  },
  render: (args) =>
  {
    return (
      <InputField labelProps={{ label: args.label, ...args }}
        size={args.size}
        textColor={args.textColor}
        textEffect={args.textEffect} />
    );
  }
};

export const LabelIcon: Story = {

  args: {
    textColor: 'blue',
    label: 'Фамилия',
    icon: <GiBarbute />
  },
  render: (args) =>
  {
    return (
      <InputField labelProps={{ label: args.label, ...args }}
        size={args.size}
        textColor={args.textColor}
        textEffect={args.textEffect} />
    );
  }
};

export const LabelIconRed: Story = {

  args: {
    textColor: 'blue',
    label: 'Фамилия',
    icon: <GiSteeltoeBoots />,
    iconColor: Colors.red
  },
  render: (args) =>
  {
    return (
      <InputField labelProps={{ label: args.label, ...args }}
        size={args.size}
        textColor={args.textColor}
        textEffect={args.textEffect} />
    );
  }
};

export const DefaultPanel: Story = {

  args: {
    label: 'Фамилия',
    labelWidth: '60%',
    containerWidth: '100%',
    fontBold: false
  },
  render: (args) =>
  {
    return (

      <Panel borderRadius borderStyle='solid' backColor={args.textColor} backColorVariant='white' header='Личные данные'
        size={args.size}
        shadowElevation={4}
        headerTypographyProps={{ fontBold: true, textEffect: 'shadow' }} >
        <VerticalStack style={{ width: '400px', padding: '1rem' }} gap='0.5rem'>
          <InputField labelProps={
            { ...args, label: 'Фамилия' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Имя' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Отчество' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Сфера деятельности' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <SelectOption labelProps={
            { ...args, label: 'Раса' }} options={OptionsText} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <CheckBox labelProps={
            { ...args, label: 'Раса' }} size={args.size} textColor={args.textColor} borderRadius width='100%' />
        </VerticalStack>
      </Panel>
    );
  }
};


export const DefaultPanelIcon: Story = {

  args: {
    label: 'Фамилия',
    labelWidth: '60%',
    containerWidth: '100%',
    fontBold: false
  },
  render: (args) =>
  {
    return (

      <Panel borderRadius borderStyle='solid' backColor={args.textColor} backColorVariant='white' header='Личные данные'
        size={args.size}
        shadowElevation={4}
        headerTypographyProps={{ fontBold: true, textEffect: 'shadow' }}
        icon={<GiBarbute />}
        iconColor={ThemeHelper.getColor(args.textColor, 'darkest')}>
        <VerticalStack style={{ width: '400px', padding: '1rem' }} gap='0.5rem'>
          <InputField labelProps={
            { ...args, label: 'Фамилия' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Имя' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Отчество' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <InputField labelProps={
            { ...args, label: 'Сфера деятельности' }} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <SelectOption labelProps={
            { ...args, label: 'Раса' }} options={OptionsTextAndIconReact} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <CheckBox labelProps={
            { ...args, label: 'Раса' }} size={args.size} textColor={args.textColor} borderRadius width='100%' />
        </VerticalStack>
      </Panel>
    );
  }
};
