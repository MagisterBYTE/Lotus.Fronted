import * as React from 'react';
import { CSSProperties, ReactElement } from 'react';
import { HorizontalStack } from 'ui/components';
import { useLayoutState } from '../store/LayoutSelector';
import { TScreenType } from '../domain/ScreenType';
import { useScreenTypeChanged } from '../hooks';
import { AppHeader, IAppHeaderProps } from './components/AppHeader';
import { AppLeftPanel, IAppLeftPanelProps } from './components/AppLeftPanel';
import { AppFooter, IAppFooterProps } from './components/AppFooter';

export interface IAppMainLayoutProps
{
  /**
   * Смещение сверху
   */
  offsetTop?:CSSProperties['top']

  /**
   * Основная страница
   */
  page: ReactElement;

  /**
   * Параметры заголовка
   */
  appHeaderProps?: IAppHeaderProps;

  /**
   * Параметры левой панели
   */
  appLeftPanelProps?: IAppLeftPanelProps;

  /**
   * Параметры подвала
   */
  appFooterProp?: IAppFooterProps;
}

export const AppMainLayout: React.FC<IAppMainLayoutProps> = (props: IAppMainLayoutProps) => 
{
  const { page, appHeaderProps, appFooterProp } = props;

  useScreenTypeChanged()

  const layoutState = useLayoutState();

  switch(layoutState.screenType)
  {
    case TScreenType.Desktop:
    {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{flexGrow: '0', backgroundColor: 'lightcoral'}} >
            <AppHeader {...appHeaderProps} />
          </div>
          <div style={{flexGrow: '1'}}>
            <HorizontalStack alignItems='stretch'>
              <AppLeftPanel />
              {page}
            </HorizontalStack>
          </div>
          <div style={{flexGrow: '0', backgroundColor: 'brown', position: 'sticky', bottom: 0}}>
            <AppFooter {...appFooterProp} />
          </div>
        </div>);
    }
    case TScreenType.Portrait:
    {
      return (
        <>
          <AppHeader {...appHeaderProps} />
          <AppLeftPanel />
          <>{layoutState.screenType}</>
          {page}
          <AppFooter {...appFooterProp} />
        </>);
    }
    case TScreenType.Landscape:
    {
      return (
        <HorizontalStack fullHeight fullWidth>
          <AppLeftPanel />
          {page}
        </HorizontalStack>);
    }
  }

  return <></>
};
