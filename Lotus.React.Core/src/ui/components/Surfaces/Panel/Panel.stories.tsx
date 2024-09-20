import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TControlPaddings, TControlSizes } from 'ui/types';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { HorizontalStack, VerticalStack } from 'ui/components/Layout';
import { Button } from 'ui/components/Controls';
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
    borderRounded: {
      control: 'boolean'
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

export const Dialog: Story = {
  args: {
  },

  render: (args) =>
  {
    return (
      <Panel borderRounded={args.borderRounded} size={args.size}
        color={args.color} paddingControl={args.paddingControl} colorVariant={args.colorVariant} variant={args.variant}  >
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={2} justifyContent='end'>
            <Button borderRounded={args.borderRounded} size={args.size} color={args.color} paddingControl={args.paddingControl} children='Отмена' />
            <Button borderRounded={args.borderRounded} size={args.size} color={args.color} paddingControl={args.paddingControl} children='Подтверждаю' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>
    )
  }
};