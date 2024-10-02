import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TControlSizes, TControlPaddings, TTextEffects } from 'ui/types';
import { TThemeColors } from 'ui/theme';
import { Button } from '../Button';
import { InputField } from './InputField';

const meta = {
  title: 'Controls/InputField',
  component: InputField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onClick: fn() },

  argTypes: {
    // IGeneralBorderProperties
    borderRadius: { control: 'boolean' },
    borderStyle: { control: 'inline-radio' },
    borderWidth: { control: 'number' },
    borderColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

    // IGeneralBackgroundProperties
    backColor: { control: 'inline-radio', options: [...TThemeColors, undefined] },

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

    // IInputFieldProps
    rightElement: { table: { disable: true } },
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
          hasShadowEffect={true}
          disabled={args.disabled}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};


