import { useLayoutState } from 'app/layout/store';
import React, { ComponentPropsWithoutRef } from 'react';
import { ThemeHelper } from 'ui/theme';
import './AppFooter.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppFooterProps extends ComponentPropsWithoutRef<'footer'> 
{
}

export const AppFooter: React.FC<IAppFooterProps> = (props: IAppFooterProps) => 
{
  const layoutState = useLayoutState();

  return <>{layoutState.footer.isVisibleUser && layoutState.footer.isVisible &&
    <footer {...props} className='lotus-app-footer' style={{...ThemeHelper.getBackgroundColorProps(undefined, 'pale')}}>
      {props.children}
    </footer>
  }
  </>
};
