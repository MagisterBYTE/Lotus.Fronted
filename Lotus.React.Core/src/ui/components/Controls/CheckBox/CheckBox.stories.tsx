import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TControlPaddings, TControlSizes, TTextEffects } from 'ui/types';
import { TThemeColors } from 'ui/theme';
import { CheckBox } from './CheckBox';

const meta = {
  title: 'Controls/CheckBox',
  component: CheckBox,
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

    // ICheckBoxBaseProps
    useCustom: { control: 'boolean' },
    checkedSymbolStyle: { table: { disable: true } },
    hasScaleEffect: { control: 'boolean' },
    hasShadowEffect: { control: 'boolean' },
    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } }
  }
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckBox: Story = {
  name: 'DefaultCheckBox',
  args:
  {
    labelProps: { label: 'Использовать оружие' }
  }
};

export const CustomCheckBox: Story = {
  name: 'CustomCheckBoxBack',
  args:
  {
    useCustom: true,
    labelProps: { label: 'Использовать оружие' }
  }
};

export const CustomCheckCheck: Story = {
  name: 'CustomCheckCheck',
  args:
  {
    useCustom: true,
    backColor: 'brown',
    labelProps: { label: 'Использовать оружие' },
    checkedSymbolStyle: 
    {
      position: 'relative',
      content: '"■"',
      left: '-4px',
      top: '-6px'
    }
  }
};

export const DefaultRadioButton: Story = {
  name: 'DefaultRadioButton',
  args:
  {
    type: 'radio',
    labelProps: { label: 'Использовать оружие' }
  }
};