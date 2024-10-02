import type { Meta, StoryObj } from '@storybook/react';
import { Theme, TThemeColor, TThemeColors } from './types';

const DivColorsColumn = (colorTheme:TThemeColor, isHarmonious?: boolean) =>
{
  return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10, backgroundColor: 'lightcoral'}}>
    <div style={{...Theme.getColorsProps(colorTheme, 'black', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - black</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'darkest', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - darkest</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'dark', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - dark</div>
    <div style={{...Theme.getColorsProps(colorTheme, undefined, isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - main</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'light', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - light</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'lighter', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - lighter</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'pale', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - pale</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'palest', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - palest</div>
    <div style={{...Theme.getColorsProps(colorTheme, 'white', isHarmonious), margin: 10, padding: 5, minWidth: 100}}>{colorTheme} - white</div>
  </div>
}

interface IDivColorsProps
{
  isHarmonious: boolean;
}

const DivColors = (props: IDivColorsProps) =>
{
  return <div style={{display: 'flex', flexDirection: 'row'}}>
    {
      TThemeColors.map(x =>
      {
        return DivColorsColumn(x, props.isHarmonious)
      }
      )
    }
  </div>
}

const meta = {
  title: 'Theme/Colors',
  component: DivColors,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { },

  argTypes: 
  {
  }

} satisfies Meta<typeof DivColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorsContrast: Story = {
  args: {
    isHarmonious: false
  }
};

export const ColorsHarmonious: Story = {
  args: {
    isHarmonious: true
  }
};
