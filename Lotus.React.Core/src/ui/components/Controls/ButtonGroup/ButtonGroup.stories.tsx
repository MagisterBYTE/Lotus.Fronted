import type { Meta, StoryObj } from '@storybook/react';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TIconPlacements, TTextEffects } from 'ui/types';
import { TThemeColors, TThemeColorVariants, TThemeModeColors } from 'ui/theme';
import { fn } from '@storybook/test';
import { TButtonVariants } from '../Button/ButtonVariant';
import { ButtonGroup } from './ButtonGroup';
import { OptionsIconImage, OptionsIconReact, OptionsText, OptionsTextAndIconImage, OptionsTextAndIconReact } from '.storydata/OptionsData';

const meta = {
  title: 'Controls/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered'
  },

  args: { onSelectedOptions: fn() },

  tags: ['autodocs'],

  argTypes: {
    // IGeneralBaseElementProperties
    isDisabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2 } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3 } },
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    variant: { control: 'inline-radio', options: [...TButtonVariants, undefined], table: { category: 'Button', order: 4 } },
    hasRippleEffect: { control: 'boolean', table: { category: 'Button', order: 6 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'Button', order: 7 } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'Button', order: 8 } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'Button', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },
    hoverBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 11  }},
    pressedBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 12 } },

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

    // IGeneralIconProperties
    iconColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconStyle: { table: { disable: true } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    imageDatabase: { table: { disable: true } },

    options: { table: { disable: true } },
    labelProps: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlyText: Story = {
  name: 'OnlyText',
  args: {
    options: OptionsText,
    initialSelectedValue: 2
  }
};

export const OnlyIconsImage: Story = {
  name: 'OnlyIconsImage',
  args: {
    options: OptionsIconImage,
    initialSelectedValue: 2
  }
};

export const OnlyIconsReact: Story = {
  name: 'OnlyIconsReact',
  args: {
    options: OptionsIconReact,
    initialSelectedValue: 2
  }
};

export const TextIconsImage: Story = {
  name: 'TextIconsImage',
  args: {
    options: OptionsTextAndIconImage,
    initialSelectedValue: 2
  }
};

export const TextIconsReact: Story = {
  name: 'TextIconsReact',
  args: {
    options: OptionsTextAndIconReact,
    initialSelectedValue: 2
  }
};