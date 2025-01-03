import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FcCloth } from 'react-icons/fc';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
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

    // IGeneralIconProperties
    icon: { table: { disable: true } },
    iconColor: { table: { disable: true } },
    iconStyle: { table: { disable: true } },

    // IChipProps
    backColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },
    textColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] }
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
    textColor: 'blue'
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
    iconStyle: { marginLeft: '20px' }
  }
};
