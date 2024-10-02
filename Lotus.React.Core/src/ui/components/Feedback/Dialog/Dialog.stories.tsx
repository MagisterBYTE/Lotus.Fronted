import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TControlSizes, TControlPaddings, TShadowElevations, TCssBorderStyles } from 'ui/types';
import { TThemeColors, TThemeColorVariants } from 'ui/theme';
import { Dialog, IDialogComponent } from './Dialog';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

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
    colorVariant: {
      control: 'inline-radio',
      options: [...TThemeColorVariants, undefined]
    },
    shadowElevation:
    {
      control: 'inline-radio',
      options: [...TShadowElevations, undefined]
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
  }

} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'Сохранить файл'
  },

  render: (args) =>
  {
    const ref = React.createRef<IDialogComponent>();
    const handleOpenDialog = () => 
    {
      ref.current?.show();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCloseDialog = () => 
    {
      ref.current?.close();
    };

    return (
      <div>
        <button onClick={handleOpenDialog}>Open Dialog</button>
        <Dialog 
          style={{width: '60%', height: '50%'}}
          size={args.size}
          color={args.color}
          colorVariant={args.colorVariant}
          borderRounded={args.borderRounded}
          shadowElevation={args.shadowElevation}
          borderStyle={args.borderStyle}
          paddingControl={args.paddingControl}
          header={args.header} ref={ref}>
          Мне нужна от Вас справка что я не получал единовременное пособие по рождению ребенка
        </Dialog>
      </div>
    );
  }
};
