import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Panel } from './Panel';
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
  }
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: SmallText()
  }
};