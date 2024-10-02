import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FcCloth } from 'react-icons/fc';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlPaddings, TControlSizes, TTextEffects } from 'ui/types';
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
    borderRounded: {
      control: 'boolean'
    },
    borderStyle:
    {
      control: 'inline-radio'
    },
    color: {
      control: 'inline-radio',
      options: [...TThemeColors, undefined]
    },
    size: {
      control: 'inline-radio',
      options: [...TControlSizes, undefined]
    },
    paddingControl: {
      control: 'inline-radio',
      options: [...TControlPaddings, undefined]
    },
    colorVariant: {
      control: 'inline-radio',
      options: [...TThemeColorVariants, undefined]
    },
    textEffect: {
      control: 'inline-radio',
      options: [...TTextEffects, undefined]
    },
    textAlign:
    {
      control: 'inline-radio',
      options: ['left', 'right', 'center', undefined]
    },
    textColorHarmonious: {
      control: 'boolean'
    },
    fontAccent: {
      control: 'boolean'
    },
    onClick:
    {
      table:
      {
        disable: true
      }
    }
  }
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    label: 'А'
  }
};

export const Dark: Story = {
  args: {
    color: 'danger',
    label: 'А'
  }
};

export const IconSvg: Story = {
  args: {
    color: 'info',
    hasIcon:true,
    label: <FcCloth />
  }
};

export const IconBase: Story = {
  args: {
    color: 'info',
    hasIcon:true,
    label: collapseAnalysisIcon
  }
};
