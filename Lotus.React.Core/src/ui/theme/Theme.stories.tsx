import type { Meta, StoryObj } from '@storybook/react';
import { Button, CheckBox, HorizontalStack, InputField, Label, Panel, SelectOption, VerticalStack } from 'ui/components';
import { TColorPresentation, TControlSize, TControlSizes, TCssBorderRadius, TShadowElevation } from 'ui/types';
import { TThemeColor, TThemeColors, TThemeModeColors } from './types';
import { ThemeHelper } from './helpers';
import { OptionsTextAndIconReact } from '.storydata/OptionsData';

const DivColorsColumn = (colorTheme: TThemeColor, isHarmonious?: boolean) =>
{
  return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10, backgroundColor: 'lightcoral' }}>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'black', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - black</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'darkest', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - darkest</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'dark', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - dark</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, undefined, isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - main</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'light', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - light</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'lighter', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - lighter</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'pale', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - pale</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'palest', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - palest</div>
    <div style={{ ...ThemeHelper.getColorsProps(colorTheme, 'white', isHarmonious), margin: 10, padding: 5, minWidth: 100 }}>{colorTheme} - white</div>
  </div>
}

interface IDivColorsProps
{
  isDisabled?: boolean;
  borderRadius?: TCssBorderRadius;
  isHarmonious: boolean;
  backColor?: TColorPresentation;
  textColor?: TColorPresentation;
  size?: TControlSize;
  shadowElevation?: TShadowElevation;
}

const DivColors = (props: IDivColorsProps) =>
{
  return <div style={{ display: 'flex', flexDirection: 'row' }}>
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

  args: {},

  argTypes:
  {
    isDisabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: [...TControlSizes, undefined] },
    backColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined] },
    textColor: { control: 'inline-radio', options: [...TThemeModeColors, ...TThemeColors, undefined] },
    borderRadius: { control: 'boolean' },
    shadowElevation: { control: 'number' }
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

export const SimpleDarkTheme: Story = {
  args: {
    isHarmonious: true
  },
  render: (args) =>
  {
    return (

      <Panel borderRadius={args.borderRadius} borderStyle='double' backColor={args.backColor} header='Личные данные'
        size={args.size}
        shadowElevation={args.shadowElevation}
        headerTypographyProps={{ fontBold: true, textEffect: 'shadow', textColor: args.textColor }} >
        <VerticalStack style={{ width: '400px', padding: '1rem' }} gap='0.5rem'>
          <InputField labelProps={
            { label: 'Фамилия', textColor: args.textColor, labelWidth: '60%' }}
          size={args.size}
          backColor={args.backColor}
          textColor={args.textColor}
          disabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <InputField labelProps={
            { label: 'Имя', textColor: args.textColor, labelWidth: '60%' }}
          size={args.size}
          backColor={args.backColor}
          textColor={args.textColor}
          disabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <InputField labelProps={
            { label: 'Отчество', textColor: args.textColor, labelWidth: '60%' }}
          size={args.size}
          backColor={args.backColor}
          textColor={args.textColor}
          disabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <InputField labelProps={
            { label: 'Сфера деятельности', textColor: args.textColor, labelWidth: '60%' }}
          size={args.size}
          backColor={args.backColor}
          textColor={args.textColor}
          disabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <SelectOption labelProps={
            { label: 'Раса', textColor: args.textColor, labelWidth: '60%' }} options={OptionsTextAndIconReact}
          size={args.size}
          backColor={args.backColor}
          isDisabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <CheckBox labelProps={
            { label: 'Мормоны', textColor: args.textColor, labelWidth: '60%' }}
          size={args.size}
          backColor={args.backColor}
          disabled={args.isDisabled}
          borderRadius={args.borderRadius}
          width='100%' />
          <HorizontalStack gap={2}  justifyContent='space-between' fullWidth>
            <Label 
              textColor={args.backColor}
              size={args.size}
              children='Клинки'/>
            <CheckBox 
              size={args.size}
              textColor={args.textColor}
              backColor={args.backColor}
              disabled={args.isDisabled}
              borderRadius={args.borderRadius}
              name='Blades' type='radio'>Длинные</CheckBox>
            <CheckBox 
              size={args.size}
              textColor={args.textColor}
              backColor={args.backColor}
              disabled={args.isDisabled}
              borderRadius={args.borderRadius}
              name='Blades'type='radio'>Короткие</CheckBox>
          </HorizontalStack>
          <HorizontalStack gap={2} justifyContent='space-around' fullWidth >
            <Button variant='filled'
              size={args.size}
              backColor={args.backColor}
              disabled={args.isDisabled}
              borderRadius={args.borderRadius}
            >Filled</Button>
            <Button variant='outline'
              size={args.size}
              backColor={args.backColor}
              disabled={args.isDisabled}
              borderRadius={args.borderRadius}
            >Outline</Button>
            <Button variant='text'
              size={args.size}
              backColor={args.backColor}
              disabled={args.isDisabled}
              borderRadius={args.borderRadius}
            >Text</Button>
          </HorizontalStack>

        </VerticalStack>
      </Panel>
    );
  }
};
