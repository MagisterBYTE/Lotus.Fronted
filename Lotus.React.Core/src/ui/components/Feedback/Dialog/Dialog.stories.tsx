import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TControlSizes, TControlPaddings, TCssBorderStyles, TTextEffects } from 'ui/types';
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

    // IDialogProps
    hasHeaderDivider: { control: 'boolean' },
    hasFooterDivider: { control: 'boolean' },
    shadowElevation: { control: 'number' },
    header: { table: { disable: true }},
    headerTypographyProps: { table: { disable: true }},
    children: { table: { disable: true }},
    style: { table: { disable: true }},
    backImage: { table: { disable: true }}
  }

} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'Сохранить файл',
    isMoveable: true
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
          style={{width: '400px', height: '300px'}}
          {...args}
          ref={ref}>
          Мне нужна от Вас справка что я не получал единовременное пособие по рождению ребенка
        </Dialog>
      </div>
    );
  }
};

export const Vintage: Story = {
  args: {
    header: 'Сохранить файл',
    isMoveable: true,
    borderRadius: undefined,
    borderStyle: 'outset',
    backColorVariant: 'palest',
    shadowElevation: 4,
    hasHeaderDivider: false,
    hasFooterDivider: false,
    borderWidth: 4,
    backColor: 'brown',
    textEffect: 'shadow',
    paddingControl: 'normal'
  },

  render: args => 
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
      (<div>
        <button onClick={handleOpenDialog}>Open Dialog</button>
        <Dialog
          style={{
            width: '400px',
            height: '300px'
          }}
          {...args}
          ref={ref}>Мне нужна от Вас справка что я не получал единовременное пособие по рождению ребенка
        </Dialog>
      </div>)
    );
  }
};
