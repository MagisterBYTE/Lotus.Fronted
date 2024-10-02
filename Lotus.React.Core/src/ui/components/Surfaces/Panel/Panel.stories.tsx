import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from 'ui/components/Controls';
import { HorizontalStack, VerticalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TShadowElevations, TTextEffects } from 'ui/types';
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
    borderRounded: {
      control: 'boolean'
    },
    borderStyle:
    {
      control: 'inline-radio',
      options: [...TCssBorderStyles, undefined]
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
    shadowElevation:
    {
      control: 'inline-radio',
      options: [...TShadowElevations, undefined]
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
    },
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
      <Panel borderRounded={args.borderRounded} size={args.size} borderStyle={args.borderStyle}
        color={args.color} paddingControl={args.paddingControl} colorVariant={args.colorVariant}
        textAlign={args.textAlign}
        textEffect={args.textEffect}
        shadowElevation={args.shadowElevation} >
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={4} justifyContent='end'>
            <Button borderRounded={args.borderRounded} size={args.size} color={args.color} paddingControl={args.paddingControl} children='Отмена' />
            <Button borderRounded={args.borderRounded} size={args.size} color={args.color} paddingControl={args.paddingControl} children='Подтверждаю' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>
    )
  }
};