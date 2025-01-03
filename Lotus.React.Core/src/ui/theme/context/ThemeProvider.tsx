import { useEffect, useState } from 'react';
import { Theme, TThemeData } from '../types';
import { ThemeColorPalettes, ThemeConstant } from '../constants';
import { ThemeHelper } from '../helpers';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = (props: { children: React.ReactNode }) => 
{
  const [theme, setTheme] = useState<TThemeData>(ThemeHelper.loadFromStorage());

  useEffect(() => 
  {
    // В хранилище
    ThemeHelper.saveToStorage(theme)

    // В документ
    document.documentElement.setAttribute(ThemeConstant.DataAttributeThemeMode, theme.mode);
    document.documentElement.setAttribute(ThemeConstant.DataAttributeThemeColor, theme.color);

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
