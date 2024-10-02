import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GiAnt } from 'react-icons/gi';
import { TControlPaddings, TControlSizes, TTextEffects } from 'ui/types';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { Colors } from 'lotus-core';
import { Button } from './Button';
import { hydraulicAnalysisIcon } from '.storydata/IconsBase64';

const meta = {
  title: 'Controls/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes: {
    // IGeneralBorderProperties
    borderRadius: { control: 'boolean' },
    borderStyle: { control: 'inline-radio' },
    borderWidth: { control: 'number' },
    borderColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },
    hoverBorderColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    pressedBorderColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },
    hoverBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    pressedBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },

    // IGeneralTextProperties
    fontBold: { control: 'boolean' },
    fontAccent: { control: 'boolean' },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined] },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined] },
    textColorHarmonious: { control: 'boolean' },
    textColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },
    hoverTextColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    pressedTextColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },

    // IGeneralBaseElementProperties
    size: { control: 'inline-radio', options: [...TControlSizes, undefined] },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined] },
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    variant: { control: 'inline-radio' },
    hasIcon: { control: 'boolean' },
    hasRippleEffect: { control: 'boolean' },
    hasScaleEffect: { control: 'boolean' },
    hasShadowEffect: { control: 'boolean' },
    onClick: { table: { disable: true } },
    children: { table: { disable: true }},
    style: { table: { disable: true }},
    backImage: { table: { disable: true }}
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  name: 'Filled',
  args: {
    disabled: false,
    variant:'filled',
    children: 'Filled'
  }
};

export const Outline: Story = {
  name: 'Outline',
  args: {
    disabled: false,
    variant:'outline',
    children: 'Outline',
    borderStyle: 'solid'
  }
};

export const Text: Story = {
  name: 'Text',
  args: {
    disabled: false,
    variant:'text',
    children: 'Text'
  }
};

export const IconReact: Story = {
  name: 'IconReact',
  args: {
    disabled: false,
    hasIcon: true,
    variant:'icon',
    children: <GiAnt />
  }
};

export const IconImage: Story = {
  name: 'IconImage',
  args: {
    disabled: true,
    hasIcon: true,
    variant:'icon',
    children: hydraulicAnalysisIcon
  }
};

export const MyBackColor: Story = {
  name: 'MyBackColor',
  args: {
    disabled: false,
    children: 'MyBackColor',
    variant:'filled',
    backColor: Colors.coral,
    style: { width: '200px' }
  }
};

export const MyTextColor: Story = {
  name: 'MyTextColor',
  args: {
    disabled: false,
    children: 'MyTextColor',
    variant:'filled',
    textColor: Colors.red,
    hoverTextColor: Colors.chocolate_1,
    pressedTextColor: Colors.chocolate_3,
    style: { width: '200px' }
  }
};

export const MyBackTextColor: Story = {
  name: 'MyBackTextColor',
  args: {
    disabled: false,
    children: 'MyBackTextColor',
    variant:'filled',
    backColor: 'blueGrey',
    hoverBackColor: 'dark',
    pressedBackColor: 'darkest',
    textColor: Colors.red,
    hoverTextColor: Colors.chocolate_1,
    pressedTextColor: Colors.chocolate_3,
    style: { width: '200px' }
  }
};
