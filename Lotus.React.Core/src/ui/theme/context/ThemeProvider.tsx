import { useEffect, useState } from 'react';
import { TThemeMode } from '../types';
import { ThemeHelper } from '../helpers';
import { ThemeConstants } from '../constants';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = (props: { children: React.ReactNode }) => 
{
  const [theme, setTheme] = useState<TThemeMode>(ThemeHelper.loadFromStorage());

  useEffect(() => 
  {
    ThemeHelper.saveToStorage(theme)
    document.documentElement.setAttribute(ThemeConstants.DataAttribute, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
