/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GiAnt } from 'react-icons/gi';
import { TColorPresentation, TControlPaddings, TControlSizes, TTextEffects } from 'ui/types';
import { TThemeColors, TThemeColorVariants, TThemeModeColors } from 'ui/theme';
import { Colors } from 'lotus-core';
import { Button } from './Button';
import { TButtonVariant } from './ButtonVariant';
import { hydraulicAnalysisIcon } from '.storydata/IconsBase64';

const DivButton = (variant: TButtonVariant, backColor: TColorPresentation, propsOther: any) =>
{
  return <Button 
    key={`${variant}_${backColor}`}
    style={{margin: '1rem'}} {...propsOther} backColor={backColor} variant={variant} >
    {variant}
  </Button>
}

const DivButtonsColumn = (backColor: TColorPresentation, propsOther: any) =>
{
  const variants:TButtonVariant[] = ['filled', 'outline', 'text', 'icon']
  return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
    {
      variants.map(x =>
      {
        return DivButton(x, backColor, propsOther)
      }
      )
    }
  </div>
}

const meta = {
  title: 'Controls/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls:
    {
      sort: 'requiredFirst'
    }
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes:
  {
    // IGeneralBaseElementProperties
    disabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2  } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3  } },
    extraClass: { table: { disable: true } },

    // IButtonBaseProps
    variant: { control: 'inline-radio', table: { category: 'Button', order: 4  } },
    hasIcon: { control: 'boolean', table: { category: 'Button', order: 5 } },
    hasBoxShadow: { control: 'boolean', table: { category: 'Button', order: 6 } },
    hasRippleEffect: { control: 'boolean', table: { category: 'Button', order: 7 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'Button', order: 8 } },
    hasShadowEffect: { control: 'boolean', table: { category: 'Button', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },
    hoverBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 11  }},
    pressedBackColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Background', order: 12 } },

    // IGeneralTextProperties
    fontBold: { control: 'boolean', table: { category: 'Text', order: 13 } },
    fontAccent: { control: 'boolean', table: { category: 'Text', order: 14 } },
    textEffect: { control: 'inline-radio', options: [...TTextEffects, undefined], table: { category: 'Text', order: 15 } },
    textAlign: { control: 'inline-radio', options: ['left', 'right', 'center', undefined], table: { category: 'Text', order: 16 } },
    textColorHarmonious: { control: 'boolean', table: { category: 'Text', order: 17 } },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Text', order: 18 } },
    hoverTextColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Text', order: 19 } },
    pressedTextColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Text', order: 20 } },

    // IGeneralBorderProperties
    borderRadius: { control: 'boolean', table: { category: 'Border', order: 21 } },
    borderStyle: { control: 'inline-radio', table: { category: 'Border', order: 22 } },
    borderWidth: { control: 'number', table: { category: 'Border', order: 23 } },
    borderColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Border', order: 24 } },
    hoverBorderColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Border', order: 25 } },
    pressedBorderColor: { control: 'inline-radio', options: [...TThemeColorVariants, undefined], table: { category: 'Border', order: 26 } },

    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonVariants: Story = {
  name: 'Variants',
  args: {
  },
  render: (args) =>
  {
    const colors:TColorPresentation[] = [...TThemeModeColors, ...TThemeColors];
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        colors.map(x =>
        {
          return DivButtonsColumn(x, args)
        }
        )
      }
    </div>
  }
};

export const Outline: Story = {
  name: 'Outline',
  args: {
    disabled: false,
    variant: 'outline',
    children: 'Outline',
    borderStyle: 'solid'
  }
};

export const Text: Story = {
  name: 'Text',
  args: {
    disabled: false,
    variant: 'text',
    children: 'Text'
  }
};

export const IconReact: Story = {
  name: 'IconReact',
  args: {
    disabled: false,
    hasIcon: true,
    variant: 'icon',
    children: <GiAnt />
  }
};

export const IconImage: Story = {
  name: 'IconImage',
  args: {
    disabled: true,
    hasIcon: true,
    variant: 'icon',
    children: hydraulicAnalysisIcon
  }
};

export const MyBackColor: Story = {
  name: 'MyBackColor',
  args: {
    disabled: false,
    children: 'MyBackColor',
    variant: 'filled',
    backColor: Colors.coral,
    style: { width: '200px' }
  }
};

export const MyTextColor: Story = {
  name: 'MyTextColor',
  args: {
    disabled: false,
    children: 'MyTextColor',
    variant: 'filled',
    textColor: Colors.red,
    hoverTextColor: Colors.chocolate_1,
    pressedTextColor: Colors.chocolate_3,
    style: { width: '200px' }
  }
};

export const MyBackTextColor: Story = {
  name: 'MyBackTextColor',
  args: {
    disabled: false,
    children: 'MyBackTextColor',
    variant: 'filled',
    backColor: 'blueGrey',
    hoverBackColor: 'dark',
    pressedBackColor: 'darkest',
    textColor: Colors.red,
    hoverTextColor: Colors.chocolate_1,
    pressedTextColor: Colors.chocolate_3,
    style: { width: '200px' }
  }
};
