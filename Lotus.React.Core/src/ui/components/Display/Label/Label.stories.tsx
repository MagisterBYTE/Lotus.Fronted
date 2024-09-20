import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorTypes, TControlSizes } from 'ui/types';
import { InputField, Select } from 'ui/components/Controls';
import { VerticalStack } from 'ui/components/Layout';
import { Panel } from 'ui/components/Surfaces';
import { TTypographyEffects, TTypographyVariants } from '../Typography';
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
      options: [...TColorTypes, undefined]
    },
    size: {
      control: 'inline-radio',
      options: [...TControlSizes, undefined]
    },
    variant: {
      control: 'inline-radio',
      options: [...TTypographyVariants, undefined]
    },
    effect: {
      control: 'inline-radio',
      options: [...TTypographyEffects, undefined]
    },
    labelHorizontalAlign: {
      control: 'inline-radio',
      options: ['flex-start', 'center', 'flex-end']
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
    color: 'primary',
    label: 'Фамилия'
  },
  render: (args) =>
  {
    return (
      <InputField labelProps={
        { label: args.label, 
          color: args.color, 
          effect: args.effect, 
          variant: args.variant,
          isTopLabel: args.isTopLabel,
          bold: args.bold,
          size:args.size }} size={args.size} borderRounded={true} color={args.color} />
    );
  }
};

export const VerticalStackLabel: Story = {

  args: {
    label: 'Фамилия',
    labelWidth: '60%',
    bold: false
  },
  render: (args) =>
  {
    return (
      
      <Panel borderRounded color={args.color} header='Личные данные' headerTypographyProps={{bold:true, variant:'large', effect:'shadow' }} >
        <VerticalStack style={{width: '400px', padding: '1rem'}} gap='0.5rem'>
          <InputField labelProps={
            { label: 'Фамилия', 
              color: args.color, 
              effect: args.effect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              bold: args.bold,
              labelWidth:args.labelWidth,
              labelHorizontalAlign: args.labelHorizontalAlign,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Имя', 
              color: args.color, 
              effect: args.effect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              bold: args.bold,
              labelWidth:args.labelWidth,
              labelHorizontalAlign: args.labelHorizontalAlign,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Отчество', 
              color: args.color, 
              effect: args.effect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              bold: args.bold,
              labelWidth:args.labelWidth,
              labelHorizontalAlign: args.labelHorizontalAlign,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <InputField labelProps={
            { label: 'Сфера деятельности', 
              color: args.color, 
              effect: args.effect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              bold: args.bold,
              labelWidth:args.labelWidth,
              labelHorizontalAlign: args.labelHorizontalAlign,
              containerWidth: args.containerWidth,
              size:args.size }} size={args.size} borderRounded={true} color={args.color} width='100%' />
          <Select labelProps={
            { label: 'Раса', 
              color: args.color, 
              effect: args.effect, 
              variant: args.variant,
              isTopLabel: args.isTopLabel,
              bold: args.bold,
              labelWidth:args.labelWidth,
              labelHorizontalAlign: args.labelHorizontalAlign,
              containerWidth: args.containerWidth,
              size:args.size }} hasIcons options={SelectOptionsIconsSvg} size={args.size} borderRounded={true} color={args.color} width='100%' />
        </VerticalStack>
      </Panel>
    );
  }
};
