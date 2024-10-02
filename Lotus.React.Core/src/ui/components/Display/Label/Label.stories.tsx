import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InputField, Select } from 'ui/components/Controls';
import { VerticalStack } from 'ui/components/Layout';
import { Panel } from 'ui/components/Surfaces';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlSizes, TTextEffects } from 'ui/types';
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
    color: {
      control: 'inline-radio',
      options: [...TThemeColors, undefined]
    },
    colorVariant: {
      control: 'inline-radio',
      options: [...TThemeColorVariants, undefined]
    },
    size: {
      control: 'inline-radio',
      options: [...TControlSizes, undefined]
    },
    variant: {
      control: 'inline-radio',
      options: [...TTypographyVariants, undefined]
    },
    textEffect: {
      control: 'inline-radio',
      options: [...TTextEffects, undefined]
    },
    textAlign:
    {
      control: 'inline-radio',
      options: ['left', 'right', 'center', undefined]
    },
    textColorHarmonious: {
      control: 'boolean'
    },
    fontAccent: {
      control: 'boolean'
    },
    onClick:
    {
      table:
      {
        disable: true
      }
    }
    ,
    children:
    {
      table:
      {
        disable: true
      }
    }
  },

  args: { onClick: fn() }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelTextInput: Story = {

  args: {
    color: 'blue',
    label: 'Фамилия'
  },
  render: (args) =>
  {
    return (
      <InputField labelProps={
        { label: args.label, 
          color: args.color, 
          textEffect: args.textEffect, 
          variant: args.variant,
          isTopLabel: args.isTopLabel,
          fontBold: args.fontBold,
          fontAccent: args.fontAccent,
          textAlign: args.textAlign,
          textColorHarmonious: args.textColorHarmonious,
          size:args.size }} size={args.size} borderRounded={true} color={args.color} />
    );
  }
};

export const VerticalStackLabel: Story = {

  args: {
    label: 'Фамилия',
    labelWidth: '60%',
    containerWidth: '100%',
    fontBold: false
  },
  render: (args) =>
  {
    return (
      
      <Panel borderRounded color={args.color} header='Личные данные'
        borderStyle={undefined} shadowElevation={4}
        headerTypographyProps={{fontBold:true, variant:'large', textEffect:'shadow' }} >
        <VerticalStack style={{width: '400px', padding: '1rem'}} gap='0.5rem'>
          <InputField labelProps={
            { label: 'Фамилия', 
              color: args.color, 
              colorVariant:args.colorVariant,
              textEffect: args.textEffect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              fontBold: args.fontBold,
              fontAccent: args.fontAccent,
              textAlign: args.textAlign,
              textColorHarmonious: args.textColorHarmonious,
              labelWidth:args.labelWidth,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Имя', 
              color: args.color, 
              colorVariant:args.colorVariant,
              textEffect: args.textEffect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              fontBold: args.fontBold,
              fontAccent: args.fontAccent,
              textAlign: args.textAlign,
              textColorHarmonious: args.textColorHarmonious,
              labelWidth:args.labelWidth,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Отчество', 
              color: args.color, 
              colorVariant:args.colorVariant,
              textEffect: args.textEffect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              fontBold: args.fontBold,
              fontAccent: args.fontAccent,
              textAlign: args.textAlign,
              textColorHarmonious: args.textColorHarmonious,
              labelWidth:args.labelWidth,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Сфера деятельности', 
              color: args.color, 
              textEffect: args.textEffect, 
              colorVariant:args.colorVariant,
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              fontBold: args.fontBold,
              fontAccent: args.fontAccent,
              textAlign: args.textAlign,
              textColorHarmonious: args.textColorHarmonious,
              labelWidth:args.labelWidth,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <Select labelProps={
            { label: 'Раса', 
              color: args.color, 
              colorVariant:args.colorVariant,
              textEffect: args.textEffect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              fontBold: args.fontBold,
              fontAccent: args.fontAccent,
              textAlign: args.textAlign,
              textColorHarmonious: args.textColorHarmonious,
              labelWidth:args.labelWidth,
              containerWidth: args.containerWidth,
              size:args.size }} hasIcons options={SelectOptionsIconsSvg} size={args.size} borderRounded={true} color={args.color} width='100%' />
        </VerticalStack>
      </Panel>
    );
  }
};
