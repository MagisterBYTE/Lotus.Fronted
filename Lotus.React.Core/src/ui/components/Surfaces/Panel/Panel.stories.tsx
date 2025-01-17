import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from 'ui/components/Controls';
import { HorizontalStack, VerticalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeColorVariants, TThemeModeColors } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TIconPlacements, TTextEffects } from 'ui/types';
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
    // IGeneralBaseElementProperties
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2 } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3 } },
    extraClass: { table: { disable: true } },

    // IPanelProps
    shadowElevation: { control: 'number', table: { category: 'Panel', order: 4 } },
    header: { table: { disable: true }},

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },
    backColorVariant: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 11  }},

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Text', order: 18 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', options: [...TCssBorderStyles, undefined], table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Border', order: 24 } },

    // IGeneralIconProperties
    iconColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Icon', order: 27 } },
    iconStyle: { table: { disable: true } },
    iconPlacement: { control: 'inline-radio', options: [...TIconPlacements, undefined], table: { category: 'Icon', order: 28 } },
    imageDatabase: { table: { disable: true } },

    icon: { table: { disable: true }},
    onClick: { table: { disable: true }},
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
              hasShadowBoxEffect={true}
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
              hasShadowBoxEffect={true}
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