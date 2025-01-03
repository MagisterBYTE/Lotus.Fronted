import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from 'ui/components/Controls';
import { HorizontalStack, VerticalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
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
    // IGeneralBorderProperties
    borderRadius: { control: 'boolean' },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined] },
    borderWidth: { control: 'number' },
    borderColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },
    backColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined] },

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

    // IPanelProps
    shadowElevation: { control: 'number' },
    header: { table: { disable: true }},
    headerTypographyProps: { table: { disable: true }},
    children: { table: { disable: true }},
    style: { table: { disable: true }},
    backImage: { table: { disable: true }}
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
      <Panel {...args}>
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={4} justifyContent='end'>
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              textColor={args.textColor}
              size={args.size} 
              paddingControl={args.paddingControl} 
              children='Отмена' />
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              textColor={args.textColor}
              size={args.size} 
              paddingControl={args.paddingControl}  
              children='Подтверждаю' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>
    )
  }
};

export const Classical: Story = {
  args: {
    borderStyle: 'solid',
    borderWidth: 1,
    backColorVariant: 'palest',
    backColor: 'blue',
    borderColor: 'blueGrey',
    textColorHarmonious: true,
    paddingControl: 'normal',
    borderRadius: true,
    shadowElevation: 4,
    header: 'Простая панель'
  },

  render: (args) =>
  {
    return (
      <Panel {...args}>
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={4} justifyContent='end'>
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              hoverBackColor='light'
              textColor={args.textColor}
              size={args.size} 
              hasShadowEffect={true}
              paddingControl={args.paddingControl}  
              children='Подтверждаю' />
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              hoverBackColor='light'
              textColor={args.textColor}
              size={args.size} 
              hasShadowEffect={true}
              paddingControl={args.paddingControl} 
              variant='outline'
              children='Отмена' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>
    )
  }
};

export const Vintage: Story = {
  args: {
    borderStyle: 'outset',
    borderWidth: 3,
    backColorVariant: 'palest',
    backColor: 'brown',
    borderColor: 'brown',
    textColorHarmonious: true,
    paddingControl: 'normal',
    header: 'Простая панель'
  },

  render: (args) =>
  {
    return (
      <Panel {...args}>
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={4} justifyContent='end'>
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              hoverBackColor='light'
              textColor={args.textColor}
              size={args.size} 
              paddingControl={args.paddingControl}  
              children='Подтверждаю' />
            <Button 
              borderRadius={args.borderRadius} 
              borderStyle={args.borderStyle} 
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              hoverBackColor='light'
              textColor={args.textColor}
              size={args.size} 
              paddingControl={args.paddingControl} 
              children='Отмена' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>
    )
  }
};

export const Contrast: Story = {
  args: {
    borderColor: 'amber',
    textColor: 'yellow',
    backColor: 'blueGrey',
    borderWidth: 2,
    textEffect: 'shadow',
    header: 'Простая панель'
  },

  render: args => 
  {
    return (
      (<Panel {...args}>
        <VerticalStack gap={2}>
          {SmallText()}
          <HorizontalStack fullWidth gap={4} justifyContent='end'>
            <Button
              borderRadius={args.borderRadius}
              borderStyle={args.borderStyle}
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              textColor={args.textColor}
              size={args.size}
              paddingControl={args.paddingControl}
              children='Отмена' />
            <Button
              borderRadius={args.borderRadius}
              borderStyle={args.borderStyle}
              borderWidth={args.borderWidth}
              borderColor={args.borderColor}
              backColor={args.backColor}
              textColor={args.textColor}
              size={args.size}
              paddingControl={args.paddingControl}
              children='Подтверждаю' />
          </HorizontalStack>
        </VerticalStack>
      </Panel>)
    );
  }
};