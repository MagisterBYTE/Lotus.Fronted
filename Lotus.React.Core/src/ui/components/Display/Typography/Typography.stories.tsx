import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VerticalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TTextEffects } from 'ui/types';
import { Typography } from './Typography';
import { TTypographyVariants } from './TypographyVariant';

const meta = {
  title: 'Display/Typography',
  component: Typography,
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
    
    textColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    variant: { control: 'inline-radio', options: [...TTypographyVariants, undefined] },

    extraClass: { table: { disable: true } },
    onClick: { table: { disable: true } },
    style: { table: { disable: true }}
  },

  args: { onClick: fn() }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body1',
    textColor: undefined,
    children: `Активная матрица на органических светодиодах (Active Matrix Organic Light-Emitting Diode, AMOLED) — 
    технология создания дисплеев для мобильных устройств, компьютерных мониторов и телевизоров, созданная конгломератом Samsung. 
    Технология подразумевает использование органических светодиодов в качестве светоизлучающих элементов и 
    активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами`
  }
};

export const Caption1: Story = {
  args: {
    textColor: 'blue',
    variant: 'body2',
    children: 'Имя персонажа'
  }
};

export const AllTypography: Story = {

  render: (args) =>
  {
    return (
      <VerticalStack alignItems='flex-start' gap='0.5rem' fullWidth={true}>
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='h3' children='Heading3' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='h4' children='Heading4' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='h5' children='Heading5' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='h6' children='Heading6' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='large' children='TitleLarge' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='medium' children='TitleMedium' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='small' children='TitleSmall' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} variant='smaller' children='TitleSmaller' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} 
          textEffect={args.textEffect} 
          variant='body1' children='Активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами' />
        <Typography fontBold={args.fontBold} textColor={args.textColor} textColorVariant={args.textColorVariant} textEffect={args.textEffect} 
          variant='body2' children='Активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами' />
      </VerticalStack>
    );
  }
};
