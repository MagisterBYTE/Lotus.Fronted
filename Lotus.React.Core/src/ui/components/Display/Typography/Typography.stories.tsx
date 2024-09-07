import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VerticalStack } from 'ui/components/Layout';
import { TColorTypes } from 'ui/types';
import { Typography } from './Typography';
import { TTypographyEffects } from './TypographyEffect';
import { TTypographyVariants } from './TypographyVariant';

const meta = {
  title: 'Display/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {
    color: {
      control: 'inline-radio',
      options: [...TColorTypes, undefined]
    },
    variant: {
      control: 'inline-radio',
      options: [...TTypographyVariants, undefined]
    },
    effect: {
      control: 'inline-radio',
      options: [...TTypographyEffects, undefined]
    }
  },

  args: { onClick: fn() }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'body1',
    color: undefined,
    children: `Активная матрица на органических светодиодах (Active Matrix Organic Light-Emitting Diode, AMOLED) — 
    технология создания дисплеев для мобильных устройств, компьютерных мониторов и телевизоров, созданная конгломератом Samsung. 
    Технология подразумевает использование органических светодиодов в качестве светоизлучающих элементов и 
    активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами`
  }
};

export const Caption1: Story = {
  args: {
    color: 'secondary',
    variant: 'body2',
    children: 'Имя персонажа'
  }
};

export const AllTypography: Story = {

  render: () =>
  {
    return (
      <VerticalStack alignItems='flex-start' gap='0.5rem' fullWidth={true}>
        <Typography variant='h3' children='Heading3' />
        <Typography variant='h4' children='Heading4' />
        <Typography variant='h5' children='Heading5' />
        <Typography variant='h6' children='Heading6' />
        <Typography variant='large' children='TitleLarge' />
        <Typography variant='medium' children='TitleMedium' />
        <Typography variant='small' children='TitleSmall' />
        <Typography variant='smaller' children='TitleSmaller' />
        <Typography variant='body1' children='Активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами' />
        <Typography variant='body2' children='Активной матрицы из тонкоплёночных транзисторов (TFT) для управления светодиодами' />
      </VerticalStack>
    );
  }
};
