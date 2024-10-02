import { createContext } from 'react';
import { TThemeData } from '../types';

export interface IThemeContextType
{
  theme: TThemeData;
  setTheme: (themeData: TThemeData) => void;
}

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);