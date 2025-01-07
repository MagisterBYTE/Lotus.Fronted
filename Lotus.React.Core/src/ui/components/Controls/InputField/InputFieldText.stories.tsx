import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TThemeColors, TThemeModeColors } from 'ui/theme';
import { TControlPaddings, TControlSizes, TCssBorderStyles, TTextEffects } from 'ui/types';
import { Button } from '../Button';
import { InputField } from './InputField';

const meta = {
  title: 'Controls/InputField',
  component: InputField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onChange: fn() },

  argTypes: {

    // IGeneralBaseElementProperties
    disabled: { control: 'boolean', table: { category: 'Base', order: 1 } },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined], table: { category: 'Base', order: 2 } },
    paddingControl: { control: 'inline-radio', options: [...TControlPaddings, undefined], table: { category: 'Base', order: 3 } },
    extraClass: { table: { disable: true } },

    // IInputFieldProps
    rightElement: { table: { disable: true } },
    hasRippleEffect: { control: 'boolean', table: { category: 'InputField', order: 6 } },
    hasScaleEffect: { control: 'boolean', table: { category: 'InputField', order: 7 } },
    hasShadowBorderEffect: { control: 'boolean', table: { category: 'InputField', order: 8 } },
    hasShadowBoxEffect: { control: 'boolean', table: { category: 'InputField', order: 9 } },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined], table: { category: 'Background', order: 10 } },

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

    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    backImage: { table: { disable: true } }
  }

} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelTop: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    labelProps: { label: 'Имя', variant: 'medium', isTopLabel: true }
  }
};


export const LabelLeft: Story = {
  args: {
    textColor: 'blue',
    backColor: 'blue',
    placeholder: 'Введите текст',
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false }
  }
};

export const Password: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'password'
  }
};

export const Color: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'color'
  }
};

export const DatetimeLocal: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'datetime-local'
  }
};

export const NumberLocal: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'number'
  }
};

export const Search: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'search'
  }
};

export const Telephone: Story = {
  args: {
    textColor: 'blue',
    placeholder: 'Введите текст',
    type: 'tel'
  }
};

export const Disabled: Story = {
  args: {
    textColor: 'blue',
    disabled: true
  }
};

export const InputFieldWithButton: Story = {
  args: {
    textColor: 'blue',
    disabled: true
  },
  render: (args) =>
  {
    return (
      <HorizontalStack gap='0.5rem' >
        <InputField labelProps={{ label: 'Введите фамилию' }}
          size={args.size}
          textEffect={args.textEffect}
          fontBold={args.fontBold}
          borderRadius={args.borderRadius}
          textColor={args.textColor}
          backColor={args.backColor}
          borderColor={args.borderColor}
          paddingControl={args.paddingControl}
          disabled={args.disabled} />
        <Button children='Отправить'
          borderRadius={args.borderRadius}
          size={args.size}
          textColor={args.textColor}
          backColor={args.backColor}
          textEffect={args.textEffect}
          borderColor={args.borderColor}
          fontBold={args.fontBold}
          hasShadowBoxEffect={true}
          disabled={args.disabled}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};


