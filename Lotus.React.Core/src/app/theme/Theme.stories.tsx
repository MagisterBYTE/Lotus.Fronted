import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ThemeHelper } from './helpers';

const DivColors = () =>
{
  return <div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-body-bg)', ...ThemeHelper.getForegroundColorForBackAsCSS('main'),
        margin: 10, padding: 5, minWidth: 100}}>Main</div>
      <div style={{backgroundColor: 'var(--lotus-secondary-bg)', ...ThemeHelper.getForegroundColorForBackAsCSS('secondary'),
        margin: 10, padding: 5, minWidth: 100}}>Secondary</div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-color-primaryDarker)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'darker'),
        margin: 10, padding: 5, minWidth: 100}}>PrimaryDarker</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryDark)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'dark'),
        margin: 10, padding: 5, minWidth: 100}}>PrimaryDark</div>
      <div style={{backgroundColor: 'var(--lotus-color-primary)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary'),
        margin: 10, padding: 5,  minWidth: 100}}>Primary</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryLight)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'light'),
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryLight</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryLighter)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'lighter'),
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryLighter</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryPalest)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'palest'), 
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryPalest</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryAlpha02)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'alpha02'), 
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryAlpha02</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'alpha04'),
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryAlpha04</div>
      <div style={{backgroundColor: 'var(--lotus-color-primaryAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('primary', 'alpha08'),
        margin: 10, padding: 5,  minWidth: 100}}>PrimaryAlpha08</div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-color-successDarker)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'darker'),
        margin: 10, padding: 5,  minWidth: 100}}>successDarker</div>
      <div style={{backgroundColor: 'var(--lotus-color-successDark)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'dark'),
        margin: 10, padding: 5,  minWidth: 100}}>successDark</div>
      <div style={{backgroundColor: 'var(--lotus-color-success)', ...ThemeHelper.getForegroundColorForBackAsCSS('success'),
        margin: 10, padding: 5,  minWidth: 100}}>success</div>
      <div style={{backgroundColor: 'var(--lotus-color-successLight)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'light'),
        margin: 10, padding: 5,  minWidth: 100}}>successLight</div>
      <div style={{backgroundColor: 'var(--lotus-color-successLighter)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'lighter'),
        margin: 10, padding: 5,  minWidth: 100}}>successLighter</div>
      <div style={{backgroundColor: 'var(--lotus-color-successPalest)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'palest'),
        margin: 10, padding: 5,  minWidth: 100}}>successPalest</div>
      <div style={{backgroundColor: 'var(--lotus-color-successAlpha02)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'alpha02'),
        margin: 10, padding: 5,  minWidth: 100}}>successAlpha02</div>
      <div style={{backgroundColor: 'var(--lotus-color-successAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'alpha04'),
        margin: 10, padding: 5,  minWidth: 100}}>successAlpha04</div>
      <div style={{backgroundColor: 'var(--lotus-color-successAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('success', 'alpha08'),
        margin: 10, padding: 5,  minWidth: 100}}>successAlpha08</div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-color-dangerDarker)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'darker'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerDarker</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerDark)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'dark'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerDark</div>
      <div style={{backgroundColor: 'var(--lotus-color-danger)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger'),
        margin: 10, padding: 5,  minWidth: 100}}>danger</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerLight)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'light'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerLight</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerLighter)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'lighter'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerLighter</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerPalest)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'palest'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerPalest</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerAlpha02)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'alpha02'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerAlpha02</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'alpha04'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerAlpha04</div>
      <div style={{backgroundColor: 'var(--lotus-color-dangerAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('danger', 'alpha08'),
        margin: 10, padding: 5,  minWidth: 100}}>dangerAlpha08</div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-color-warningDarker)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'darker'),
        margin: 10, padding: 5,  minWidth: 100}}>warningDarker</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningDark)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'dark'),
        margin: 10, padding: 5,  minWidth: 100}}>warningDark</div>
      <div style={{backgroundColor: 'var(--lotus-color-warning)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning'),
        margin: 10, padding: 5,  minWidth: 100}}>warning</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningLight)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'light'),
        margin: 10, padding: 5,  minWidth: 100}}>warningLight</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningLighter)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'lighter'),
        margin: 10, padding: 5,  minWidth: 100}}>warningLighter</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningPalest)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'palest'),
        margin: 10, padding: 5,  minWidth: 100}}>warningPalest</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningAlpha02)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'alpha02'),
        margin: 10, padding: 5,  minWidth: 100}}>warningAlpha02</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'alpha04'),
        margin: 10, padding: 5,  minWidth: 100}}>warningAlpha04</div>
      <div style={{backgroundColor: 'var(--lotus-color-warningAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('warning', 'alpha08'),
        margin: 10, padding: 5,  minWidth: 100}}>warningAlpha08</div>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
      <div style={{backgroundColor: 'var(--lotus-color-infoDarker)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'darker'),
        margin: 10, padding: 5,  minWidth: 100}}>infoDarker</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoDark)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'dark'),
        margin: 10, padding: 5,  minWidth: 100}}>infoDark</div>
      <div style={{backgroundColor: 'var(--lotus-color-info)', ...ThemeHelper.getForegroundColorForBackAsCSS('info'),
        margin: 10, padding: 5,  minWidth: 100}}>info</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoLight)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'light'),
        margin: 10, padding: 5,  minWidth: 100}}>infoLight</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoLighter)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'lighter'),
        margin: 10, padding: 5,  minWidth: 100}}>infoLighter</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoPalest)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'palest'),
        margin: 10, padding: 5,  minWidth: 100}}>infoPalest</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoAlpha02)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'alpha02'),
        margin: 10, padding: 5,  minWidth: 100}}>infoAlpha02</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'alpha04'),
        margin: 10, padding: 5,  minWidth: 100}}>infoAlpha04</div>
      <div style={{backgroundColor: 'var(--lotus-color-infoAlpha04)', ...ThemeHelper.getForegroundColorForBackAsCSS('info', 'alpha08'),
        margin: 10, padding: 5,  minWidth: 100}}>infoAlpha08</div>
    </div>
  </div>
}

