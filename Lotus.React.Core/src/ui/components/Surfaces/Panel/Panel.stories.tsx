import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorTypes, TControlPaddings, TControlSizes } from 'ui/types';
import { Panel } from './Panel';
import { TPanelVariants } from './PanelVariant';
import { SmallText } from '.storydata/SmallText';

const meta = {
  title: 'Surfaces/Panel',
  component: Panel,
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
    variant:
    {
      control:
      {
        type: 'inline-radio'
      },
      options: [...TPanelVariants, undefined]
    },
    elevation:
    {
      control:
      {
        type: 'number',
        max: 5,
        min: 1
      }
    },
    onClick:
    {
      table:
      {
        disable: true
      }
    }
    ,
    children:
    {
      table:
      {
        disable: true
      }
    }
  }
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: SmallText()
  }
};