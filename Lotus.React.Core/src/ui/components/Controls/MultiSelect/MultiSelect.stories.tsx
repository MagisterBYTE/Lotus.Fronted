import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorTypes, TControlPaddings, TControlSizes } from 'ui/types';
import { HorizontalStack } from 'ui/components/Layout';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { MultiSelect } from './MultiSelect';
import { SelectOptionsIconsBase, SelectOptionsIconsSvg, SelectOptionsText } from '.storydata/SelectOptionsData';

const meta = {
  title: 'Controls/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onSetSelectedValues: fn() },
  argTypes: {
    borderRounded: {
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
    initialSelectedValues:
    {
      table:
      {
        disable: true
      }
    },
    onSetSelectedValues:
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

} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconsIcons: Story = {
  args: {
    options: SelectOptionsIconsSvg,
    isDisabled: true,
    width: '200px',
    hasIcons: true
  }
};

export const IconsBase: Story = {
  args: {
    options: SelectOptionsIconsBase,
    hasIcons: true,
    width: '300px',
    isSearchable: false
  }
};

export const LabelLeft: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: false },
    options: SelectOptionsText
  }
};

export const LabelTop: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: 'medium', isTopLabel: true, style: { marginLeft: '0.4rem' } },
    options: SelectOptionsText
  }
};


export const HorizontalSpaceText: Story = {
  args: {
    color: 'info',
    options: SelectOptionsText
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <MultiSelect borderRounded={args.borderRounded} options={args.options} color={args.color} size={args.size} paddingControl={args.paddingControl} width='600px' />
        <InputField borderRounded={args.borderRounded} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button borderRounded={args.borderRounded} children='Отправить' size={args.size} color={args.color} paddingControl={args.paddingControl} />
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
        <MultiSelect hasIcons={true} isClearable options={args.options} borderRounded={args.borderRounded} isDisabled={args.isDisabled}
          color={args.color} size={args.size} paddingControl={args.paddingControl} width='400px' />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} borderRounded={args.borderRounded} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить' size={args.size} borderRounded={args.borderRounded} color={args.color} paddingControl={args.paddingControl} />
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
        <MultiSelect hasIcons={true} isClearable options={args.options} borderRounded={args.borderRounded} isDisabled={args.isDisabled}
          color={args.color} size={args.size} paddingControl={args.paddingControl} width='600px' />
        <InputField disabled={args.isDisabled} labelProps={{ label: 'Введите фамилию', isTopLabel: false }} borderRounded={args.borderRounded} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button disabled={args.isDisabled} children='Отправить' size={args.size} borderRounded={args.borderRounded} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};