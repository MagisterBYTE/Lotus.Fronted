import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FcCloth } from 'react-icons/fc';
import { TThemeColors, TThemeColorVariants, TThemeModeColors } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TIconPlacements, TTextEffects } from 'ui/types';
import { Chip } from './Chip';
import { collapseAnalysisIcon } from '.storydata/IconsBase64';

const meta = {
  title: 'Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes: {

    // IGeneralBaseElementProperties
    disabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2  } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3  } },
    extraClass: { table: { disable: true } },

    // IChipProps
    label: { control: 'text', table: { category: 'Chip', order: 10 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },
    backColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 11  } },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Text', order: 18 } },
    textColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Text', order: 19 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Border', order: 24 } },

    // IGeneralIconProperties
    icon: { table: { disable: true } },
    iconColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    iconStyle: { table: { disable: true } },
    imageDatabase: { table: { disable: true } },

    backImage: { table: { disable: true } },
    onClick: { table: { disable: true } }
  }
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    label: 'А'
  }
};

export const Border: Story = {
  args: {
    label: 'Огонь',
    borderColor: 'blue',
    borderStyle: 'solid',
    textColor: 'brown',
    paddingControl: 'minimum',
    borderRadius: true,
    backColor: 'blueGrey'
  }
};

export const Dark: Story = {
  args: {
    backColor: 'red',
    label: 'А'
  }
};

export const IconReact: Story = {
  args: {
    label: '',
    backColor: 'blue',
    icon: <FcCloth />
  }
};

export const IconImage: Story = {
  args: {
    backColor: undefined,
    label: '32222',
    icon: collapseAnalysisIcon,
    paddingControl: undefined,
    borderStyle: 'solid',
    fontBold: true,
    textEffect: 'shadow',
    textColor: 'blue',
    borderRadius: '5%'
  }
};

export const IconImageStyle: Story = {
  args: {
    backColor: undefined,
    label: '32222',
    icon: collapseAnalysisIcon,
    paddingControl: undefined,
    borderStyle: 'solid',
    fontBold: true,
    textEffect: 'shadow',
    textColor: 'blue',
    iconStyle: { marginLeft: '1rem', marginRight: '1rem', width: '64px', height: '64px' }
  }
};
