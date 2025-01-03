import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TControlPaddings, TControlSizes } from 'ui/types';
import { TThemeColors } from 'ui/theme';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Controls/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes: {
    // IGeneralBaseElementProperties
    size: { control: 'inline-radio', options: [...TControlSizes, undefined] },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined] },
    extraClass: { table: { disable: true } },

    // IRadioButtonBaseProps
    accentColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },
    hasScaleEffect: { control: 'boolean' },
    hasShadowEffect: { control: 'boolean' },
    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } }
  }
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args:
  {
    labelProps: { label: 'Использовать оружие', fontAccent: true }
  }
};
