import type { Preview, ReactRenderer, StoryContext } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { storeCore } from '../src/app/store';
import { ThemeProvider, useThemeSelector } from '../src/ui/theme';
import "../src/app/styles/index";
import { PartialStoryFn } from 'storybook/internal/types';

interface IThemeDecoratorProps
{
  Story: PartialStoryFn<ReactRenderer, {[x: string]: any;}>;
  context: StoryContext<{ [x: string]: any; }>
}

const ThemeDecorator: React.FC<IThemeDecoratorProps> = ({ Story, context }: IThemeDecoratorProps) =>
{
  const { setTheme, theme } = useThemeSelector();

  useEffect(() =>
  {
    const globalTheme = context.globals?.backgrounds?.value; 

    if(globalTheme === '#333')
    {
      setTheme({ color: theme.color, mode: 'dark' });
      console.log('setTheme dark');
    }
    else
    {
      setTheme({ color: theme.color, mode: 'light' });
      console.log('setTheme light');
    } 

  }, [context.globals.backgrounds.value]);

  return (
      <Story globals={context.globals}/>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    (Story, { parameters, context }) =>
    {
      return (
        <ThemeProvider>
          <Provider store={storeCore}>
            <ThemeDecorator Story={Story} context={context} />
          </Provider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;