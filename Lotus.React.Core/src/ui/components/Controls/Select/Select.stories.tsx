import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HorizontalStack } from 'ui/components/Layout';
import { TColorTypes, TControlPaddings, TControlSizes } from 'ui/types';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { Select } from './Select';
import { SelectOptionsIconsBase, SelectOptionsIconsSvg, SelectOptionsText } from '.storydata/SelectOptionsData';

const meta = {
  title: 'Controls/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onSetSelectedValue: fn() },
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
    hasIcons:
    {
      table:
      {
        disable: true
      }
    },
    initialSelectedValue:
    {
      table:
      {
        disable: true
      }
    },
    onSetSelectedValue:
    {
      table:
      {
        disable: true
      }
    },
    options:
    {
      table:
      {
        disable: true
      }
    },
    rightElement:
    {
      table:
      {
        disable: true
      }
    },
    labelProps:
    {
      table:
      {
        disable: true
      }
    }
  }

} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconsIcons: Story = {
  args: {
    options: SelectOptionsIconsSvg,
    width: '200px',
    hasIcons: true,
    isSearchable: false,
    isClearable: true
  }
};

export const IconsBase: Story = {
  args: {
    options: SelectOptionsIconsBase,
    hasIcons: true,
    width: '300px',
    isSearchable: false,
    isClearable: true
  }
};

export const LabelLeft: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false },
    options: SelectOptionsText,
    width: '400px',
    isClearable: true
  }
};

export const LabelTop: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: true, style: { marginLeft: '0.4rem' } },
    options: SelectOptionsText,
    width: '400px',
    isClearable: true
  }
};

export const HorizontalSpaceText: Story = {
  args: {
    color: 'secondary',
    isDisabled: true,
    options: SelectOptionsText
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <Select isClearable options={args.options} hasRadius={args.hasRadius} isDisabled={args.isDisabled}
          color={args.color} size={args.size} paddingControl={args.paddingControl} width='200px' />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} hasRadius={args.hasRadius} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить' size={args.size} hasRadius={args.hasRadius} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};

export const HorizontalSpaceIconsSvg: Story = {
  args: {
    color: 'secondary',
    options: SelectOptionsIconsSvg
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <Select hasIcons={true} isClearable options={args.options} hasRadius={args.hasRadius} isDisabled={args.isDisabled}
          color={args.color} size={args.size} paddingControl={args.paddingControl} width='200px' />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} hasRadius={args.hasRadius} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить' size={args.size} hasRadius={args.hasRadius} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};

export const HorizontalSpaceIconsBase: Story = {
  args: {
    color: 'secondary',
    options: SelectOptionsIconsBase
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <Select hasIcons={true} isClearable options={args.options} hasRadius={args.hasRadius} isDisabled={args.isDisabled}
          color={args.color} size={args.size} paddingControl={args.paddingControl} width='400px' />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} hasRadius={args.hasRadius} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить' size={args.size} hasRadius={args.hasRadius} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};
