import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TColorTypes, TControlSizes, TControlPaddings } from 'ui/types';
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
        <InputField labelProps={{ label: 'Введите фамилию' }} size={args.size} hasRadius={args.hasRadius} color={args.color} paddingControl={args.paddingControl} />
        <Button children='Отправить' hasRadius={args.hasRadius} size={args.size} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};


