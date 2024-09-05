import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GiAnt } from 'react-icons/gi';
import { HorizontalStack } from 'ui/components/Layout';
import { TColorTypes, TControlPaddings, TControlSizes } from 'ui/types';
import { hydraulicAnalysisIcon } from '../../../../.storydata/IconsBase64';
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
      control: 'inline-radio'
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

} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const ButtonIconReact: Story = {
  args: {
    style: { margin: '0px' },
    children: <GiAnt />
  }
};

export const ButtonIconSvg: Story = {
  args: {
    disabled: true,
    style: { margin: '0px' },
    children: <img src={hydraulicAnalysisIcon} width='24px' height='24px' />
  }
};

export const ButtonIconText: Story = {
  args: {
    style: { margin: '0px' },
    children: <HorizontalStack gap='0.5rem' alignItems='center' ><GiAnt /><span>ButtonIconText</span></HorizontalStack>
  }
};


export const Disabled: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    disabled: true
  }
};
