import { useLayoutEffect } from 'react';
import { useAppDispatchCore } from 'app/store';
import { TScreenType } from '../domain/ScreenType';
import { setScreenTypeAction } from '../store/LayoutActions';

export const useScreenTypeChanged = () =>
{
  const isDesktopQuery = '(min-width: 1280px)';
  const isPortraitQuery = '(orientation: portrait)';

  const dispatch = useAppDispatchCore();

  const handleScreenTypeChange = () =>
  {
    const isDesktop = window.matchMedia(isDesktopQuery).matches;
    const isPortrait = window.matchMedia(isPortraitQuery).matches;

    if (isPortrait)
    {
      dispatch(setScreenTypeAction(TScreenType.Portrait));
    }
    else
    {
      if (isDesktop)
      {
        dispatch(setScreenTypeAction(TScreenType.Desktop));
      }
      else
      {
        dispatch(setScreenTypeAction(TScreenType.Landscape));
      }
    }
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenTypeChange);
    window.addEventListener('orientationchange', handleScreenTypeChange);

    return () => 
    {
      window.removeEventListener('resize', handleScreenTypeChange);
      window.removeEventListener('orientationchange', handleScreenTypeChange);
    };
  }, [])
}