const meta = {
  title: 'Theme/Colors',
  component: DivColors,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  args: { onClick: fn() },

  argTypes: {
  }

} satisfies Meta<typeof DivColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
  },

  render: ()=>
  {
    return <>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
          <div style={{backgroundColor: 'var(--lotus-body-bg)', color: 'var(--lotus-body-color)',  margin: 10, padding: 5, minWidth: 100}}>Main block</div>
          <div style={{backgroundColor: 'var(--lotus-secondary-bg)', color: 'var(--lotus-secondary-color)',  margin: 10, padding: 5, minWidth: 100}}>Secondary block</div>
          <div style={{backgroundColor: 'var(--lotus-tertiary-bg)', color: 'var(--lotus-tertiary-color)',  margin: 10, padding: 5, minWidth: 100}}>Tertiary block</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
          <div style={{backgroundColor: 'var(--lotus-body-bg)', color: 'var(--lotus-body-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Main block</div>
          <div style={{backgroundColor: 'var(--lotus-secondary-bg)', color: 'var(--lotus-secondary-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Secondary block</div>
          <div style={{backgroundColor: 'var(--lotus-tertiary-bg)', color: 'var(--lotus-tertiary-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Tertiary block</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', padding: 10}}>
          <div style={{backgroundColor: 'var(--lotus-body-bg)', color: 'var(--lotus-body-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Main block</div>
          <div style={{backgroundColor: 'var(--lotus-secondary-bg)', color: 'var(--lotus-secondary-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Secondary block</div>
          <div style={{backgroundColor: 'var(--lotus-tertiary-bg)', color: 'var(--lotus-tertiary-color)', borderColor:'var(--lotus-border-color)',
            ...ThemeHelper.getBorderPropsAsCSS(),
            margin: 10, padding: 5, minWidth: 100}}>Tertiary block</div>
        </div>
      </div>
    </>
  }
};

export const Colors: Story = {
  args: {
  }
};
