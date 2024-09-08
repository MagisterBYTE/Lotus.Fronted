import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FcCloth } from 'react-icons/fc';
import { TColorTypes, TControlPaddings, TControlSizes } from 'ui/types';
import { Chip } from './Chip';
import { TChipVariants } from './ChipVariant';
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
    hasRadius: {
      control: 'boolean'
    },
    color: {
      control: 'inline-radio',
      options: [...TColorTypes, undefined]
    },
    size: {
      control: 'inline-radio',
      options: [...TControlSizes, undefined]
    },
    paddingControl: {
      control: 'inline-radio',
      options: [...TControlPaddings, undefined]
    },
    variant: {
      control: 'inline-radio',
      options: [...TChipVariants, undefined]
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
    label: <FcCloth />
  }
};

export const IconBase: Story = {
  args: {
    color: 'info',
    label: collapseAnalysisIcon
  }
};
