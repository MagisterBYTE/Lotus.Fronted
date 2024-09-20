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

} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelTop: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    labelProps: { label: 'Имя', variant: 'medium', isTopLabel: true }
  }
};


export const LabelLeft: Story = {
  args: {
    color: 'primary',
    isBackground: true,
    placeholder: 'Введите текст',
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false }
  }
};

export const Password: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'password'
  }
};

export const Color: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'color'
  }
};

export const DatetimeLocal: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'datetime-local'
  }
};

export const NumberLocal: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'number'
  }
};

export const Search: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'search'
  }
};

export const Telephone: Story = {
  args: {
    color: 'primary',
    placeholder: 'Введите текст',
    type: 'tel'
  }
};

export const Disabled: Story = {
  args: {
    color: 'primary',
    disabled: true
  }
};

export const InputFieldWithButton: Story = {
  args: {
    color: 'primary',
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
          borderRounded={args.borderRounded} 
          color={args.color} paddingControl={args.paddingControl} />
        <Button children='Отправить' 
          borderRounded={args.borderRounded} 
          size={args.size} 
          color={args.color} 
          textEffect={args.textEffect}
          fontBold={args.fontBold}
          hasShadowEffect={true}
          paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};


