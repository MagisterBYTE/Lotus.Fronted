import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GiAnt } from 'react-icons/gi';
import { HorizontalStack } from 'ui/components/Layout';
import { TControlPaddings, TControlSizes, TTextEffects } from 'ui/types';
import { TThemeColors } from 'ui/theme';
import { Button } from './Button';
import { hydraulicAnalysisIcon } from '.storydata/IconsBase64';

const meta = {
  title: 'Controls/Button',
  component: Button,
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
    textEffect: {
      control: 'inline-radio',
      options: [...TTextEffects, undefined]
    },
    textAlign:
    {
      control: 'inline-radio',
      options: ['left', 'right', 'center', undefined]
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
    disabled: false,
    children: 'Button',
    style: {width: '200px'}
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
