import React, { ComponentPropsWithoutRef } from 'react';
import { useLayoutState } from 'app/layout/store';
import './AppFooter.css';
import { Theme } from 'ui/theme';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppFooterProps extends ComponentPropsWithoutRef<'footer'> 
{
}

export const AppFooter: React.FC<IAppFooterProps> = (props: IAppFooterProps) => 
{
  const layoutState = useLayoutState();

  return <>{layoutState.footer.isVisibleUser && layoutState.footer.isVisible &&
    <footer {...props} className='lotus-app-footer' style={{...Theme.getBackgroundColorProps(undefined, 'pale')}}>
      {props.children}
    </footer>
  }
  </>
};
