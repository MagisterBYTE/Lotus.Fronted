import type { Meta, StoryObj } from '@storybook/react';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
import { TThemeColors } from 'ui/theme';
import { ButtonOption } from './ButtonOption';
import { SelectOptionsIconsBase, SelectOptionsText } from '.storydata/SelectOptionsData';

const meta = {
  title: 'Controls/ButtonOption',
  component: ButtonOption,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

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
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    variant: { control: 'inline-radio' },
    hasIcons: { control: 'boolean' },
    hasScaleEffect: { control: 'boolean' },
    hasShadowEffect: { control: 'boolean' },
    backImage: { table: { disable: true }}
  }
} satisfies Meta<typeof ButtonOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlyText: Story = {
  name: 'OnlyText',
  args: {
    disabled: false,
    variant:'filled',
    options: SelectOptionsText
  }
};

export const OnlyIcons: Story = {
  name: 'OnlyIcons',
  args: {
    disabled: false,
    hasIcons: true,
    variant:'filled',
    options: SelectOptionsIconsBase
  }
};


