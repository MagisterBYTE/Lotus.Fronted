import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
import { TThemeColors, TThemeModeColors } from 'ui/theme';
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
    // IGeneralBaseElementProperties
    disabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2 } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3 } },
    extraClass: { table: { disable: true } },

    // ICheckBoxBaseProps
    useCustom: { control: 'boolean', table: { category: 'CheckBox', order: 5 } },
    checkedSymbolStyle: { table: { disable: true } },
    hasRippleEffect: { control: 'boolean', table: { category: 'CheckBox', order: 6 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'CheckBox', order: 7 } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'CheckBox', order: 8 } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'CheckBox', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Text', order: 18 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Border', order: 24 } },

    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    labelProps: { table: { disable: true } },
    backImage: { table: { disable: true } }
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