import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import type { ThemeConfig } from "storybook-addon-data-theme-switcher";
import { storeCore } from '../src/app/store';
import { ThemeProvider } from '../src/ui/theme';
import "../src/app/styles/index";

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
    (Story, { parameters }) =>
    {
      return (
        <ThemeProvider>
          <Provider store={storeCore}>
            <Story />
          </Provider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Light", dataTheme: "light", color: "#f0f0f0" },
        { name: "Dark", dataTheme: "dark", color: "#0a0a0a" },
        { name: "Coffee", dataTheme: "coffee", color: "#bea68c" },
      ],
      dataAttribute: "data-theme",            // optional (default: "data-theme")
      clearable: true,                        // optional (default: true)
      toolbar: {
        title: "Change data-theme attribute", // optional
        icon: "paintbrush",                   // optional
      },
    } satisfies ThemeConfig,
  },
};