import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CheckBox, InputField, SelectOption } from 'ui/components/Controls';
import { VerticalStack } from 'ui/components/Layout';
import { Panel } from 'ui/components/Surfaces';
import { Theme, TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlSizes, TTextEffects } from 'ui/types';
import { GiBarbute, GiSteeltoeBoots } from 'react-icons/gi';
import { Colors } from 'lotus-core';
import { TTypographyVariants } from '../Typography';
import { Label } from './Label';
import { SelectOptionsIconsSvg } from '.storydata/SelectOptionsData';

const meta = {
  title: 'Display/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {

    // IGeneralTextProperties
    fontBold: { control: 'boolean' },
    fontAccent: { control: 'boolean' },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined] },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined] },
    textColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralIconProperties
    icon: { table: { disable: true } },
    iconColor: { table: { disable: true } },
    iconStyle: { table: { disable: true } },

    // ILabelProps
    textColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    variant: { control: 'inline-radio', options: [...TTypographyVariants, undefined] },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined] },

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
            { ...args, label: 'Раса' }} hasIcons options={SelectOptionsIconsSvg} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <CheckBox labelProps={
            { ...args, label: 'Раса' }} size={args.size} accentColor={args.textColor} borderRadius width='100%' />
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
        iconColor={Theme.getColor(args.textColor, 'darkest')}>
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
            { ...args, label: 'Раса' }} hasIcons options={SelectOptionsIconsSvg} size={args.size} backColor={args.textColor} borderRadius width='100%' />
          <CheckBox labelProps={
            { ...args, label: 'Раса' }} size={args.size} accentColor={args.textColor} borderRadius width='100%' />
        </VerticalStack>
      </Panel>
    );
  }
};
