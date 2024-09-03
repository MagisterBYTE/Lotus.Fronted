import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GiAnt } from 'react-icons/gi';
import { HorizontalStack } from 'ui/components/Layout';
import { Button } from './Button';

const meta = {
  title: 'Controls/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes: {
  }

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const ButtonIcon: Story = {
  args: {
    style: { margin: '0px' },
    children: <GiAnt />
  }
};

export const ButtonIconText: Story = {
  args: {
    style: { margin: '0px' },
    children: <HorizontalStack><GiAnt /><span>ButtonIconText</span></HorizontalStack>
  }
};


export const Disabled: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    disabled: true
  }
};
