import { CSSProperties, useEffect, useState } from 'react';
import { TControlSize } from 'ui/types';
import { useMutationObserver } from 'hooks/useMutationObserver';
import { TThemeMode } from '../types';
import { ThemeHelper } from '../helpers';
import { ThemeContext } from './ThemeContext';
import { ThemeConstants } from '../constants';

export const ThemeProvider = (props: { children: React.ReactNode }) => 
{
  const sizeControl: Record<TControlSize, CSSProperties> =
  {
    smaller: {
      padding: '0.25em 0.25em',
      fontSize: 'smaller'
    },
    small: {
      padding: '0.35em 0.35em',
      fontSize: 'small'
    },
    medium: {
      padding: '0.45em 0.45em',
      fontSize: 'medium'
    },
    large: {
      padding: '0.5em 0.5em',
      fontSize: 'large'
    }
  }

  const [theme, setTheme] = useState<TThemeMode>(ThemeHelper.loadFromStorage());

  const optionsObserver:MutationObserverInit = 
  {
    attributes: true
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMutation = (mutations: MutationRecord[], observer: MutationObserver) =>
  {
    for (const mutation of mutations) 
    {
      if (mutation.type === 'attributes' && mutation.attributeName === ThemeConstants.DataAttribute) 
      {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  }

  useMutationObserver({options: optionsObserver, callback: handleMutation});

  useEffect(() => 
  {
    ThemeHelper.saveToStorage(theme)
    document.documentElement.setAttribute(ThemeConstants.DataAttribute, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        sizeControl,
        setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
