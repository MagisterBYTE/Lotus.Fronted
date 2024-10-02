import { useEffect, useState } from 'react';
import { Theme, TThemeData } from '../types';
import { ThemeColorPalettes } from '../constants';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = (props: { children: React.ReactNode }) => 
{
  const [theme, setTheme] = useState<TThemeData>(Theme.loadFromStorage());

  useEffect(() => 
  {
    // В хранилище
    Theme.saveToStorage(theme)

    // В документ
    document.documentElement.setAttribute(Theme.DataAttributeThemeMode, theme.mode);
    document.documentElement.setAttribute(Theme.DataAttributeThemeColor, theme.color);

    // В память
    Theme.currentPalette = ThemeColorPalettes.Palettes[theme.mode];
    Theme.currentColor = theme.color;
  }, [theme.mode, theme.color]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
